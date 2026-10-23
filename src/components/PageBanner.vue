<script setup>
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../i18n'
const { t } = useI18n()
defineProps({ eyebrow: {type:String,default:'TEMPO GROUP'}, title: String, accent: String, description: String, showAction: {type:Boolean,default:true} })
</script>
<template>
  <section class="page-banner"><div class="banner-grid" aria-hidden="true"></div><div class="container banner-inner">
    <nav class="breadcrumbs" :aria-label="t('common.breadcrumb')"><RouterLink to="/">{{ t('common.home') }}</RouterLink><ArrowRight :size="14"/><span>{{ eyebrow }}</span></nav>
    <div class="banner-content"><div><span class="banner-kicker"><span></span> {{ eyebrow }}</span><h1>{{ title }} <em>{{ accent }}</em></h1><p>{{ description }}</p></div><RouterLink v-if="showAction" to="/buyurtma" class="button button-red banner-action">{{ t('products.leaveRequest') }} <ArrowUpRight :size="20"/></RouterLink></div>
  </div></section>
</template>
