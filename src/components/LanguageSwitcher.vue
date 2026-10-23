<script setup>
import { useI18n } from '../i18n'
const { locale, setLocale, t, availableLocales } = useI18n()
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('common.language')">
    <button v-for="code in availableLocales" :key="code" type="button"
      :lang="code" :aria-label="`${t('common.language')}: ${code.toUpperCase()}`"
      :aria-pressed="locale === code" :class="{ active: locale === code }"
      @click="setLocale(code)">{{ code.toUpperCase() }}</button>
  </div>
</template>
