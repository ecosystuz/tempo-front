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
  <div class="inner-page contact-page"><PageBanner :eyebrow="t('banners.contact.eyebrow')" :title="t('banners.contact.title')" :accent="t('banners.contact.accent')" :description="t('banners.contact.desc')" /><ContactSection :preselected-product="selectedProduct" /></div>
</template>
