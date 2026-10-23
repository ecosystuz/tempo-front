<script setup>
import { ArrowUpRight, CheckCircle2, BadgeCheck } from 'lucide-vue-next'
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template>
  <section id="about" class="about-section section-space"><div class="container about-layout">
    <div class="about-visual" data-reveal><div class="about-image-wrap"><img src="/images/pvc-quvurlar.webp" :alt="t('about.photoAlt')" loading="lazy"/></div><div class="about-visual-caption"><span>{{ t('about.imageLabel') }}</span><b>01 — 09</b></div><div class="about-small-float"><BadgeCheck :size="23" /><span>{{ t('about.float1') }}<br/><b>{{ t('about.float2') }}</b></span></div></div>
    <div class="about-text" data-reveal><span class="section-eyebrow"><i></i>{{ t('about.eyebrow') }}</span><h2>{{ t('about.line1') }}<br/><em>{{ t('about.line2') }}</em><br/>{{ t('about.line3') }}</h2><p class="about-lead">{{ t('about.lead') }}</p><p>{{ t('about.desc') }}</p>
      <div class="about-feature-list"><span><CheckCircle2 :size="18"/> {{ t('about.feature1') }}</span><span><CheckCircle2 :size="18"/> {{ t('about.feature2') }}</span><span><CheckCircle2 :size="18"/> {{ t('about.feature3') }}</span></div><RouterLink class="button button-dark" to="/boglanish">{{ t('about.cta') }} <ArrowUpRight :size="18"/></RouterLink>
    </div>
  </div></section>
</template>
