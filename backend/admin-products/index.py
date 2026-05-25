import json
import os
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"], sslmode="disable")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
    "Content-Type": "application/json",
}

def check_auth(event):
    token = event.get("headers", {}).get("X-Admin-Token", "")
    return token == ADMIN_PASSWORD

def handler(event: dict, context) -> dict:
    """Административный CRUD для управления товарами каталога"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if not check_auth(event):
        return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Unauthorized"})}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    conn = get_conn()
    cur = conn.cursor()

    if method == "GET":
        cur.execute(
            f"SELECT id, name, category, price, old_price, img, tag, angle_type, fabric, description, specs, colors, images, is_active, created_at, sku FROM {SCHEMA}.products ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        products = []
        for r in rows:
            products.append({
                "id": r[0], "name": r[1], "category": r[2], "price": r[3],
                "oldPrice": r[4], "img": r[5], "tag": r[6], "angleType": r[7],
                "fabric": (json.loads(r[8]) if r[8] and isinstance(r[8], str) and r[8].startswith("[") else (list(r[8]) if r[8] and isinstance(r[8], list) else ([r[8]] if r[8] and not r[8].startswith("{") else ([x.strip() for x in r[8].strip("{}").split(",") if x.strip()] if r[8] else [])))),
                "desc": r[9],
                "specs": r[10] if r[10] else [],
                "colors": r[11] if r[11] else [],
                "images": r[12] if r[12] else [],
                "isActive": r[13], "createdAt": str(r[14]),
                "sku": r[15] or "",
            })
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"products": products})}

    elif method == "POST":
        name = body.get("name", "")
        category = body.get("category", "sofa")
        price = int(body.get("price", 0))
        old_price = body.get("oldPrice")
        img = body.get("img", "")
        tag = body.get("tag")
        angle_type = body.get("angleType")
        fabric_raw = body.get("fabric")
        fabric = json.dumps(fabric_raw) if isinstance(fabric_raw, list) else fabric_raw
        sku = body.get("sku")
        desc = body.get("desc", "")
        specs = json.dumps(body.get("specs", []))
        colors = json.dumps(body.get("colors", []))
        images = json.dumps(body.get("images", []))

        cur.execute(
            f"INSERT INTO {SCHEMA}.products (name, category, price, old_price, img, tag, angle_type, fabric, description, specs, colors, images, sku) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (name, category, price, old_price, img, tag, angle_type, fabric, desc, specs, colors, images, sku)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": new_id, "message": "Товар добавлен"})}

    elif method == "PUT":
        product_id = int(params.get("id", 0))
        fields = []
        values = []
        mapping = {
            "name": "name", "category": "category", "price": "price",
            "oldPrice": "old_price", "img": "img", "tag": "tag",
            "angleType": "angle_type", "fabric": "fabric", "desc": "description",
            "isActive": "is_active",
        }
        for key, col in mapping.items():
            if key in body:
                fields.append(f"{col} = %s")
                val = body[key]
                if key == "fabric" and isinstance(val, list):
                    val = json.dumps(val)
                values.append(val)
        for key, col in [("specs", "specs"), ("colors", "colors"), ("images", "images")]:
            if key in body:
                fields.append(f"{col} = %s")
                values.append(json.dumps(body[key]))

        if fields:
            values.append(product_id)
            cur.execute(f"UPDATE {SCHEMA}.products SET {', '.join(fields)} WHERE id = %s", values)
            conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"message": "Товар обновлён"})}

    elif method == "DELETE":
        product_id = int(params.get("id", 0))
        cur.execute(f"DELETE FROM {SCHEMA}.products WHERE id = %s", (product_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"message": "Товар удалён"})}

    cur.close()
    conn.close()
    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}