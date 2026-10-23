<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import ContactSection from '../components/ContactSection.vue'
import { useI18n } from '../i18n'
const { t } = useI18n()
const route = useRoute()
const selectedProduct = computed(() => typeof route.query.product === 'string' ? route.query.product : '')
</script>
<template>
  <div class="inner-page order-page"><PageBanner :show-action="false" :eyebrow="t('banners.order.eyebrow')" :title="t('banners.order.title')" :accent="t('banners.order.accent')" :description="t('banners.order.desc')" /><ContactSection order-only :preselected-product="selectedProduct" /></div>
</template>
