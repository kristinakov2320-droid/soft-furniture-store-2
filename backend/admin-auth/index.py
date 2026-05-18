import json
import os

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}

def handler(event: dict, context) -> dict:
    """Авторизация в административную панель по паролю"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    password = body.get("password", "")
    if password == ADMIN_PASSWORD and ADMIN_PASSWORD != "":
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True, "token": ADMIN_PASSWORD})}

    return {"statusCode": 401, "headers": CORS, "body": json.dumps({"success": False, "error": "Неверный пароль"})}
