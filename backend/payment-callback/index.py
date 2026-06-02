import json
import hashlib
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Обработка callback от Best2Pay об изменении статуса платежа."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    params = event.get('queryStringParameters') or {}
    body_raw = event.get('body') or ''
    if body_raw:
        try:
            params.update(json.loads(body_raw))
        except Exception:
            pass

    sector = params.get('sector', '')
    order_id = params.get('id', '')
    state = params.get('state', '')
    signature = params.get('signature', '')

    password = os.environ['BEST2PAY_PASSWORD']
    expected_sign = hashlib.md5(f"{sector}{order_id}{password}".encode('utf-8')).hexdigest()

    if signature != expected_sign:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'Invalid signature'}

    status_map = {
        '0': 'pending',
        '1': 'paid',
        '2': 'cancelled',
        '3': 'refunded',
        '4': 'error',
    }
    payment_status = status_map.get(str(state), 'unknown')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "UPDATE t_p43817028_soft_furniture_store.orders SET payment_status = %s, updated_at = NOW() WHERE best2pay_order_id = %s",
        (payment_status, str(order_id))
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': 'OK'
    }
