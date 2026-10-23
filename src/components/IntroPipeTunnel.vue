<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from '../i18n'
const { t } = useI18n()

const emit = defineEmits(['complete'])
const rings = Array.from({ length: 9 }, (_, index) => index)
const stage = ref('tunnel')
const reducedMotion = ref(false)
const timers = []
let done = false

function after(ms, callback) {
  const timer = window.setTimeout(callback, ms)
  timers.push(timer)
}

function finish() {
  if (done) return
  done = true
  timers.forEach(window.clearTimeout)
  document.body.classList.remove('intro-open')
  emit('complete')
}

function skipIntro() {
  timers.forEach(window.clearTimeout)
  timers.length = 0
  stage.value = 'exit'
  after(reducedMotion.value ? 0 : 420, finish)
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.body.classList.add('intro-open')
  if (reducedMotion.value) {
    stage.value = 'brand'
    after(320, finish)
    return
  }
  after(1550, () => (stage.value = 'brand'))
  after(2270, () => (stage.value = 'exit'))
  after(2810, finish)
})

onBeforeUnmount(() => {
  timers.forEach(window.clearTimeout)
  document.body.classList.remove('intro-open')
})
</script>

<template>
  <div
    class="tempo-intro"
    :class="`tempo-intro--${stage}`"
    role="status"
    :aria-label="t('intro.aria')"
    aria-live="off"
  >
    <div class="tempo-intro-grid" aria-hidden="true"></div>
    <div class="tempo-intro-light" aria-hidden="true"></div>
    <div class="tempo-intro-target" aria-hidden="true">
      <span class="tempo-intro-axis tempo-intro-axis--h"></span>
      <span class="tempo-intro-axis tempo-intro-axis--v"></span>
      <span
        v-for="i in rings"
        :key="i"
        class="tempo-intro-ring"
        :style="{ '--ring-index': i }"
      ></span>
      <span class="tempo-intro-center"></span>
    </div>
    <div class="tempo-intro-brand" :aria-label="t('intro.aria')">
      <img class="tempo-intro-official-logo" src="/images/brand/tempo-logo-white.png" alt="Tempo" width="570" height="155" />
      <p>{{ t('intro.slogan') }}</p>
    </div>
    <div class="tempo-intro-meta" aria-hidden="true"><span>{{ t('intro.engineered') }}</span><span>{{ t('hero.country') }} / 2026</span></div>
    <button type="button" class="tempo-intro-skip" @click="skipIntro">
      {{ t('intro.skip') }} <span aria-hidden="true">↗</span>
    </button>
    <div class="tempo-intro-progress" aria-hidden="true"><span></span></div>
  </div>
</template>
