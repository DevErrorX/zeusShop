"""USDT and Crypto payment handling."""

from .config import settings

def get_crypto_instructions(amount_usdt: float) -> dict:
    return {
        "currency": "USDT",
        "network": "TRC20 (Tron)",
        "address": settings.usdt_trc20_address,
        "binance_pay_id": settings.binance_pay_id,
        "amount": amount_usdt,
        "notice": "يرجى تحويل المبلغ بدقة مع حفظ رقم المعاملة TXID أو لقطة التحويل للتأكيد الفوري."
    }
