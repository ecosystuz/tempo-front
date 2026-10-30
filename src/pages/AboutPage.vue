<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight, ArrowRight, ExternalLink, FileCheck2, X, MapPin, Boxes, Layers3, GitBranch, CheckCircle2 } from 'lucide-vue-next'
import PageBanner from '../components/PageBanner.vue'
import { useI18n } from '../i18n'
import { site } from '../data/site'

const { t, translatedAddress } = useI18n()
const certificates = [
  { id: 'iso', image: '/images/certificates/iso-9001-leader-pipe.png', titleKey: 'aboutPage.isoTitle', descriptionKey: 'aboutPage.isoDescription', number: 'UTS-149-2024', date: '14.10.2027', statusKey: 'aboutPage.isoStatus' },
  { id: 'conformity', image: '/images/certificates/conformity-leader-pipe.png', titleKey: 'aboutPage.conformityTitle', descriptionKey: 'aboutPage.conformityDescription', number: '969444', date: '08.08.2026', statusKey: 'aboutPage.conformityStatus' },
]
const currentCertificate = ref(null)
const closeRef = ref(null)
function openCertificate(document) { currentCertificate.value = document }
function closeCertificate() { currentCertificate.value = null }
function handleEscape(event) { if (event.key === 'Escape' && currentCertificate.value) closeCertificate() }
watch(currentCertificate, current => {
  if (typeof document !== 'undefined') document.body.classList.toggle('certificate-modal-open', Boolean(current))
  if (current) nextTick(() => closeRef.value?.focus())
})
onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('certificate-modal-open')
})
</script>

