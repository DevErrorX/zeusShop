"""Exchange rates service for ZEUS STORE."""

from .config import settings

def convert_currency(amount_sar: float, target_currency: str) -> float:
    target = target_currency.upper()
    if target == "SAR":
        return round(amount_sar, 2)
    elif target in ("USD", "USDT"):
        return round(amount_sar / settings.usd_to_sar, 2)
    elif target == "IQD":
        return round(amount_sar / settings.iqd_to_sar, 0)
    elif target == "EGP":
        return round(amount_sar / settings.egp_to_sar, 0)
    return round(amount_sar, 2)

def get_all_rates():
    return {
        "base": "SAR",
        "rates": {
            "SAR": 1.0,
            "USD": round(1.0 / settings.usd_to_sar, 4),
            "USDT": round(1.0 / settings.usd_to_sar, 4),
            "IQD": round(1.0 / settings.iqd_to_sar, 2),
            "EGP": round(1.0 / settings.egp_to_sar, 2)
        }
    }
