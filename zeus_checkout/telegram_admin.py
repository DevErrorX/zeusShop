"""Allowlisted Telegram admin bot for ZEUS STORE."""

from __future__ import annotations

import asyncio
import html
import json
import logging
import re
from collections.abc import Mapping
from datetime import datetime, timezone, timedelta
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

import httpx

from .store_repository import StoreRepository

LOGGER = logging.getLogger("zeus_checkout.telegram_admin")
BAGHDAD_TZ = timezone(timedelta(hours=3))


class TelegramAdminBot:
    """Long-poll Telegram for allowlisted, read-only quick controls and paid order notifications."""

    def __init__(
        self,
        *,
        token: str,
        allowed_user_ids: tuple[int, ...] | list[int],
        public_base_url: str,
        repository: Any,
        client: httpx.AsyncClient | None = None,
    ) -> None:
        self.allowed_user_ids = frozenset(int(uid) for uid in allowed_user_ids)
        self.public_base_url = public_base_url.rstrip("/")
        self.repository = repository
        self.api_base = f"https://api.telegram.org/bot{token}"
        self.client = client
        self._owned_client: httpx.AsyncClient | None = None
        get_offset = getattr(repository, "get_telegram_update_offset", None)
        try:
            self._offset = max(0, int(get_offset())) if callable(get_offset) else 0
        except (TypeError, ValueError):
            self._offset = 0

    async def run(self, stop_event: asyncio.Event) -> None:
        client = self.client
        if client is None:
            self._owned_client = httpx.AsyncClient(
                timeout=httpx.Timeout(40.0, connect=10.0),
                follow_redirects=False,
                trust_env=False,
            )
            client = self._owned_client
        try:
            while not stop_event.is_set():
                try:
                    await self._configure(client)
                    break
                except asyncio.CancelledError:
                    raise
                except Exception as exc:
                    LOGGER.warning("Telegram admin configure failed: %s", type(exc).__name__)
                    try:
                        await asyncio.wait_for(stop_event.wait(), timeout=5.0)
                    except (asyncio.TimeoutError, TimeoutError):
                        pass

            failures = 0
            while not stop_event.is_set():
                try:
                    result = await self._call(
                        client,
                        "getUpdates",
                        {
                            "offset": self._offset,
                            "timeout": 25,
                            "allowed_updates": ["message", "callback_query"],
                        },
                    )
                    failures = 0
                    if not isinstance(result, list):
                        continue
                    for update in result:
                        if not isinstance(update, dict):
                            continue
                        update_id = int(update.get("update_id", 0))
                        if update_id < self._offset:
                            continue
                        await self._handle_update(client, update)
                        self._offset = max(self._offset, update_id + 1)
                        set_offset = getattr(self.repository, "set_telegram_update_offset", None)
                        if callable(set_offset):
                            await asyncio.to_thread(set_offset, self._offset)
                except asyncio.CancelledError:
                    raise
                except (RuntimeError, httpx.HTTPError, KeyError, TypeError, ValueError) as exc:
                    failures += 1
                    LOGGER.warning("Telegram admin polling failed: %s - %s", type(exc).__name__, exc)
                    try:
                        await asyncio.wait_for(
                            stop_event.wait(),
                            timeout=min(30.0, 0.5 * (2 ** min(failures, 6))),
                        )
                    except (asyncio.TimeoutError, TimeoutError):
                        pass
        finally:
            if self._owned_client is not None:
                await self._owned_client.aclose()
                self._owned_client = None

    async def _configure(self, client: httpx.AsyncClient) -> None:
        await self._call(client, "getMe", {})
        commands = [
            {"command": "start", "description": "فتح القائمة الرئيسية للتحكم"},
            {"command": "stats", "description": "إحصائيات آخر 30 يوماً"},
            {"command": "orders", "description": "آخر الطلبات"},
            {"command": "payments", "description": "وسائل الدفع المتاحة"},
            {"command": "site", "description": "حالة متجر زيوس"},
        ]
        try:
            await self._call(client, "setMyCommands", {"commands": commands})
        except RuntimeError:
            LOGGER.warning("setMyCommands (global) failed, continuing")
        for user_id in self.allowed_user_ids:
            try:
                await self._call(
                    client,
                    "setMyCommands",
                    {
                        "commands": commands,
                        "scope": {"type": "chat", "chat_id": user_id},
                    },
                )
            except RuntimeError:
                LOGGER.warning("setMyCommands for chat %s failed, skipping", user_id)

    async def _call(self, client: httpx.AsyncClient, method: str, payload: dict[str, Any]) -> Any:
        response = await client.post(f"{self.api_base}/{method}", json=payload)
        if response.status_code == 429:
            try:
                retry_after = float(response.json()["parameters"]["retry_after"])
            except (KeyError, TypeError, ValueError):
                retry_after = 1.0
            await asyncio.sleep(min(30.0, max(0.5, retry_after)))
            raise RuntimeError("Telegram rate limited")
        if response.status_code >= 400 or len(response.content) > 512 * 1024:
            raise RuntimeError("Telegram API request failed")
        try:
            data = response.json()
        except ValueError as exc:
            raise RuntimeError("Telegram API returned invalid JSON") from exc
        if not isinstance(data, dict) or data.get("ok") is not True:
            raise RuntimeError(f"Telegram API rejected: {data.get('description')}")
        return data.get("result")

    @staticmethod
    def _paid_order_text(order: Mapping[str, Any]) -> str:
        """Render a clean, formatted private-admin payment notification."""
        try:
            raw_items = json.loads(str(order.get("items_json") or order.get("cart_json") or "[]"))
        except Exception:
            raw_items = []
        items = raw_items if isinstance(raw_items, list) else []
        products: list[str] = []
        categories: list[str] = []
        for item in items[:20]:
            if not isinstance(item, dict):
                continue
            name = html.escape(str(item.get("title") or item.get("name") or "منتج رقمي")[:120])
            qty = item.get("quantity", 1)
            try:
                qty_str = str(max(1, min(999, int(qty))))
            except Exception:
                qty_str = "1"
            products.append(f"• {name} × {qty_str}")
            cat = str(item.get("category") or item.get("category_title") or item.get("category_name") or item.get("category_slug") or "")[:80]
            if cat and cat not in categories:
                categories.append(cat)
        if not products:
            products.append("• منتج رقمي × 1")
        category_text = "، ".join(html.escape(c) for c in categories) or "خدمات رقمية"

        # Format price
        amount_iqd = order.get("amount_iqd")
        if amount_iqd and int(amount_iqd) > 0:
            price_text = f"{int(amount_iqd):,} د.ع"
        else:
            tot = order.get("total_amount") or 0
            curr = order.get("currency") or "USD"
            if curr == "IQD":
                price_text = f"{int(tot):,} د.ع"
            else:
                price_text = f"{tot} {curr}"

        payment_method_raw = str(order.get("payment_method") or "").lower()
        if "kashier" in payment_method_raw:
            payment_method = "فوري"
        elif "binance" in payment_method_raw:
            payment_method = "باينانس (Binance Pay)"
        elif "megapay" in payment_method_raw:
            payment_method = "ميغاباي (MegaPay)"
        else:
            payment_method = "فوري"

        paid_at = str(order.get("paid_at") or datetime.now(timezone.utc).isoformat())[:80]
        try:
            paid_time = datetime.fromisoformat(paid_at.replace("Z", "+00:00"))
            if paid_time.tzinfo is None:
                paid_time = paid_time.replace(tzinfo=timezone.utc)
            paid_at_formatted = f"{paid_time.astimezone(BAGHDAD_TZ).strftime('%Y-%m-%d %H:%M')} بغداد"
        except Exception:
            paid_at_formatted = f"{datetime.now(timezone.utc).astimezone(BAGHDAD_TZ).strftime('%Y-%m-%d %H:%M')} بغداد"

        conf_code = html.escape(str(order.get("confirmation_code") or order.get("id") or "غير محدد"))
        customer = html.escape(str(order.get("customer_name") or "عميل زيوس ستور")[:120])
        products_text = "\n".join(products)

        return (
            "<b>تم انهاء طلب جديد بنجاح ✅</b>\n\n"
            f"<b>الطلب الناجح رقم:</b> {conf_code}\n"
            f"<b>المنتج:</b>\n{products_text}\n"
            f"<b>القسم:</b> {category_text}\n"
            f"<b>السعر:</b> {price_text}\n"
            f"<b>طريقة الدفع:</b> {payment_method}\n"
            f"<b>الاسم:</b> {customer}\n"
            "<b>حالة الدفع:</b> ناجحة\n"
            f"<b>وقت الدفع:</b> {paid_at_formatted}"
        )

    async def notify_paid_order(self, order: Mapping[str, Any]) -> None:
        """Send a paid-order event to configured private admin chats."""
        text = self._paid_order_text(order)
        client = self.client or self._owned_client
        if client is not None:
            await self._send_paid_notification(client, text)
            return
        async with httpx.AsyncClient(
            timeout=httpx.Timeout(8.0, connect=5.0),
            follow_redirects=False,
            trust_env=False,
        ) as transient_client:
            await self._send_paid_notification(transient_client, text)

    async def _send_paid_notification(self, client: httpx.AsyncClient, text: str) -> None:
        for chat_id in self.allowed_user_ids:
            try:
                await asyncio.wait_for(
                    self._call(
                        client,
                        "sendMessage",
                        {
                            "chat_id": chat_id,
                            "text": text,
                            "parse_mode": "HTML",
                            "disable_web_page_preview": True,
                        },
                    ),
                    timeout=8.0,
                )
            except Exception as exc:
                LOGGER.warning("Telegram paid-order notification to %s failed: %s", chat_id, exc)

    async def _handle_update(self, client: httpx.AsyncClient, update: dict[str, Any]) -> None:
        callback = update.get("callback_query")
        if isinstance(callback, dict):
            await self._handle_callback(client, callback)
            return
        message = update.get("message")
        if not isinstance(message, dict) or not self._authorized(message):
            return
        chat_id = int(message["chat"]["id"])
        raw_text = str(message.get("text", "")).strip()
        text = raw_text.split("@", 1)[0].strip().lower()

        # Check if message contains or is a confirmation code (e.g. ZEUS-F73LYWEE)
        code_match = re.search(r"zeus-[a-z0-9]{6,12}", text)
        if code_match:
            code = code_match.group(0).upper()
            await self._send(
                client,
                chat_id,
                await self._verification_code_text(code),
                self._main_keyboard(),
            )
            return

        command = text.split(maxsplit=1)[0] if text else ""
        if command in {"/stats"}:
            body = await self._stats_text()
        elif command in {"/orders"}:
            body = await self._orders_text()
        elif command in {"/payments"}:
            body = await self._payments_text()
        elif command in {"/site"}:
            body = await self._site_text()
        else:
            body = (
                "<b>تحكم بالمتجر - Store Controller ⚡️</b>\n\n"
                "مرحباً بك في بوت إدارة متجر زيوس.\n"
                "أرسل كود التأكيد مباشرة (مثال: <code>ZEUS-F73LYWEE</code>) للتحقق من صحته من السيرفر، "
                "أو اختر أحد الأزرار أدناه:"
            )
        await self._send(client, chat_id, body, self._main_keyboard())

    async def _handle_callback(self, client: httpx.AsyncClient, callback: dict[str, Any]) -> None:
        sender = callback.get("from")
        message = callback.get("message")
        callback_id = str(callback.get("id", ""))
        if (
            not isinstance(sender, dict)
            or int(sender.get("id", 0)) not in self.allowed_user_ids
            or not isinstance(message, dict)
            or not self._private_chat(message.get("chat"))
        ):
            if callback_id:
                try:
                    await self._call(
                        client,
                        "answerCallbackQuery",
                        {"callback_query_id": callback_id, "text": "غير مصرح"},
                    )
                except Exception:
                    pass
            return
        action = str(callback.get("data", ""))
        if action == "verify_code":
            body = (
                "<b>🔍 التحقق من كود التأكيد</b>\n\n"
                "أرسل الآن كود التأكيد المرسل من العميل "
                "(مثال: <code>ZEUS-F73LYWEE</code>) وسيقوم البوت بالتحقق من صحته فوراً من قاعدة بيانات السيرفر."
            )
        elif action == "stats":
            body = await self._stats_text()
        elif action == "orders":
            body = await self._orders_text()
        elif action == "payments":
            body = await self._payments_text()
        elif action == "site":
            body = await self._site_text()
        else:
            body = "<b>تحكم متجر زيوس — ZEUS STORE ⚡️</b>"

        try:
            await self._call(
                client,
                "answerCallbackQuery",
                {"callback_query_id": callback_id},
            )
        except Exception:
            pass

        try:
            await self._call(
                client,
                "editMessageText",
                {
                    "chat_id": int(message["chat"]["id"]),
                    "message_id": int(message["message_id"]),
                    "text": body,
                    "parse_mode": "HTML",
                    "reply_markup": self._main_keyboard(),
                },
            )
        except Exception:
            pass

    def _authorized(self, message: dict[str, Any]) -> bool:
        sender = message.get("from")
        return bool(
            isinstance(sender, dict)
            and int(sender.get("id", 0)) in self.allowed_user_ids
            and self._private_chat(message.get("chat"))
        )

    @staticmethod
    def _private_chat(chat: Any) -> bool:
        return isinstance(chat, dict) and chat.get("type") == "private"

    async def _send(
        self,
        client: httpx.AsyncClient,
        chat_id: int,
        text: str,
        reply_markup: dict[str, Any],
    ) -> None:
        try:
            await self._call(
                client,
                "sendMessage",
                {
                    "chat_id": chat_id,
                    "text": text,
                    "parse_mode": "HTML",
                    "disable_web_page_preview": True,
                    "reply_markup": reply_markup,
                },
            )
        except Exception as exc:
            LOGGER.warning("Failed to send message to %s: %s", chat_id, exc)

    def _main_keyboard(self) -> dict[str, Any]:
        return {
            "inline_keyboard": [
                [
                    {"text": "📊 الإحصائيات", "callback_data": "stats"},
                    {"text": "📦 آخر الطلبات", "callback_data": "orders"},
                ],
                [
                    {"text": "💳 وسائل الدفع", "callback_data": "payments"},
                    {"text": "🌐 حالة الموقع", "callback_data": "site"},
                ],
                [
                    {"text": "🔍 تحقق من كود الدفع", "callback_data": "verify_code"},
                ],
                [
                    {
                        "text": "⚡️ فتح لوحة الإدارة الكاملة",
                        "web_app": {"url": f"{self.public_base_url}/admin"},
                    }
                ],
            ]
        }

    async def _stats_text(self) -> str:
        stats = await asyncio.to_thread(self.repository.get_stats)
        return (
            "<b>إحصائيات متجر زيوس</b>\n\n"
            f"إجمالي الطلبات: <b>{int(stats.get('created_orders', 0)):,}</b>\n"
            f"الطلبات المدفوعة: <b>{int(stats.get('paid_orders', 0)):,}</b>\n"
            f"إجمالي الإيرادات: <b>{int(stats.get('revenue_iqd', 0)):,} د.ع</b>\n"
            f"الزوار النشطون: <b>{int(stats.get('unique_visitors', 0)):,}</b>"
        )

    async def _orders_text(self) -> str:
        page = await asyncio.to_thread(
            self.repository.list_orders,
            page=1,
            page_size=8,
            status_filter=None,
        )
        rows = page.get("orders", [])
        if not rows:
            return "<b>آخر الطلبات في ZEUS STORE</b>\nلا توجد طلبات مسجلة بعد."
        lines = ["<b>آخر الطلبات المسجلة:</b>\n"]
        for row in rows:
            status_symbol = "✅" if row.get("status") == "paid" else "⏳"
            code = html.escape(str(row.get("confirmation_code") or row.get("id") or "")[:14])
            amt = int(row.get("amount_iqd") or row.get("total_amount") or 0)
            lines.append(f"{status_symbol} <code>{code}</code> — {amt:,} — {html.escape(str(row.get('customer_name', 'عميل')))}")
        return "\n".join(lines)

    async def _verification_code_text(self, code: str) -> str:
        clean_code = code.strip().upper()
        order = await asyncio.to_thread(
            self.repository.get_order_by_confirmation_code, clean_code
        )
        if order is None:
            return (
                "<b>نتيجة التحقق</b>\n\n"
                f"الكود: <code>{html.escape(clean_code)}</code>\n"
                "النتيجة: ❌ كود غير صحيح — لا يوجد طلب مسجل بهذا الكود في السيرفر."
            )
        status_labels = {
            "paid": "✅ مدفوع",
            "pending": "⏳ قيد الدفع",
            "manual_review": "🔍 بانتظار مراجعة الإدارة",
            "cancelled": "❌ ملغي",
            "failed": "❌ فشل الدفع",
            "refunded": "↩️ مسترجع",
        }
        status = status_labels.get(str(order.get("status")), "غير معروفة")

        amount_iqd = order.get("amount_iqd")
        if amount_iqd and int(amount_iqd) > 0:
            price_text = f"{int(amount_iqd):,} د.ع"
        else:
            curr = str(order.get('currency', 'USD')).upper()
            tot = order.get('total_amount', 0)
            if curr == 'IQD':
                price_text = f"{int(tot):,} د.ع"
            else:
                price_text = f"{tot} {curr}"

        try:
            items = json.loads(str(order.get("items_json") or "[]"))
        except Exception:
            items = []
        names = [
            str(it.get("title") or it.get("name") or "منتج رقمي")
            for it in items if isinstance(it, dict)
        ][:5]
        product_text = "\n".join(f"• {html.escape(name[:80])}" for name in names) if names else "• منتج رقمي"
        customer = html.escape(str(order.get("customer_name") or "غير محدد")[:80])
        paid_at_raw = str(order.get("paid_at") or "—")[:80]
        try:
            paid_time = datetime.fromisoformat(paid_at_raw.replace("Z", "+00:00"))
            if paid_time.tzinfo is None:
                paid_time = paid_time.replace(tzinfo=timezone.utc)
            paid_at = f"{paid_time.astimezone(BAGHDAD_TZ).strftime('%Y-%m-%d %H:%M')} بغداد"
        except Exception:
            paid_at = html.escape(paid_at_raw)
        conf = html.escape(str(order.get("confirmation_code") or clean_code))

        return (
            "<b>نتيجة التحقق</b>\n\n"
            f"الكود: {conf}\n"
            f"الحالة: {status}\n"
            f"العميل: {customer}\n"
            f"المبلغ: {price_text}\n"
            f"المنتجات:\n{product_text}\n"
            f"وقت الدفع: {paid_at}"
        )

    async def _payments_text(self) -> str:
        channels = await asyncio.to_thread(self.repository.list_payment_channels)
        lines = ["<b>وسائل الدفع في متجر زيوس:</b>\n"]
        for item in channels:
            mode = "آلي" if item.get("verification_mode") == "automatic" else "يدوي"
            status = "🟢 مفعّل" if item.get("enabled") else "🔴 معطل"
            lines.append(f"• {html.escape(str(item['label']))} — {mode} ({status})")
        return "\n".join(lines)

    async def _site_text(self) -> str:
        site = await asyncio.to_thread(self.repository.get_site_settings)
        state = "قيد الصيانة ⚠️" if site.get("maintenance_enabled") else "يعمل بصورة طبيعية ومؤمنة 🟢"
        message = html.escape(str(site.get("maintenance_message", "")))
        return f"<b>حالة موقع ZEUS STORE</b>\n\nالحالة: <b>{state}</b>\n{message}".strip()

