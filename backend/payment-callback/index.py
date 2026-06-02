import json
import hashlib
import base64
import os
import psycopg2
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 587
SMTP_USER = "k.kovaleva@vmm24.com"
SMTP_PASSWORD = "ddcobaxknyvcezgd"
NOTIFY_EMAILS = ["e.tronina@vmm24.com", "k.kovaleva@vmm24.com"]


def check_b2p_order_state(sector, order_id, password):
    """Запрашивает статус заказа у Best2Pay. Возвращает state (строка) или None."""
    sign_str = sector + str(order_id) + password
    signature = base64.b64encode(
        hashlib.md5(sign_str.encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')

    post_data = urllib.parse.urlencode({
        'sector': sector,
        'id': str(order_id),
        'signature': signature,
    }).encode('utf-8')

    req = urllib.request.Request('https://pay.best2pay.net/webapi/Order', data=post_data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    with urllib.request.urlopen(req, timeout=10) as resp:
        xml_body = resp.read().decode('utf-8')

    print(f"B2P Order status: {xml_body}")
    root = ET.fromstring(xml_body)
    if root.tag == 'error':
        return None
    return root.findtext('state')


def build_items_html(items):
    rows = []
    for i, item in enumerate(items):
        bg = '#f9f9f9' if i % 2 else '#fff'
        name = item.get('name', '')
        qty = item.get('quantity', 1)
        price = int(item.get('price', 0))
        rows.append(
            "<tr style='background:" + bg + "'>"
            "<td style='padding:6px 8px'>" + name + "</td>"
            "<td style='padding:6px 8px;text-align:center'>" + str(qty) + " шт.</td>"
            "<td style='padding:6px 8px;text-align:right'>" + "{:,}".format(price).replace(',', ' ') + " руб.</td>"
            "</tr>"
        )
    return ''.join(rows)


def send_order_email(order):
    items = order.get('items', [])
    if isinstance(items, str):
        items = json.loads(items)

    items_html = build_items_html(items)
    total = "{:,}".format(int(order['total_amount'])).replace(',', ' ')

    html = (
        "<div style='font-family:Arial,sans-serif;max-width:640px;color:#222'>"
        "<h2 style='color:#2a6496'>Новый оплаченный заказ #" + str(order['id']) + "</h2>"
        "<table style='width:100%;border-collapse:collapse;margin-bottom:16px'>"
        "<tr><td style='padding:8px;font-weight:bold;width:160px'>Номер заказа:</td><td style='padding:8px'>#" + str(order['id']) + "</td></tr>"
        "<tr style='background:#f5f5f5'><td style='padding:8px;font-weight:bold'>Клиент:</td><td style='padding:8px'>" + str(order['customer_name']) + "</td></tr>"
        "<tr><td style='padding:8px;font-weight:bold'>Телефон:</td><td style='padding:8px'>" + str(order['customer_phone']) + "</td></tr>"
        "<tr style='background:#f5f5f5'><td style='padding:8px;font-weight:bold'>Сумма оплаты:</td>"
        "<td style='padding:8px;font-size:18px;font-weight:bold;color:#2a6496'>" + total + " руб.</td></tr>"
        "</table>"
        "<h3 style='color:#333;border-bottom:1px solid #ddd;padding-bottom:6px'>Состав заказа</h3>"
        "<table style='width:100%;border-collapse:collapse'>"
        "<thead><tr style='background:#2a6496;color:#fff'>"
        "<th style='padding:8px;text-align:left'>Товар</th>"
        "<th style='padding:8px;text-align:center'>Кол-во</th>"
        "<th style='padding:8px;text-align:right'>Цена</th>"
        "</tr></thead>"
        "<tbody>" + items_html + "</tbody>"
        "</table></div>"
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        for to_email in NOTIFY_EMAILS:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = "Novyi zakaz #" + str(order['id']) + " - Mebel za steklom"
            msg["From"] = SMTP_USER
            msg["To"] = to_email
            msg.attach(MIMEText(html, "html", "utf-8"))
            server.sendmail(SMTP_USER, to_email, msg.as_string())


def handler(event: dict, context) -> dict:
    """Callback от Best2Pay: проверяет статус pending заказов и отправляет email при оплате."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    sector = os.environ['BEST2PAY_SECTOR'].strip()
    password = os.environ['BEST2PAY_PASSWORD'].strip()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, best2pay_order_id, customer_name, customer_phone, items, total_amount "
        "FROM t_p43817028_soft_furniture_store.orders "
        "WHERE payment_status = 'pending' AND best2pay_order_id IS NOT NULL "
        "ORDER BY created_at DESC LIMIT 10"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    print(f"Checking {len(rows)} pending orders")

    status_map = {'0': 'pending', '1': 'paid', '2': 'cancelled', '3': 'refunded', '4': 'error'}

    for row in rows:
        order_db_id, b2p_id, cust_name, cust_phone, items, total = row
        print(f"Checking order #{order_db_id} b2p_id={b2p_id}")

        state = check_b2p_order_state(sector, b2p_id, password)
        print(f"State for #{order_db_id}: {state}")

        if state is None:
            continue

        payment_status = status_map.get(str(state), 'unknown')

        if payment_status != 'pending':
            conn2 = psycopg2.connect(os.environ['DATABASE_URL'])
            cur2 = conn2.cursor()
            cur2.execute(
                "UPDATE t_p43817028_soft_furniture_store.orders SET payment_status = %s, updated_at = NOW() WHERE id = %s",
                (payment_status, order_db_id)
            )
            conn2.commit()
            cur2.close()
            conn2.close()

            if payment_status == 'paid':
                order = {
                    'id': order_db_id,
                    'customer_name': cust_name,
                    'customer_phone': cust_phone,
                    'items': items,
                    'total_amount': total,
                }
                send_order_email(order)
                print(f"Email sent for order #{order_db_id}")

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'OK'}
