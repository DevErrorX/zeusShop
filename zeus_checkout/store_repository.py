"""Store repository for orders and analytics."""

import json
import uuid
from .database import get_db_connection

class StoreRepository:
    @staticmethod
    def create_order(customer_name: str, customer_phone: str, customer_email: str | None,
                     payment_method: str, total_amount: float, currency: str, items: list) -> str:
        order_id = f"ZEUS-{uuid.uuid4().hex[:6].upper()}"
        with get_db_connection() as conn:
            conn.execute(
                """INSERT INTO orders (id, customer_name, customer_phone, customer_email,
                                       payment_method, total_amount, currency, items_json, status)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')""",
                (order_id, customer_name, customer_phone, customer_email,
                 payment_method, total_amount, currency, json.dumps(items, ensure_ascii=False))
            )
            conn.commit()
        return order_id

    @staticmethod
    def get_order(order_id: str) -> dict | None:
        with get_db_connection() as conn:
            row = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
            if row:
                d = dict(row)
                d["items"] = json.loads(d["items_json"])
                return d
        return None

    @staticmethod
    def list_orders(limit: int = 50) -> list[dict]:
        with get_db_connection() as conn:
            rows = conn.execute("SELECT * FROM orders ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
            results = []
            for r in rows:
                d = dict(r)
                d["items"] = json.loads(d["items_json"])
                results.append(d)
            return results

    @staticmethod
    def update_order_status(order_id: str, new_status: str):
        with get_db_connection() as conn:
            conn.execute("UPDATE orders SET status = ? WHERE id = ?", (new_status, order_id))
            conn.commit()
