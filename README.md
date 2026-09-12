# ⚡️ ZEUS STORE (متجر زيوس للخدمات الرقمية)

مشروع متجر إلكتروني متكامل للخدمات الرقمية، اشتراكات الألعاب، وتطبيقات بلس مع واجهة مستخدم عربية RTL فائقة السرعة، ونظام متعدد الملفات مع خادم بايثون FastAPI، وقابلية كاملة للتشغيل كصفحات ثابتة على **GitHub Pages**.

---

## 📁 هيكلية المشروع (Project Architecture)

```
zeus/
├── catalog.json               # قاعدة بيانات المنتجات المعتمدة
├── categories.json            # تصنيفات وأقسام المتجر
├── index.html                 # واجهة المتجر الرئيسية (Storefront)
├── checkout.html              # صفحة إتمام الطلب واختيار بوابات الدفع
├── admin.html                 # لوحة إدارة المتجر (Admin Control Panel)
├── legal.html                 # الشروط وسياسة الاسترجاع
├── maintenance.html           # صفحة الصيانة المجدولة
├── original_god_file.html     # النسخة الاحتياطية من الملف القديم
├── server.py                  # مدخل تشغيل خادم Uvicorn
├── requirements.txt           # مكتبات بايثون المطلوبة
├── .env.example               # نموذج متغيرات البيئة الآمنة
├── Caddyfile                  # إعدادات خادم Caddy للإنتاج
├── assets/                    # الصور، الأنماط، وحزم الجافاسكريبت
└── zeus_checkout/             # حزمة البايثون البرمجية (FastAPI Backend)
    ├── __init__.py
    ├── app.py                 # تطبيق FastAPI وربط الواجهات
    ├── config.py              # إدارة الإعدادات ومتغيرات البيئة
    ├── database.py            # قاعدة بيانات SQLite للطلبات
    ├── store_repository.py    # عمليات CRUD للطلبات والمنتجات
    ├── catalog.py             # قراءة وفلترة الكتالوج
    ├── admin_auth.py          # أمان وتسجيل دخول المشرف
    ├── admin_routes.py        # واجهات برمجة لوحة التحكم
    ├── rates.py               # حاسبة تحويل العملات المباشرة
    ├── crypto.py              # معالجة تحويلات USDT و Binance Pay
    └── telegram_admin.py      # إشعارات فورية عبر بوت تيليجرام
```

---

## 🚀 التشغيل المحلي (Local Run)

### 1. تثبيت المتطلبات
```powershell
pip install -r requirements.txt
```

### 2. تشغيل خادم البايثون
```powershell
python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```
ثم افتح المتصفح على: `http://127.0.0.1:8000`

---

## 🌐 النشر على GitHub Pages

المشروع مصمم ليعمل بتقنية **Dual-Mode**:
- **وضع الصفحات الثابتة (GitHub Pages)**: تعمل الواجهة (`index.html`, `checkout.html`, `catalog.json`) بدون الحاجة لأي خادم خلفي، مع الحفظ المحلي للسلة والطلبات.
- **وضع الخادم المتكامل (Full-Stack Mode)**: عند تشغيل خادم FastAPI، يتم حفظ الطلبات تلقائياً في قاعدة بيانات SQLite وإرسال التنبيهات.

الرابط المباشر على GitHub Pages:
👉 **`https://deverrorx.github.io/zeusShop/`**
