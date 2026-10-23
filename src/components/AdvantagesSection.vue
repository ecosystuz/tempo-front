<script setup>
import { Layers3, ShieldCheck, Handshake, Truck, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../i18n'
import SectionHeading from './SectionHeading.vue'
const { t, localizedAdvantages } = useI18n()
const icons = { Layers3, ShieldCheck, HandShake: Handshake, Truck }
</script>
<template>
  <section id="advantages" class="advantages-section section-space"><div class="container">
    <SectionHeading :eyebrow="t('advantages.eyebrow')" :title="t('advantages.title')" :highlight="t('advantages.accent')" :description="t('advantages.desc')" inverse />
    <div class="advantages-grid"><article v-for="(item, index) in localizedAdvantages" :key="index" class="advantage-card" data-reveal :style="{'--stagger':`${index*90}ms`}"><div class="advantage-top"><span class="advantage-icon"><component :is="icons[item.icon]" :size="28" :stroke-width="1.6"/></span><span class="advantage-num">0{{index+1}} / 04</span></div><h3>{{ item.title }}</h3><p>{{ item.description }}</p><ArrowUpRight class="advantage-corner" :size="18" /></article></div>
  </div></section>
</template>
