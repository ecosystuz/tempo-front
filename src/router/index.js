import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue'), meta: { title: 'Bosh sahifa' } },
    { path: '/mahsulotlar', name: 'products', component: () => import('../pages/ProductsPage.vue'), meta: { title: 'Mahsulotlar' } },
    { path: '/boglanish', name: 'contact', component: () => import('../pages/ContactPage.vue'), meta: { title: 'Bog‘lanish' } },
    { path: '/buyurtma', name: 'order', component: () => import('../pages/OrderPage.vue'), meta: { title: 'Buyurtma berish' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ el: to.hash, top: 108, behavior: 'smooth' }), 420)
      })
    }
    return { top: 0 }
  },
})
export default router
