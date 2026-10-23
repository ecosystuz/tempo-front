<script setup>
import { ArrowRight, ClipboardList, PhoneCall, PackageCheck } from 'lucide-vue-next'
import { useI18n } from '../i18n'
import { messages } from '../i18n/messages'
const { t, locale } = useI18n()
const icons = [ClipboardList, PhoneCall, PackageCheck]
</script>
<template>
  <section class="process-section section-space"><div class="container"><div class="process-header" data-reveal><div><span class="section-eyebrow"><i></i>{{ t('process.eyebrow') }}</span><h2>{{ t('process.line1') }}<br/><span>{{ t('process.line2') }}</span></h2></div><p>{{ t('process.desc') }}</p></div>
    <div class="process-grid"><div v-for="(item,index) in [0,1,2]" :key="index" class="process-card" data-reveal><div class="process-icon"><component :is="icons[index]" :size="25"/></div><span class="process-number">0{{ index + 1 }}</span><h3>{{ messages[locale].process.items[index][0] }}</h3><p>{{ messages[locale].process.items[index][1] }}</p><ArrowRight v-if="index < 2" class="process-between" :size="19"/></div></div>
  </div></section>
</template>
