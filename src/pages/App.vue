<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import FloatingCall from './components/FloatingCall.vue'
import IntroPipeTunnel from './components/IntroPipeTunnel.vue'
import { useReveal } from './composables/useReveal'
import { useI18n } from './i18n'
const { locale, t } = useI18n()
const route = useRoute()
const INTRO_KEY = 'tempo-pipe-tunnel-seen-v1'
function shouldShowIntro() {
  if (typeof  window === 'undefined') return false
  try { return sessionStorage.getItem(INTRO_KEY) !== '1' }
  catch { return true }
}
const showIntro = ref(shouldShowIntro())
const { refresh } = useReveal()
function closeIntro() {
  showIntro.value = false
  try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* optional storage */ }
  refresh()
}
watch([() => route.name, locale], () => {
  const name = ['home', 'products', 'about', 'contact', 'order'].includes(route.name) ? route.name : 'home'
  document.title = `${t(`titles.${name}`)} | TEMPO GROUP`
  document.documentElement.lang = locale.value
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.content = name === 'home' ? t('hero.desc') : t(`banners.${name}.desc`)
  nextTick(refresh)
}, { immediate: true })
</script>
<template>
  <SiteHeader />
  <main id="main-content"><RouterView v-slot="{ Component }"><Transition name="page-fade" mode="out-in" @after-enter="refresh"><component :is="Component" :key="$route.path" /></Transition></RouterView></main>
  <SiteFooter /><FloatingCall /><IntroPipeTunnel v-if="showIntro" @complete="closeIntro" />
</template>  