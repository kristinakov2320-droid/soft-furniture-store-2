import json
import hashlib
import os
import psycopg2
import urllib.request
import urllib.parse


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

    sector = os.environ['BEST2PAY_SECTOR']
    password = os.environ['BEST2PAY_PASSWORD']
    amount_kopecks = total_amount * 100

    import base64
    currency = '643'
    sign_str = f"{sector}{amount_kopecks}{currency}{password}"
    signature = base64.b64encode(hashlib.md5(sign_str.encode('utf-8')).digest()).decode('utf-8')

    post_data = urllib.parse.urlencode({
        'sector': sector,
        'reference': order_id,
        'amount': amount_kopecks,
        'currency': currency,
        'description': f'Заказ #{order_id} — Мебель за стеклом',
        'url': 'https://mebelzasteklom.ru/?payment=success',
        'signature': signature,
    }).encode('utf-8')

    register_url = "https://pay.best2pay.net/webapi/Register"

    req = urllib.request.Request(register_url, data=post_data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    with urllib.request.urlopen(req, timeout=15) as resp:
        resp_body = resp.read().decode('utf-8')

    print(f"Best2Pay response: [{resp_body}]")

    if not resp_body.strip():
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Пустой ответ от Best2Pay'})}

    resp_data = json.loads(resp_body)
    b2p_order_id = resp_data.get('id')

    if not b2p_order_id:
        return {'statusCode': 502, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Ошибка создания платежа', 'details': resp_data})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "UPDATE t_p43817028_soft_furniture_store.orders SET best2pay_order_id = %s WHERE id = %s",
        (str(b2p_order_id), order_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    pay_url = f"https://pay.best2pay.net/webapi/Purchase?sector={sector}&id={b2p_order_id}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'pay_url': pay_url, 'order_id': order_id})
    }