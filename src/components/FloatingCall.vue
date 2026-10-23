<script setup>
import { Phone, ArrowUpRight } from 'lucide-vue-next'
import { site } from '../data/site'
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template><a class="floating-call" :href="`tel:${site.phoneHref}`" :aria-label="`${t('common.call')}: ${site.phoneText}`"><span class="floating-call-ring"></span><Phone :size="22"/><span class="floating-tooltip">{{ t('common.call') }} <ArrowUpRight :size="14"/></span></a></template>
