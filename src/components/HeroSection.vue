<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight, ArrowRight, ArrowDown, Check, Layers3 } from 'lucide-vue-next'
import HeroPipeVisual from './HeroPipeVisual.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const activeIndex = ref(0)
const slideCount = 4
let carouselTimer = null

function stopCarousel() {
  if (carouselTimer !== null) {
    window.clearInterval(carouselTimer)
    carouselTimer = null
  }
}

function startCarousel() {
  stopCarousel()
  carouselTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slideCount
  }, 3000)
}

function selectSlide(index) {
  if (!Number.isInteger(index) || index < 0 || index >= slideCount) return
  activeIndex.value = index
  startCarousel()
}

function onVisibilityChange() {
  if (document.hidden) stopCarousel()
  else startCarousel()
}

onMounted(() => {
  startCarousel()
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onBeforeUnmount(() => {
  stopCarousel()
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <section id="home" class="hero-section">
    <div class="hero-grid-decoration" aria-hidden="true"></div>
    <div class="hero-outline-orbit" aria-hidden="true"></div>
    <div class="container hero-layout">
      <div class="hero-content">
        <div class="hero-eyebrow"><span class="eyebrow-line"></span><span>TEMPO GROUP <b>·</b> {{ t('hero.country') }}</span></div>
        <Transition name="hero-copy-fade" mode="out-in">
          <div :key="activeIndex" class="hero-slide-copy">
            <h1>{{ t(`hero.slides.${activeIndex}.line1`) }}<br /><span>{{ t(`hero.slides.${activeIndex}.line2a`) }}</span> {{ t(`hero.slides.${activeIndex}.line2b`) }}</h1>
            <p class="hero-intro">{{ t(`hero.slides.${activeIndex}.desc`) }}</p>
          </div>
        </Transition>
        <div class="hero-buttons">
          <RouterLink class="button button-red button-lg" to="/mahsulotlar">{{ t('hero.products') }} <ArrowUpRight :size="20" /></RouterLink>
          <RouterLink class="button hero-secondary" to="/about-us">{{ t('hero.about') }} <ArrowRight :size="19" /></RouterLink>
        </div>
        <div class="hero-checks" aria-live="off">
          <span v-for="feature in ['feature1', 'feature2', 'feature3']" :key="feature"><Check :size="15" />{{ t(`hero.slides.${activeIndex}.${feature}`) }}</span>
        </div>
      </div>
      <div class="hero-right"><HeroPipeVisual :active-index="activeIndex" @select="selectSlide" /></div>
      <a href="#featured-products" class="hero-scroll"><span class="scroll-circle"><ArrowDown :size="17" /></span><span>{{ t('hero.scroll') }}</span></a>
    </div>
    <div class="hero-bottom-rule"></div>
  </section>
  <div class="brand-rail"><div class="container rail-inner"><div class="rail-label"><Layers3 :size="23" />{{ t('hero.rail') }}</div><div class="rail-divider"></div><div>{{ t('hero.pipe') }} <span>+</span> {{ t('hero.fittings') }} <span>+</span> {{ t('categories.corrugatedTag') }}</div><RouterLink to="/boglanish">{{ t('hero.proposal') }} <ArrowUpRight :size="18" /></RouterLink></div></div>
</template>

<style scoped>
.hero-slide-copy { min-height: 215px; }
.hero-copy-fade-enter-active, .hero-copy-fade-leave-active { transition: opacity .32s ease, transform .32s ease; }
.hero-copy-fade-enter-from { opacity: 0; transform: translateY(9px); }
.hero-copy-fade-leave-to { opacity: 0; transform: translateY(-9px); }
@media (max-width: 760px) { .hero-slide-copy { min-height: 0; } }
@media (prefers-reduced-motion: reduce) { .hero-copy-fade-enter-active, .hero-copy-fade-leave-active { transition: none; } }
</style>
