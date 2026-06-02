import json
import hashlib
import base64
import os
import psycopg2
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET


def handler(event: dict, context) -> dict:
    """Создание заказа и платежа в Best2Pay. Возвращает URL для оплаты."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    customer_name = body.get('customer_name', '').strip()
    customer_phone = body.get('customer_phone', '').strip()
    items = body.get('items', [])
    total_amount = int(body.get('total_amount', 0))

    if not customer_name or not customer_phone or not items or total_amount <= 0:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, 'body': json.dumps({'error': 'Заполните все поля'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p43817028_soft_furniture_store.orders (customer_name, customer_phone, items, total_amount, payment_status) VALUES (%s, %s, %s, %s, 'pending') RETURNING id",
        (customer_name, customer_phone, json.dumps(items, ensure_ascii=False), total_amount)
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    sector = os.environ['BEST2PAY_SECTOR'].strip()
    password = os.environ['BEST2PAY_PASSWORD'].strip()

    # Best2Pay: amount в копейках, currency=643 (рубль)
    amount_kopecks = total_amount * 100
    currency = '643'

    # Подпись: base64(md5(sector + amount + currency + password))
    sign_str = sector + str(amount_kopecks) + currency + password
    # PHP md5() возвращает hex-строку, base64_encode кодирует её как строку
    signature = base64.b64encode(
        hashlib.md5(sign_str.encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')

    print(f"sector='{sector}' len={len(sector)}")
    print(f"password len={len(password)}")
    print(f"sign_str='{sign_str}'")
    print(f"signature='{signature}'")

    post_data = urllib.parse.urlencode({
        'sector': sector,
        'reference': str(order_id),
        'amount': str(amount_kopecks),
        'currency': currency,
        'description': f'Zakaz {order_id} Mebel za steklom',
        'url': 'https://mebelzasteklom.ru/?payment=success',
        'signature': signature,
    }).encode('utf-8')

    req = urllib.request.Request('https://pay.best2pay.net/webapi/Register', data=post_data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    with urllib.request.urlopen(req, timeout=15) as resp:
        resp_body = resp.read().decode('utf-8')

    print(f"Best2Pay response: [{resp_body}]")

    # Ответ — XML
    root = ET.fromstring(resp_body)

    # Проверяем на ошибку
    error_el = root.find('code') if root.tag == 'error' else None
    if root.tag == 'error' or error_el is not None:
        code = root.findtext('code') or ''
        desc = root.findtext('description') or ''
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': f'Best2Pay: {desc} (code {code})'})}

    b2p_order_id = root.findtext('id') or root.text
    if not b2p_order_id:
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Не получен ID платежа', 'xml': resp_body})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "UPDATE t_p43817028_soft_furniture_store.orders SET best2pay_order_id = %s WHERE id = %s",
        (str(b2p_order_id), order_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    # Подпись для Purchase: base64(md5(sector + id + password))
    purchase_sign_str = sector + str(b2p_order_id) + password
    purchase_signature = base64.b64encode(
        hashlib.md5(purchase_sign_str.encode('utf-8')).hexdigest().encode('utf-8')
    ).decode('utf-8')
    pay_url = f"https://pay.best2pay.net/webapi/Purchase?sector={sector}&id={b2p_order_id}&signature={urllib.parse.quote(purchase_signature)}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'pay_url': pay_url, 'order_id': order_id})
    }