# نشر Ti'Magnet على هوستنجر

## الملفات الجاهزة
- الحزمة للرفع: `C:\Users\ayham\Desktop\timagnet-main\timagnet-hostinger.zip`
- ملف بيئة الإنتاج للاستيراد: [.env.production](./.env.production)

### 3. إعدادات النشر (Deploy Settings)
هام جداً: يجب ضبط هذه الإعدادات بدقة لتجنب أخطاء البناء (EACCES).

*   **Framework preset**: `Express`
*   **Node version**: `24.x` (ou latest stable)
*   **Root directory**: `./`
*   **Build command**: `echo "Build skipped"`
    *   *لا تضع `npm run build` هنا لأن الخادم يمنع بناء الواجهة.*
*   **Start command**: `npm start`
*   **Entry file**: `server.js`

### 4. متغيرات البيئة (Environment Variables)
أضف المتغيرات التالية (يمكنك استيراد ملف `.env.production`):

*   `NPM_CONFIG_PRODUCTION` = `true`
    *   *هذا المتغير ضروري جداً لمنع تثبيت أدوات البناء التي تسبب المشاكل.*
*   `FRONTEND_URL` = `https://timagnet.com`
*   `SMTP_HOST` = `smtp.titan.email`
- `SMTP_PORT=465`
- `SMTP_USER=contact@timagnet.com`
- `SMTP_PASS=<كلمة المرور>`
- `STRIPE_SECRET_KEY=<المفتاح السري الحي>`
- `STRIPE_WEBHOOK_SECRET=<سر توقيع الويبهوك>`

يمكن استيراد هذه القيم مباشرة عبر زر Import .env في هوستنجر باستخدام محتوى `.env.production`.

## إعداد Stripe Webhook
- Endpoint: `https://timagnet.com/api/webhook`
- Event: `checkout.session.completed`
- الصق قيمة `Signing secret` في `STRIPE_WEBHOOK_SECRET`.

## فحص الصحة
- Endpoint: `GET /api/health`

## ملاحظات
- الخادم يخدم ملفات الفرونت من `dist` ويعالج المسارات `/api/*`.
- إذا لم يتم ضبط SMTP، سيتم استخدام `jsonTransport` لتجنّب الأعطال.
