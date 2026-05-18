import json
import os
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"], sslmode="disable")

def handler(event: dict, context) -> dict:
    """Получение списка товаров для каталога (публичный эндпоинт)"""
    cors = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {**cors, "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, name, category, price, old_price, img, tag, angle_type, fabric, description, specs, colors, images, created_at FROM {SCHEMA}.products WHERE is_active = true ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    products = []
    for r in rows:
        products.append({
            "id": r[0],
            "name": r[1],
            "category": r[2],
            "price": r[3],
            "oldPrice": r[4],
            "img": r[5],
            "tag": r[6],
            "angleType": r[7],
            "fabric": r[8],
            "desc": r[9],
            "specs": r[10] if r[10] else [],
            "colors": r[11] if r[11] else [],
            "images": r[12] if r[12] else [],
            "createdAt": str(r[13]),
        })

    return {"statusCode": 200, "headers": cors, "body": json.dumps({"products": products})}