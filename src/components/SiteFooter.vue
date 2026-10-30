<script setup>
import { Phone, MapPin, Globe2, ArrowUpRight, ArrowUp, ArrowRight } from 'lucide-vue-next'
import TempoLogo from './TempoLogo.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { site, navLinks } from '../data/site'
import { useI18n } from '../i18n'
const { t, translatedAddress } = useI18n()
const year = new Date().getFullYear()
function top() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>
<template>
  <footer class="site-footer"><div class="footer-glow" aria-hidden="true"></div><div class="container">
    <div class="footer-intro"><div><span class="footer-kicker">{{ t('footer.kicker') }}</span><h2>{{ t('footer.title1') }}<br/><span>{{ t('footer.title2') }}</span></h2></div><RouterLink to="/buyurtma" class="footer-talk">{{ t('about.cta') }} <ArrowUpRight :size="23"/></RouterLink></div>
    <div class="footer-columns"><div class="footer-brand-column"><TempoLogo light /><p>{{ t('footer.desc') }}</p><a class="footer-web" :href="site.website" target="_blank" rel="noopener noreferrer">{{ site.websiteText }} <ArrowUpRight :size="16"/></a><LanguageSwitcher /></div>
      <div class="footer-links"><h3>{{ t('footer.pages') }}</h3><RouterLink v-for="link in navLinks" :key="link.href" :to="link.href">{{ t(`nav.${link.key}`) }}</RouterLink><RouterLink to="/buyurtma">{{ t('common.order') }}</RouterLink></div>
      <div class="footer-links"><h3>{{ t('footer.products') }}</h3><RouterLink to="/mahsulotlar">{{ t('categories.fittings') }}</RouterLink><RouterLink to="/mahsulotlar">{{ t('footer.pvc') }}</RouterLink><RouterLink to="/mahsulotlar">{{ t('footer.ppr') }}</RouterLink><RouterLink to="/mahsulotlar">{{ t('categories.corrugated') }}</RouterLink><RouterLink to="/#catalog">{{ t('footer.catalog') }}</RouterLink></div>
      <div class="footer-contact"><h3>{{ t('footer.contact') }}</h3><a :href="`tel:${site.phoneHref}`"><Phone :size="17"/><strong>{{ site.phoneText }}</strong></a><div><MapPin :size="17"/><span>{{ translatedAddress }}</span></div><a :href="site.website" target="_blank" rel="noopener noreferrer"><Globe2 :size="17"/><span>{{ site.websiteText }}</span></a><a :href="site.mapsUrl" target="_blank" rel="noopener noreferrer" class="footer-map-link">{{ t('common.seeMap') }} <ArrowRight :size="16"/></a></div>
    </div>
    <div class="footer-watermark" aria-hidden="true">TEMPO</div>
    <div class="footer-bottom"><span>© {{ year }} {{ site.legalName }}. {{ t('footer.rights') }}</span><span>{{ t('footer.visualNotice') }}</span><button type="button" @click="top">{{ t('footer.top') }} <ArrowUp :size="17"/></button></div>
  </div></footer>
</template>
