<script setup>
import PageBanner from '../components/PageBanner.vue'
import ProductsSection from '../components/ProductsSection.vue'
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template>
  <div class="inner-page products-page"><PageBanner :eyebrow="t('banners.products.eyebrow')" :title="t('banners.products.title')" :accent="t('banners.products.accent')" :description="t('banners.products.desc')" /><ProductsSection /></div>
</template>
