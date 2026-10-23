<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Phone, ArrowUpRight, MapPin, Menu, X, ArrowRight } from 'lucide-vue-next'
import TempoLogo from './TempoLogo.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { site, navLinks } from '../data/site'
import { useI18n } from '../i18n'
const { t, translatedAddress } = useI18n()
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
let desktopMedia
function scrollHandler() { scrolled.value = window.scrollY > 24 }
function close() { open.value = false }
function keyHandler(event) { if (event.key === 'Escape') close() }
function desktopHandler(event) { if (event.matches) close() }
watch(open, value => { document.body.classList.toggle('menu-open', value) })
watch(() => route.fullPath, close)
onMounted(() => {
  window.addEventListener('scroll', scrollHandler, { passive: true })
  window.addEventListener('keydown', keyHandler)
  desktopMedia = window.matchMedia('(min-width: 1200px)')
  desktopMedia.addEventListener('change', desktopHandler)
  desktopHandler(desktopMedia)
  scrollHandler()
})
onUnmounted(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('scroll', scrollHandler)
  window.removeEventListener('keydown', keyHandler)
  desktopMedia?.removeEventListener('change', desktopHandler)
})
</script>
<template>
  <div class="header-topline">
    <div class="container topline-inner">
      <div class="topline-left"><span class="live-indicator"></span> {{ t('header.topline') }}</div>
      <div class="topline-right">
        <RouterLink to="/boglanish#location"><MapPin :size="13" /> {{ translatedAddress }} ({{ t('common.exampleAddress') }})</RouterLink>
        <span class="topline-divider"></span>
        <a :href="`tel:${site.phoneHref}`"><Phone :size="13" /> {{ site.phoneText }}</a>
      </div>
    </div>
  </div>
  <header class="site-header" :class="{ scrolled }">
    <div class="container header-inner">
      <TempoLogo />
      <nav class="header-nav" :aria-label="t('header.menu')">
        <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href"
          :class="{ 'nav-active': route.fullPath === link.href || (link.href === '/mahsulotlar' && route.path === '/mahsulotlar') }">{{ t(`nav.${link.key}`) }}</RouterLink>
      </nav>
      <div class="header-actions">
        <a :href="`tel:${site.phoneHref}`" class="header-number"><Phone :size="17" /><span>{{ site.phoneText }}</span></a>
        <RouterLink to="/buyurtma" class="button button-red header-cta">{{ t('common.order') }} <ArrowUpRight :size="18" /></RouterLink>
        <LanguageSwitcher />
      </div>
      <button class="menu-toggle" type="button" @click="open = !open" :aria-expanded="open" aria-controls="mobile-navigation" :aria-label="t('header.toggle')">
        <X v-if="open" :size="25" /> <Menu v-else :size="25" />
      </button>
    </div>
    <Transition name="slide-down">
      <nav v-if="open" id="mobile-navigation" class="mobile-menu" :aria-label="t('header.mobileMenu')">
        <LanguageSwitcher />
        <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href" @click="close">{{ t(`nav.${link.key}`) }}<ArrowUpRight :size="17" /></RouterLink>
        <RouterLink class="mobile-menu-order" to="/buyurtma" @click="close">{{ t('common.order') }} <ArrowUpRight :size="17" /></RouterLink>
        <a :href="`tel:${site.phoneHref}`" class="mobile-menu-phone" @click="close"><Phone :size="19" /> {{ site.phoneText }} <ArrowRight :size="18" /></a>
      </nav>
    </Transition>
  </header>
</template>
