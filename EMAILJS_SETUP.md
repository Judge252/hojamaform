# خطوات إعداد EmailJS لنموذج الحجامة

## المشكلة التي تواجهك:
الخطأ "حدث خطأ - لم نتمكن من إرسال النموذج، يرجى التأكد من مفاتيح EmailJS أو المحاولة مرة أخرى."

هذا يعني أن بيانات اعتماد EmailJS لم تكن صحيحة أو لم تتم إضافتها بعد.

---

## خطوات الإعداد:

### 1. إنشء حساب على EmailJS
- انتقل إلى: https://dashboard.emailjs.com/
- انقر على "Sign Up" (اشترك)
- استخدم بريدك الإلكتروني وأنشئ كلمة مرور
- تحقق من بريدك الإلكتروني

### 2. إنشاء خدمة بريد
- في لوحة التحكم، انقر على "Email Services" (خدمات البريد)
- انقر على "Add Service" (إضافة خدمة)
- اختر Gmail أو أي خدمة بريد أخرى
- اتبع التعليمات لربط حسابك
- انسخ **Service ID** (سيبدو مثل: `service_xxxxxxxxxxxxx`)

### 3. إنشاء قالب بريد
- انقر على "Email Templates" (قوالب البريد)
- انقر على "Create New Template" (إنشاء قالب جديد)
- سمّ القالب (مثل: "Hijama Form Submission")
- في المحتوى، أضف هذا:

```
من: {{fullName}}
الهاتف: {{phone}}
العمر: {{age}}

المعلومات الشخصية:
- الجنس: {{gender}}
- العنوان: {{address}}

التاريخ الطبي: {{medicalHistory}}
أمراض أخرى: {{otherDiseases}}

موانع الحجامة: {{contraindications}}

معلومات أخرى:
- يتناول أدوية: {{takingMeds}}
- الأدوية: {{medsList}}
- مميعات الدم: {{bloodThinners}}
- فحوصات دم حديثة: {{recentBloodTest}}
- مشاكل الدم: {{bloodTestIssues}}

التاريخ: {{signatureDate}}
```

- انقر على **Save** (حفظ)
- انسخ **Template ID** (سيبدو مثل: `template_xxxxxxxxxxxxx`)

### 4. الحصول على Public Key
- انقر على Account (في الزاوية العلوية اليسرى)
- ستجد **Public Key** (سيبدو مثل: `xxxxxxxxxxxxxxxxxxxxxx`)
- انسخها

### 5. تحديث ملف app.js
افتح ملف `app.js` في محرر النصوص واستبدل:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxx';      // استبدل بـ Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxx';    // استبدل بـ Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxx';            // استبدل بـ Public Key
```

مثال:
```javascript
const EMAILJS_SERVICE_ID = 'service_a1b2c3d4e5f6g7h8';
const EMAILJS_TEMPLATE_ID = 'template_z9y8x7w6v5u4t3s2';
const EMAILJS_PUBLIC_KEY = 'myPublicKeyHere123456';
```

### 6. احفظ الملف واختبر النموذج
- احفظ التغييرات
- أعد تحميل الصفحة
- جرّب إرسال النموذج

---

## نصائح إضافية:

### إذا لم تستقبل رسائل البريد:
1. تحقق من مجلد "البريد العشوائي"
2. تأكد من أن الخدمة مفعلة في EmailJS
3. تحقق من أن القالب يحتوي على كل المتغيرات الصحيحة

### للتطوير والاختبار:
يمكنك استخدام اختبار EmailJS المدمج قبل الحفظ

### النسخة المجانية من EmailJS:
- **200 رسالة في الشهر** مجاناً
- لا تحتاج بطاقة ائتمان
- مثالية للعيادات الصغيرة

---

## الدعم والمساعدة:
- زيارة موقع EmailJS: https://www.emailjs.com
- وثائق EmailJS: https://www.emailjs.com/docs/
- دعم العملاء: support@emailjs.com

---

## ملاحظة أمان:
- لا تشارك Public Key مع أشخاص لا تثق بهم
- يمكنك إعادة توليد المفاتيح في أي وقت من لوحة التحكم
