# Codex uchun vazifa — mavjud TEMPO Vue loyihasiga rasmiy brandingni birlashtirish

Mavjud Vue 3 + Vite + Vue Router proyektimni noldan yaratma. `tempo-brandbook-update.zip` ichidagi o‘zgartirishlarni **hozirgi kodim bilan ehtiyotkor birlashtir**. Foydalanuvchi yuklagan TEMPO Brandbook (2024) qoidalariga amal qil.

- Asl logo fayllari `public/images/brand/tempo-logo-navy.png` va `tempo-logo-white.png`. Ularni Header/Footer va introda ishlat. CSS orqali yangi logotip chizma. Elementlarini cho‘zma, siljitma, soya qo‘shma.
- Rasmiy ranglar: #154968, #EF3935, #54A2D9. `src/styles-brand.css` tokenlari orqali sayt bo‘ylab bir xil ko‘rinish ta’minla.
- Axiforma asosiy va Helvetica Neue ikkilamchi shrift; fontlarni kiritmasdan fallback ishlat (litsenziyalangan fontlar taqdim etilsa keyin ulash mumkin).
- Pipe Tunnel Zoom saytga birinchi kirishda 1 marta ko‘rinsin; finalida asl logo va slogan chiqsin. Skip button, prefers-reduced-motion, sessionStorage saqlansin.
- 4 advantage card orasida gap va border-radius bo‘lsin, hamkorlik CTA tepasida margin-top bo‘lsin.
- Barcha mahsulotlar, routing, product modal, telefon, xarita va buyurtma formasini saqla.
- Manzil faqat namuna; tasdiqlangan yangi manzil o‘ylab topma. Backend ulanmagan bo‘lsa forma haqiqiy buyurtma deb ko‘rsatmasin.
- Mening boshqa yangi o‘zgarishlarimni o‘chirib yuborma, ZIP ichidagi fayllar bilan mexanik tarzda ustidan bosib ketma.
- Oxirida `npm install`, `npm run build`, mobil/desktopda navigatsiya va intro ishlashini tekshir va o‘zgargan fayllarni sanab ber.
