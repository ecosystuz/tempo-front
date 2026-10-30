# TEMPO GROUP — About Us yangilanishi (30.10.2026)

## Kiritilgan o‘zgarishlar
- Yuqori va mobil menyudagi "About" bo‘limi **About Us** (UZ: Biz haqimizda; RU: О нас) sifatida mustaqil `/about-us` sahifasiga o‘tadi.
- Bosh sahifadagi "Biz haqimizda" havolasi va "Batafsil tanishish" tugmasi `/about-us` sahifasiga o‘tadi.
- Kompaniya haqida uch tilda matn, mahsulot yo‘nalishlari, manzil va kontaktga o‘tish tugmasi qo‘shildi.
- Ikki sertifikatning **siz yuborgan asl PNG rasmlari** `public/images/certificates/` papkasiga joylandi. Ularni bosganda katta ko‘rinishda ochish, yangi oynada asl rasmni ko‘rish mumkin.
- Avvalgi Buxoro manzili, Google Maps URL va katalog filtri tuzatishlari saqlangan.

## Muhim sertifikat ma’lumoti
- Sertifikatlarda kompaniya nomi **LEADER PIPE LLC / MChJ** deb ko‘rsatilgan. Bu hujjatlar TEMPO GROUP nomiga berilganini tasdiqlamaydi; shu sabab saytning sertifikat kartalarida hujjat egasi alohida ko‘rsatilgan.
- ISO 9001:2015 hujjatida 14.10.2027 gacha amal qilishi yozilgan.
- Mahsulot muvofiqligi sertifikatida muddat **08.08.2026** da tugagan. U tarixiy hujjat sifatida ko‘rsatilgan; yangi sertifikat olingan bo‘lsa rasm va matnni yangilang.
- Rasmlar o‘zgartirilmagan, faqat saytda ko‘rsatish uchun nusxasi qo‘shilgan.

## MacBook / Windows ishlatish
1. ZIP faylni oching va `tempo-vue-uz-ru-en` papkasini VS Code bilan oching.
2. Terminalda `npm install` bajaring.
3. `npm run dev` bajaring va terminal bergan havolani brauzerda oching.
4. **About Us** tugmasini bosib, `/about-us` sahifasida ikkala sertifikatni tekshiring.
5. Saytni hostingga joylash uchun `npm run build` bajaring. Shunda yangi `dist/` papkasi yaratiladi.

**Eslatma:** ushbu ZIPga eskirgan `dist/` qo‘shilmadi. Bu muhitda Linux uchun Rollup native paketi yo‘qligi sababli production build yaratilmadi; `npm run build` kompyuteringizda kerak.

## Tekshiruvlar
- `npm run test:i18n`
- `npm run test:location`
- `npm run test:about`
- `npm run test:catalog`

## About Us rasmini yangilash
- `/about-us` sahifasidagi «Who We Are» yonidagi surat foydalanuvchi bergan ko‘k va qizil chiziqli oq quvurlar fotosuratiga almashtirildi.
- Yangi rasm `public/images/about-us-ppr-white-pipes.webp` da saqlangan; bosh sahifa surati, sertifikatlar va qolgan dizayn o‘zgarmagan.
