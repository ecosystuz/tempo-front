<script setup>
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template>
  <div class="hero-motion" role="img" :aria-label="t('hero.visualAlt')">
    <div class="hero-motion-grid" aria-hidden="true"></div><div class="hero-motion-halo" aria-hidden="true"></div>
    <div class="hero-motion-ring hero-motion-ring--outer" aria-hidden="true"></div><div class="hero-motion-ring hero-motion-ring--middle" aria-hidden="true"></div><div class="hero-motion-ring hero-motion-ring--inner" aria-hidden="true"></div>
    <div class="hero-motion-core" aria-hidden="true"><span>{{ t('hero.flow') }}</span><b>01</b></div>
    <div class="hero-motion-line hero-motion-line--one" aria-hidden="true"></div><div class="hero-motion-line hero-motion-line--two" aria-hidden="true"></div>
    <div class="hero-motion-datum hero-motion-datum--top">{{ t('hero.diameter') }}</div><div class="hero-motion-datum hero-motion-datum--bottom">{{ t('hero.precision') }} / TEMPO GROUP</div>
    <div class="hero-motion-corner hero-motion-corner--tl" aria-hidden="true"></div><div class="hero-motion-corner hero-motion-corner--br" aria-hidden="true"></div>
  </div>
</template>
