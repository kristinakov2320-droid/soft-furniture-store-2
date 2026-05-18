import json
import os
import base64
import uuid
import boto3

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
    "Content-Type": "application/json",
}

def handler(event: dict, context) -> dict:
    """Загрузка фото товара в S3 хранилище. Принимает base64 изображение, возвращает CDN URL."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    token = event.get("headers", {}).get("X-Admin-Token", "")
    if token != ADMIN_PASSWORD or not ADMIN_PASSWORD:
        return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Нет доступа"})}

    body = json.loads(event.get("body", "{}"))
    file_data = body.get("file")
    file_name = body.get("name", "image.jpg")

    if not file_data:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Файл не передан"})}

    if "," in file_data:
        file_data = file_data.split(",", 1)[1]

    image_bytes = base64.b64decode(file_data)

    ext = file_name.rsplit(".", 1)[-1].lower() if "." in file_name else "jpg"
    content_type = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}.get(ext, "image/jpeg")

    key = f"products/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    s3.put_object(Bucket="files", Key=key, Body=image_bytes, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"url": cdn_url})}
