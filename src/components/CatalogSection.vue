<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight, Expand, X, BookOpen } from 'lucide-vue-next'
import { useI18n } from '../i18n'
const { t, locale } = useI18n()
const opened = ref(false)
const previewImage = computed(() => `/images/catalog/${locale.value}-wide.svg`)
const fullImage = computed(() => `/images/catalog/${locale.value}-full.svg`)
function show() { opened.value = true; document.body.classList.add('modal-open') }
function close() { opened.value = false; document.body.classList.remove('modal-open') }
function keyHandler(e) { if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', keyHandler))
onUnmounted(() => { window.removeEventListener('keydown', keyHandler); document.body.classList.remove('modal-open') })
</script>
<template>
  <section id="catalog" class="catalog-section section-space"><div class="container catalog-feature"><div class="catalog-intro" data-reveal><span class="section-eyebrow"><i></i>{{ t('catalog.eyebrow') }}</span><h2>{{ t('catalog.title') }} <span>{{ t('catalog.accent') }}</span></h2><p>{{ t('catalog.desc') }}</p><div class="catalog-feature-actions"><button type="button" class="button button-red" @click="show">{{ t('catalog.view') }} <Expand :size="18"/></button><RouterLink to="/boglanish" class="text-underline-link">{{ t('catalog.ask') }} <ArrowUpRight :size="18"/></RouterLink></div></div>
    <button type="button" class="catalog-preview" @click="show" :aria-label="t('catalog.expandAria')" data-reveal><img :src="previewImage" :alt="t('catalog.photoAlt')" loading="lazy"/><span><BookOpen :size="18"/> {{ t('catalog.open') }} <ArrowUpRight :size="18"/></span></button>
  </div></section>
  <Teleport to="body"><Transition name="modal-fade"><div v-if="opened" class="modal-backdrop catalog-backdrop" @click.self="close"><div role="dialog" aria-modal="true" :aria-label="t('catalog.dialog')" class="catalog-modal"><div class="catalog-modal-toolbar"><span><BookOpen :size="19"/> TEMPO GROUP — {{ t('common.catalog') }}</span><div><a :href="fullImage" target="_blank" rel="noopener noreferrer">{{ t('catalog.openNew') }} <ArrowUpRight :size="16"/></a><button type="button" @click="close" :aria-label="t('common.close')"><X :size="23" /></button></div></div><div class="catalog-modal-body"><img :src="fullImage" :alt="t('catalog.fullAlt')" /></div></div></div></Transition></Teleport>
</template>
