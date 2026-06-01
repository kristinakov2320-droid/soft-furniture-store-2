import json
import os
import urllib.request

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = "1233312028"


def handler(event: dict, context) -> dict:
    """Отправка уведомления в Telegram с формы обратной связи на сайте"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните имя и телефон"})}

    text = (
        f"📩 Новое сообщение с сайта VMM24\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"💬 Сообщение: {message or '—'}"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = json.dumps({"chat_id": TELEGRAM_CHAT_ID, "text": text}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=10)

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