<template>
  <div class="inner-page about-page">
    <PageBanner :eyebrow="t('aboutPage.bannerEyebrow')" :title="t('aboutPage.bannerTitle')" :accent="t('aboutPage.bannerAccent')" :description="t('aboutPage.bannerDescription')" :show-action="false" />

    <section class="about-page-story section-space">
      <div class="container about-page-story-grid">
        <div class="about-page-story-copy" data-reveal>
          <span class="section-eyebrow"><i></i>{{ t('aboutPage.storyEyebrow') }}</span>
          <h2>{{ t('aboutPage.storyTitle') }} <em>{{ t('aboutPage.storyAccent') }}</em></h2>
          <p class="about-page-lead">{{ t('aboutPage.storyLead') }}</p>
          <p>{{ t('aboutPage.storyDescription') }}</p>
          <ul class="about-page-points">
            <li><CheckCircle2 :size="20" /> {{ t('aboutPage.point1') }}</li>
            <li><CheckCircle2 :size="20" /> {{ t('aboutPage.point2') }}</li>
            <li><CheckCircle2 :size="20" /> {{ t('aboutPage.point3') }}</li>
          </ul>
          <RouterLink to="/mahsulotlar" class="button button-dark">{{ t('aboutPage.viewProducts') }} <ArrowUpRight :size="18" /></RouterLink>
        </div>
        <div class="about-page-story-image" data-reveal>
          <img src="/images/about-us-ppr-white-pipes.webp" :alt="t('aboutPage.storyImageAlt')" loading="lazy" />
          <div class="about-page-image-label"><span>TEMPO GROUP</span><span>{{ t('aboutPage.locationLabel') }}</span></div>
        </div>
      </div>
    </section>

    <section class="about-page-range section-space">
      <div class="container">
        <div class="about-page-section-heading" data-reveal>
          <div><span class="section-eyebrow"><i></i>{{ t('aboutPage.rangeEyebrow') }}</span>
            <h2>{{ t('aboutPage.rangeTitle') }} <em>{{ t('aboutPage.rangeAccent') }}</em></h2></div>
          <p>{{ t('aboutPage.rangeDescription') }}</p>
        </div>
        <div class="about-page-range-grid">
          <article class="about-page-range-card" data-reveal>
            <div class="about-page-range-icon"><Layers3 :size="27" /></div>
            <span class="about-page-range-number">01</span>
            <h3>{{ t('aboutPage.pipeTitle') }}</h3><p>{{ t('aboutPage.pipeDescription') }}</p>
          </article>
          <article class="about-page-range-card" data-reveal>
            <div class="about-page-range-icon"><GitBranch :size="27" /></div>
            <span class="about-page-range-number">02</span>
            <h3>{{ t('aboutPage.fittingTitle') }}</h3><p>{{ t('aboutPage.fittingDescription') }}</p>
          </article>
          <article class="about-page-range-card" data-reveal>
            <div class="about-page-range-icon"><Boxes :size="27" /></div>
            <span class="about-page-range-number">03</span>
            <h3>{{ t('aboutPage.corrugatedTitle') }}</h3><p>{{ t('aboutPage.corrugatedDescription') }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="certificates" class="about-page-certificates section-space">
      <div class="container">
        <div class="about-page-section-heading" data-reveal>
          <div><span class="section-eyebrow"><i></i>{{ t('aboutPage.certEyebrow') }}</span>
            <h2>{{ t('aboutPage.certTitle') }} <em>{{ t('aboutPage.certAccent') }}</em></h2></div>
          <p>{{ t('aboutPage.certDescription') }}</p>
        </div>
        <div class="certificate-grid">
          <article v-for="certificate in certificates" :key="certificate.id" class="certificate-card" data-reveal>
            <button class="certificate-preview" type="button" @click="openCertificate(certificate)" :aria-label="t('aboutPage.previewAria', { name: t(certificate.titleKey) })">
              <img :src="certificate.image" :alt="t(certificate.titleKey)" loading="lazy" />
              <span class="certificate-preview-hint"><ExternalLink :size="16" /> {{ t('aboutPage.enlarge') }}</span>
            </button>
            <div class="certificate-card-body">
              <div class="certificate-card-top"><span class="certificate-type"><FileCheck2 :size="16" /> {{ t('aboutPage.document') }}</span><span class="certificate-number">{{ certificate.number }}</span></div>
              <h3>{{ t(certificate.titleKey) }}</h3>
              <p>{{ t(certificate.descriptionKey) }}</p>
              <dl class="certificate-details"><div><dt>{{ t('aboutPage.holder') }}</dt><dd>{{ t('aboutPage.holderName') }}</dd></div>
                <div><dt>{{ t('aboutPage.expiry') }}</dt><dd>{{ certificate.date }}</dd></div></dl>
              <span class="certificate-status" :class="{ 'is-expired': certificate.id === 'conformity' }">{{ t(certificate.statusKey) }}</span>
              <button class="certificate-open" type="button" @click="openCertificate(certificate)">{{ t('aboutPage.enlarge') }} <ArrowUpRight :size="18" /></button>
            </div>
          </article>
        </div>
        <p class="about-page-certificate-note"><FileCheck2 :size="18" />{{ t('aboutPage.certificateNote') }}</p>
      </div>
    </section>

    <section class="about-page-last section-space"><div class="container"><div class="about-page-last-box">
      <div><span class="section-eyebrow"><i></i>{{ t('aboutPage.contactEyebrow') }}</span><h2>{{ t('aboutPage.contactTitle') }}</h2><p>{{ t('aboutPage.contactDescription') }}</p><a :href="site.mapsUrl" target="_blank" rel="noopener noreferrer" class="about-page-address"><MapPin :size="18"/>{{ translatedAddress }}</a></div>
      <RouterLink class="button button-red button-lg" to="/boglanish">{{ t('aboutPage.contactButton') }} <ArrowRight :size="20" /></RouterLink>
    </div></div></section>

    <Teleport to="body">
      <div v-if="currentCertificate" class="certificate-lightbox" role="presentation" @click.self="closeCertificate">
        <section class="certificate-lightbox-panel" role="dialog" aria-modal="true" :aria-label="t(currentCertificate.titleKey)">
          <div class="certificate-lightbox-top"><span><FileCheck2 :size="19" />{{ t(currentCertificate.titleKey) }}</span>
            <div><a :href="currentCertificate.image" target="_blank" rel="noopener noreferrer" :aria-label="t('aboutPage.openOriginal')"><ExternalLink :size="20" /></a>
            <button ref="closeRef" type="button" @click="closeCertificate" :aria-label="t('common.close')"><X :size="22" /></button></div></div>
          <div class="certificate-lightbox-image"><img :src="currentCertificate.image" :alt="t(currentCertificate.titleKey)" /></div>
        </section>
      </div>
    </Teleport>
  </div>
</template>
