# Tempo — Brandbook integratsiyasi

Manba: foydalanuvchi yuklagan `Tempo Brandbook (branding).pdf` (2024, 68 bet).

## Rasmiy brend qoidalari
- 5-6 va 11-betlar: tasdiqlangan gorizontal Tempo logotipi / oq logotipni rangli fonda ishlatish.
- 8-bet: logotip atrofidagi himoyalangan bo‘sh joy.
- 14-bet: logoni cho‘zish, soya berish, elementlarni siljitish va rangni buzish taqiqlangan.
- 16-bet: Dark Blue `#154968`, Red `#EF3935`, Water Blue `#54A2D9`.
- 18-19-betlar: Axiforma asosiy, Helvetica Neue ikkilamchi shrift.

## O‘zgargan joylar
- `src/components/TempoLogo.vue`: sun’iy CSS emblemasi o‘rniga PDF’dan olingan asl gorizontal logo.
- `src/components/IntroPipeTunnel.vue`: original logo intro finalida; kompaniya katalogidagi slogan.
- `src/styles-brand.css`: rasmiy rang tokenlari, yumaloq burchaklar, cards gap, CTA margin va intro.
- `public/images/brand/`: logoning ikki rangli varianti.
- `public/favicon.png`: rasmiy emblem asosidagi favicon.
- `src/main.js`: brandbook stillari import qilindi.
- `index.html`: favicon va browser UI rangi.

## Shrift haqida
Brandbook Axiforma fontini ko‘rsatadi, lekin shriftdan foydalanish uchun mos litsenziya va font fayllari talab qilinadi. Font fayllari bu loyihaga qo‘shilmadi; Helvetica Neue / system-ui fallback ishlaydi. Agar o‘zingizda litsenziyalangan webfont mavjud bo‘lsa, lokal CSS `@font-face` qo‘shish mumkin. Font fayllarini chat orqali ulashish talab qilinmaydi.

## Real bo‘lmagan ma’lumotlar
- Telefon: katalogdagi `+998 (91) 444 44 22`.
- Manzil: NAMUNA `Toshkent shahri, Chilonzor tumani` — ishga tushirishdan oldin almashtiring.
- So‘rov formasi: API ulanmaguncha real buyurtma jo‘natmaydi.
- Mahsulot WebP vizuallari oldingi demo versiyadan; haqiqiy fotografiyaga tasdiqlanmagan.

Kontaktni almashtirish: `src/data/site.js`.

Ishga tushirish: `npm install && npm run dev`. Build: `npm run build`.
