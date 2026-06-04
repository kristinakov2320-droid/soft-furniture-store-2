import json
import hashlib
import base64
import os
import psycopg2
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 587
SMTP_USER = "k.kovaleva@vmm24.com"
SMTP_PASSWORD = "ddcobaxknyvcezgd"
NOTIFY_EMAILS = ["e.tronina@vmm24.com", "k.kovaleva@vmm24.com"]


def send_order_email(order_id, customer_name, customer_phone, customer_email, items, total_amount):
    rows = []
    for i, item in enumerate(items):
        bg = '#f9f9f9' if i % 2 else '#fff'
        name = item.get('name', '')
        sku = item.get('sku', '')
        color = item.get('color', '')
        qty = item.get('qty', item.get('quantity', 1))
        price = int(item.get('price', 0))
        sub = []
        if color:
            sub.append("Цвет: " + color)
        if sku:
            sub.append("Арт: " + sku)
        name_cell = name + ("<br><span style='color:#888;font-size:12px'>" + " | ".join(sub) + "</span>" if sub else "")
        rows.append(
            "<tr style='background:" + bg + "'>"
            "<td style='padding:6px 8px'>" + name_cell + "</td>"
            "<td style='padding:6px 8px;text-align:center'>" + str(qty) + " шт.</td>"
            "<td style='padding:6px 8px;text-align:right'>" + "{:,}".format(price).replace(',', ' ') + " руб.</td>"
            "</tr>"
        )
    items_html = ''.join(rows)
    total_str = "{:,}".format(int(total_amount)).replace(',', ' ')

    html = (
        "<div style='font-family:Arial,sans-serif;max-width:640px;color:#222'>"
        "<h2 style='color:#2a6496'>Новый заказ #" + str(order_id) + "</h2>"
        "<table style='width:100%;border-collapse:collapse;margin-bottom:16px'>"
        "<tr><td style='padding:8px;font-weight:bold;width:160px'>Номер заказа:</td><td style='padding:8px'>#" + str(order_id) + "</td></tr>"
        "<tr style='background:#f5f5f5'><td style='padding:8px;font-weight:bold'>Клиент:</td><td style='padding:8px'>" + customer_name + "</td></tr>"
        "<tr><td style='padding:8px;font-weight:bold'>Телефон:</td><td style='padding:8px'>" + customer_phone + "</td></tr>"
        "<tr style='background:#f5f5f5'><td style='padding:8px;font-weight:bold'>Email:</td><td style='padding:8px'>" + customer_email + "</td></tr>"
        "<tr><td style='padding:8px;font-weight:bold'>Сумма:</td>"
        "<td style='padding:8px;font-size:18px;font-weight:bold;color:#2a6496'>" + total_str + " руб.</td></tr>"
        "</table>"
        "<h3 style='color:#333;border-bottom:1px solid #ddd;padding-bottom:6px'>Состав заказа</h3>"
        "<table style='width:100%;border-collapse:collapse'>"
        "<thead><tr style='background:#2a6496;color:#fff'>"
        "<th style='padding:8px;text-align:left'>Товар</th>"
        "<th style='padding:8px;text-align:center'>Кол-во</th>"
        "<th style='padding:8px;text-align:right'>Цена</th>"
        "</tr></thead>"
        "<tbody>" + items_html + "</tbody>"
        "</table>"
        "</div>"
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        for to_email in NOTIFY_EMAILS:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = "Novyi zakaz #" + str(order_id) + " - Mebel za steklom"
            msg["From"] = SMTP_USER
            msg["To"] = to_email
            msg.attach(MIMEText(html, "html", "utf-8"))
            server.sendmail(SMTP_USER, to_email, msg.as_string())
    print(f"Emails sent for order #{order_id}")


def handler(event: dict, context) -> dict:
    """Создание заказа и платежа в Best2Pay. Возвращает URL для оплаты."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    customer_name = body.get('customer_name', '').strip()
    customer_phone = body.get('customer_phone', '').strip()
    customer_email = body.get('customer_email', '').strip()
    items = body.get('items', [])
    total_amount = int(body.get('total_amount', 0))

    print(f"ITEMS RECEIVED: {json.dumps(items, ensure_ascii=False)}")

    if not customer_name or not customer_phone or not items or total_amount <= 0:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, 'body': json.dumps({'error': 'Заполните все поля'})}

    # Добираем sku и color из БД если фронт не передал
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    product_ids = [item['id'] for item in items if item.get('id')]
    if product_ids:
        ids_str = ','.join(str(pid) for pid in product_ids)
        cur.execute(f"SELECT id, name, sku, colors FROM t_p43817028_soft_furniture_store.products WHERE id IN ({ids_str})")
        db_products = {row[0]: {'name': row[1], 'sku': row[2], 'colors': row[3] or []} for row in cur.fetchall()}
    else:
        db_products = {}

    for item in items:
        pid = item.get('id')
        if pid and pid in db_products:
            db_p = db_products[pid]
            # Если фронт не передал sku/color — берём из БД
            if not item.get('sku') and not item.get('color'):
                colors = db_p['colors']
                if colors:
                    # Берём первый цвет по умолчанию
                    item['sku'] = colors[0].get('sku', '')
                    item['color'] = colors[0].get('name', '')
            elif item.get('sku') and not item.get('color'):
                # Есть sku — найдём название цвета
                for c in db_p['colors']:
                    if c.get('sku') == item['sku']:
                        item['color'] = c.get('name', '')
                        break

    print(f"ITEMS ENRICHED: {json.dumps(items, ensure_ascii=False)}")

    cur.execute(
        "INSERT INTO t_p43817028_soft_furniture_store.orders (customer_name, customer_phone, customer_email, items, total_amount, payment_status) VALUES (%s, %s, %s, %s, %s, 'pending') RETURNING id",
        (customer_name, customer_phone, customer_email, json.dumps(items, ensure_ascii=False), total_amount)
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    sector = os.environ['BEST2PAY_SECTOR'].strip()
    password = os.environ['BEST2PAY_PASSWORD'].strip()

    amount_kopecks = total_amount * 100
    currency = '643'

    sign_str = sector + str(amount_kopecks) + currency + password
    signature = base64.b64encode(
        hashlib.md5(sign_str.encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')

    callback_url = 'https://functions.poehali.dev/cbdc4413-caa2-4130-a4e0-65e37460a8f2'

    post_data = urllib.parse.urlencode({
        'sector': sector,
        'reference': str(order_id),
        'amount': str(amount_kopecks),
        'currency': currency,
        'description': 'Zakaz ' + str(order_id) + ' Mebel za steklom',
        'url': 'https://mebelzasteklom.ru/?payment=success',
        'callbackurl': callback_url,
        'signature': signature,
    }).encode('utf-8')

    req = urllib.request.Request('https://pay.best2pay.net/webapi/Register', data=post_data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    with urllib.request.urlopen(req, timeout=15) as resp:
        resp_body = resp.read().decode('utf-8')

    root = ET.fromstring(resp_body)

    if root.tag == 'error':
        code = root.findtext('code') or ''
        desc = root.findtext('description') or ''
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Best2Pay: ' + desc + ' (code ' + code + ')'})}

    b2p_order_id = root.findtext('id') or root.text
    if not b2p_order_id:
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Не получен ID платежа'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "UPDATE t_p43817028_soft_furniture_store.orders SET best2pay_order_id = %s WHERE id = %s",
        (str(b2p_order_id), order_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    purchase_sign_str = sector + str(b2p_order_id) + password
    purchase_signature = base64.b64encode(
        hashlib.md5(purchase_sign_str.encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')
    pay_url = "https://pay.best2pay.net/webapi/Purchase?sector=" + sector + "&id=" + str(b2p_order_id) + "&signature=" + urllib.parse.quote(purchase_signature)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'pay_url': pay_url, 'order_id': order_id})
    }