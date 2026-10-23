<script setup>
import { ArrowUpRight, ArrowRight, ArrowDown, Check, Layers3 } from 'lucide-vue-next'
import HeroPipeVisual from './HeroPipeVisual.vue'
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template>
  <section id="home" class="hero-section">
    <div class="hero-grid-decoration" aria-hidden="true"></div><div class="hero-outline-orbit" aria-hidden="true"></div>
    <div class="container hero-layout"><div class="hero-content">
      <div class="hero-eyebrow"><span class="eyebrow-line"></span><span>TEMPO GROUP <b>·</b> {{ t('hero.country') }}</span></div>
      <h1>{{ t('hero.line1') }}<br /><span>{{ t('hero.line2a') }}</span> {{ t('hero.line2b') }}</h1>
      <p class="hero-intro">{{ t('hero.desc') }}</p>
      <div class="hero-buttons"><RouterLink class="button button-red button-lg" to="/mahsulotlar">{{ t('hero.products') }} <ArrowUpRight :size="20" /></RouterLink><RouterLink class="button hero-secondary" to="/#about">{{ t('hero.about') }} <ArrowRight :size="19" /></RouterLink></div>
      <div class="hero-checks"><span><Check :size="15"/> {{ t('hero.pipe') }}</span><span><Check :size="15"/> {{ t('hero.fittings') }}</span><span><Check :size="15"/> {{ t('hero.gofra') }}</span></div>
    </div><div class="hero-right"><HeroPipeVisual /></div><a href="#featured-products" class="hero-scroll"><span class="scroll-circle"><ArrowDown :size="17" /></span><span>{{ t('hero.scroll') }}</span></a></div>
    <div class="hero-bottom-rule"></div>
  </section>
  <div class="brand-rail"><div class="container rail-inner"><div class="rail-label"><Layers3 :size="23" /> {{ t('hero.rail') }}</div><div class="rail-divider"></div><div>{{ t('hero.pipe') }} <span>+</span> {{ t('hero.fittings') }} <span>+</span> {{ t('categories.corrugatedTag') }}</div><RouterLink to="/boglanish">{{ t('hero.proposal') }} <ArrowUpRight :size="18" /></RouterLink></div></div>
</template>
