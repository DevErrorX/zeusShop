"""Telegram alerts integration for ZEUS STORE."""

import httpx
from .config import settings

async def send_order_telegram_alert(order_id: str, customer_name: str, total_str: str, method: str):
    token = settings.telegram_bot_token
    chat_id = settings.telegram_chat_id
    if not token or not chat_id:
        return
    
    text = (
        f"⚡️ *طلب جديد في ZEUS STORE*\n"
        f"🆔 رقم الطلب: `{order_id}`\n"
        f"👤 العميل: {customer_name}\n"
        f"💰 المبلغ: {total_str}\n"
        f"💳 طريقة الدفع: {method}\n"
    )
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            await client.post(url, json={"chat_id": chat_id, "text": text, "parse_mode": "Markdown"})
    except Exception as e:
        print(f"Telegram alert error: {e}")
