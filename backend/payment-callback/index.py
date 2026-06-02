import json
import hashlib
import base64
import os
import psycopg2
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 587
SMTP_USER = "k.kovaleva@vmm24.com"
SMTP_PASSWORD = "ddcobaxknyvcezgd"
NOTIFY_EMAILS = ["e.tronina@vmm24.com", "k.kovaleva@vmm24.com"]


def send_order_email(order: dict):
    items = order.get('items', [])
    if isinstance(items, str):
        items = json.loads(items)

    items_html = ''.join(
        f"<tr style=\"background:{'#f9f9f9' if i % 2 else '#fff'}\">"
        f"<td style='padding:6px 8px'>{item.get('name', '')}</td>"
        f"<td style='padding:6px 8px;text-align:center'>{item.get('quantity', 1)} шт.</td>"
        f"<td style='padding:6px 8px;text-align:right'>{int(item.get('price', 0)):,} руб.</td>"
        f"</tr>"
        for i, item in enumerate(items)
    )

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 640px; color: #222;">
        <h2 style="color: #2a6496;">Новый оплаченный заказ #{order['id']}</h2>
        <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
            <tr><td style="padding:8px; font-weight:bold; width:160px;">Номер заказа:</td><td style="padding:8px;">#{order['id']}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:8px; font-weight:bold;">Клиент:</td><td style="padding:8px;">{order['customer_name']}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Телефон:</td><td style="padding:8px;">{order['customer_phone']}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:8px; font-weight:bold;">Сумма оплаты:</td><td style="padding:8px; font-size:18px; font-weight:bold; color:#2a6496;">{int(order['total_amount']):,} руб.</td></tr>
        </table>
        <h3 style="color:#333; border-bottom:1px solid #ddd; padding-bottom:6px;">Состав заказа</h3>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#2a6496; color:#fff;">
                    <th style="padding:8px; text-align:left;">Товар</th>
                    <th style="padding:8px; text-align:center;">Кол-во</th>
                    <th style="padding:8px; text-align:right;">Цена</th>
                </tr>
            </thead>
            <tbody>{items_html}</tbody>
        </table>
    </div>
    """

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        for to_email in NOTIFY_EMAILS:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Novyi zakaz #{order['id']} - Mebel za steklom"
            msg["From"] = SMTP_USER
            msg["To"] = to_email
            msg.attach(MIMEText(html, "html"))
            server.sendmail(SMTP_USER, to_email, msg.as_string())


def handler(event: dict, context) -> dict:
    """Callback от Best2Pay: обновляет статус заказа и отправляет email на 2 адреса."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    params = dict(event.get('queryStringParameters') or {})
    body_raw = event.get('body') or ''
    if body_raw:
        try:
            params.update(dict(urllib.parse.parse_qsl(body_raw)))
        except Exception:
            pass

    sector = params.get('sector', '').strip()
    order_id = params.get('id', '').strip()
    state = params.get('state', '').strip()
    signature = params.get('signature', '').strip()

    print(f"Callback: sector={sector} id={order_id} state={state} signature={signature}")

    password = os.environ['BEST2PAY_PASSWORD'].strip()
    expected_sign = base64.b64encode(
        hashlib.md5(f"{sector}{order_id}{password}".encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')

    if signature != expected_sign:
        print(f"Invalid sig! got={signature} expected={expected_sign}")
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'Invalid signature'}

    status_map = {'0': 'pending', '1': 'paid', '2': 'cancelled', '3': 'refunded', '4': 'error'}
    payment_status = status_map.get(str(state), 'unknown')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "UPDATE t_p43817028_soft_furniture_store.orders SET payment_status = %s, updated_at = NOW() WHERE best2pay_order_id = %s RETURNING id, customer_name, customer_phone, items, total_amount",
        (payment_status, str(order_id))
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if row and payment_status == 'paid':
        order = {'id': row[0], 'customer_name': row[1], 'customer_phone': row[2], 'items': row[3], 'total_amount': row[4]}
        send_order_email(order)
        print(f"Email sent for order #{order['id']}")

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'OK'}
