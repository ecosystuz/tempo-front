/**
 * O'ZGARTIRISH UCHUN ASOSIY FAYL.
 * Brand/telefon: foydalanuvchi taqdim etgan Tempo katalogidan.
 * Manzil va Google Maps: loyiha egasi taqdim etgan maʼlumotlar.
 * Telegram/Instagram/email: katalogda tasdiqlanmaganligi sababli kiritilmadi.
 */
export const site = {
  name: 'Tempo',
  legalName: 'TEMPO GROUP',
  slogan: 'Hayotingizni qulay va xavfsiz qiladigan mukammallik.',
  phoneText: '+998 (91) 444 44 22',
  phoneHref: '+998914444422',
  website: 'https://tempogroup.uz',
  websiteText: 'tempogroup.uz',
  // Manzil va Google Maps havolasi loyiha egasi tomonidan berilgan.
  address: 'Buxoro viloyati, Buxoro shahri, Alpomish 1',
  mapsQuery: '39.748492,64.460131',
  mapsCoordinates: '39.748492,64.460131',
  mapsUrl: 'https://maps.app.goo.gl/cENGJWrjhFXDazkv7',
  // Ixtiyoriy: backend so'rov qabul qiluvchi endpoint yoqilsa, URL kiriting.
  formEndpoint: '',
}

export const navLinks = [
  { key: 'home', name: 'Bosh sahifa', href: '/' },
  { key: 'products', name: 'Mahsulotlar', href: '/mahsulotlar' },
  { key: 'about', name: 'Biz haqimizda', href: '/about-us' },
  { key: 'catalog', name: 'Katalog', href: '/#catalog' },
  { key: 'contact', name: 'Bog‘lanish', href: '/boglanish' },
]

export const categories = [
  { key: 'all', name: 'Barchasi' },
  { key: 'fittings', name: 'Fitinglar' },
  { key: 'pipes', name: 'Quvurlar' },
  { key: 'corrugated', name: 'Gofra quvurlar' },
]

export const products = [
  {
    id: 'elbow-87', category: 'fittings', tag: 'Fiting',
    name: '87° burchak', subheading: 'Kanalizatsiya fitingi',
    description: 'Kanalizatsiya quvurlarining yo‘nalishini o‘zgartirishda qo‘llanadigan burchak elementi.',
    image: '/images/burchak-87.webp',
  },
  {
    id: 'elbow-45', category: 'fittings', tag: 'Fiting',
    name: '45° burchak', subheading: 'Burchak elementi',
    description: 'Quvur yo‘nalishini 45 darajaga burish uchun ulash elementi.',
    image: '/images/burchak-45.webp',
  },
  {
    id: 'junction', category: 'fittings', tag: 'Fiting',
    name: 'Troynik', subheading: 'Tarmoqlash elementi',
    description: 'Asosiy quvur yo‘nalishiga qo‘shimcha tarmoq ulash uchun ishlatiladi.',
    image: '/images/troynik.webp',
  },
  {
    id: 'coupler', category: 'fittings', tag: 'Fiting',
    name: 'Mufta', subheading: 'Biriktirish elementi',
    description: 'Ikki quvur qismini ulash uchun mo‘ljallangan biriktirgich.',
    image: '/images/mufta.webp',
  },
  {
    id: 'reducer', category: 'fittings', tag: 'Fiting',
    name: 'Reduksiya', subheading: 'O‘tish elementi',
    description: 'Turli diametrli qismlarni birlashtirishda qo‘llanadigan o‘tish elementi.',
    image: '/images/reduksiya.webp',
  },
  {
    id: 'pvc-pipe', category: 'pipes', tag: 'Quvur',
    name: 'PVC quvurlar', subheading: 'Oq quvurlar seriyasi',
    description: 'Muhandislik kommunikatsiyalari uchun oq rangdagi quvur assortimenti.',
    image: '/images/pvc-quvurlar.webp',
  },
  {
    id: 'ppr-pipe', category: 'pipes', tag: 'Quvur',
    name: 'PPR quvurlar', subheading: 'Rangli liniya seriyasi',
    description: 'Suv tizimlari uchun katalogda taqdim etilgan rangli quvur mahsulotlari.',
    image: '/images/rangli-quvurlar.webp',
  },
  {
    id: 'multilayer-pipe', category: 'pipes', tag: 'Quvur',
    name: 'Ko‘p qatlamli quvurlar', subheading: 'Oq-ko‘k seriya',
    description: 'Katalogda ko‘rsatilgan rangli qatlamli quvurlar. O‘lcham va xususiyatlarni menejerdan aniqlang.',
    image: '/images/pipe-blue.webp',
  },
  {
    id: 'flex-pipe', category: 'corrugated', tag: 'Gofra',
    name: 'Gofra quvurlar', subheading: 'Egiluvchan quvurlar',
    description: 'Qizil, binafsha va kulrang variantlarda taqdim etilgan egiluvchan quvurlar.',
    image: '/images/gofra.webp',
  },
]

export const advantages = [
  { icon: 'Layers3', title: 'Keng assortiment', description: 'Bir katalogda quvurlar, burchaklar, muftalar, troyniklar va boshqa elementlar.' },
  { icon: 'ShieldCheck', title: 'Sifatga e’tibor', description: 'To‘g‘ri mahsulotni tanlashda texnik ehtiyojlarni hisobga oladigan yondashuv.' },
  { icon: 'HandShake', title: 'Hamkorlikka ochiqlik', description: 'Chakana va loyiha buyurtmalari bo‘yicha savollaringizni muhokama qilamiz.' },
  { icon: 'Truck', title: 'Buyurtma bo‘yicha yordam', description: 'Mavjudlik, komplektatsiya va yetkazish shartlarini menejerdan bilib oling.' },
]
