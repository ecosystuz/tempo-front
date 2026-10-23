# CODEX PROMPT — TEMPO UZ / RU / EN

Sen Senior Vue 3, TypeScript/JavaScript va UI/UX developersist.

Mening mavjud TEMPO GROUP Vue 3 + Vite loyihamga shu papkadagi uch tilli patchni ehtiyotkorlik bilan birlashtir. Loyihani noldan yaratma. Asosiy brend dizayni va Pipe Tunnel Zoom animatsiyasini saqla.

## Talablar

1. `src/i18n/messages.js` va `src/i18n/index.js` orqali UZ (default), RU, EN tillarni ulang. Hech qanday yangi i18n kutubxonasi talab qilinmaydi.
2. `src/components/LanguageSwitcher.vue` — desktop header, mobil hamburger menyu va footerda uchta tugma: UZ, RU, EN. Tanlangan til vizual ajralib tursin.
3. **Barcha matnlar** tarjima qilinsin: Header, Hero, Pipe Tunnel intro skip/slogan, mahsulotlar nomlari va tavsiflari, kategoriya filtrlari, product modal, About, Advantages, Process, Catalogue, CTA, Contact, Buyurtma formasi, validation, Footer, accessibility labels, page title va meta description.
4. Til almashtirilganda sahifa qayta yuklanmasin. `localStorage`ga saqlansin. `<html lang>` ham o‘zgarsin.
5. Mahsulot tanlash `product.id` orqali bo‘lsin: `/buyurtma?product=coupler` kabi URL bilan boshqa tilga o‘tganda ham tanlangan mahsulot saqlansin.
6. `src/styles-i18n.css` dizaynini moslang. Asl logotipni cho‘zma/o‘zgartirma va brandbook ranglari (#154968, #EF3935, #54A2D9) hamda radius/animatsiyalarni saqla.
7. Mavjud sahifalar (`/`, `/mahsulotlar`, `/boglanish`, `/buyurtma`) va barcha funksiyalar ishlasin; SEO title/description tilga mos yangilansin.
8. Mahsulot buyurtma formasi backendga ulanmagan bo‘lsa, demo holatida saqlansin: fake “yuborildi” xabari bo‘lmasin. Kontakt ma’lumotlarini o‘zgartirma. Xarita/manzil hozircha sample ekanini ko‘rsat.
9. Agar mavjud lokal komponentlar patchdagi komponentlardan farq qilsa, o‘zgarishlarni **merge** qil, to‘liq ustidan yozib mavjud ishlanmalarni yo‘qotma.
10. Ish oxirida `npm install`, `npm run build` qilib tekshir. Brauzerda UZ/RU/EN, mobile menu, modal va buyurtmani test qil. Qaysi fayllar o‘zgarganini ko‘rsat.

Patchda yangi tarjima fayllari, header/footer switcher, barcha sahifa va komponentlarning lokalizatsiyalangan namunalari hamda asl Tempo logo assetlari mavjud.

**Eslatma:** Axiforma font fayllari ZIP ichida yo‘q. Rasmiy font litsenziyasi bo‘lsa o‘zingiz ulang, bo‘lmasa fallback ishlasin.
