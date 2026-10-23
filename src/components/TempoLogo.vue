<script setup>
import { useI18n } from '../i18n'
const { t } = useI18n()
defineProps({
  light: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <RouterLink
    to="/"
    class="tempo-logo tempo-logo--official"
    :class="{ 'logo-light': light, 'logo-compact': compact }"
    :aria-label="`Tempo — ${t('common.home')}`"
  >
    <img
      :src="light ? '/images/brand/tempo-logo-white.png' : '/images/brand/tempo-logo-navy.png'"
      alt="Tempo"
      width="380"
      height="104"
      decoding="async"
    />
  </RouterLink>
</template>
