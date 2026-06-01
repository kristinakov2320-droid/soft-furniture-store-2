import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}

SMTP_HOST = os.environ.get("SMTP_HOST", "mail.vmm24.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "info@vmm24.com")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
TO_EMAIL = "info@vmm24.com"


def handler(event: dict, context) -> dict:
    """Отправка письма с формы обратной связи на сайте"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните имя и телефон"})}

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новое сообщение с сайта от {name}"
    msg["From"] = SMTP_USER
    msg["To"] = TO_EMAIL

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #333;">Новое сообщение с сайта VMM24</h2>
        <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Имя:</td><td style="padding: 8px;">{name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Телефон:</td><td style="padding: 8px;">{phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Сообщение:</td><td style="padding: 8px;">{message or '—'}</td></tr>
        </table>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, TO_EMAIL, msg.as_string())

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
