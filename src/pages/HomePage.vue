<script setup>
import HeroSection from '../components/HeroSection.vue'
import ProductsSection from '../components/ProductsSection.vue'
import AdvantagesSection from '../components/AdvantagesSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import CatalogSection from '../components/CatalogSection.vue'
import { ArrowUpRight, Phone } from 'lucide-vue-next'
import { site } from '../data/site'
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>
<template>
  <div class="home-page">
    <HeroSection /><ProductsSection preview /><AdvantagesSection /><AboutSection /><ProcessSection /><CatalogSection />
    <section class="home-contact-promo section-space"><div class="container"><div class="home-contact-inner" data-reveal>
      <div><span class="section-eyebrow"><i></i>{{ t('promo.eyebrow') }}</span><h2>{{ t('promo.titleA') }} <em>{{ t('promo.titleB') }}</em> {{ t('promo.titleC') }}</h2><p>{{ t('promo.desc') }}</p></div>
      <div class="home-contact-actions"><RouterLink class="button button-red button-lg" to="/boglanish">{{ t('common.contact') }} <ArrowUpRight :size="19" /></RouterLink><a :href="`tel:${site.phoneHref}`"><Phone :size="17"/> {{ site.phoneText }}</a></div>
    </div></div></section>
  </div>
</template>
