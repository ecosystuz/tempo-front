import { computed, ref } from 'vue'
import { products as catalog, categories as categoryData, advantages as advantageData } from '../data/site.js'
import { messages } from './messages.js'

export const availableLocales = ['uz', 'ru', 'en']
const STORAGE_KEY = 'tempo-preferred-language'

function initialLocale() {
  if (typeof window === 'undefined') return 'uz'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (availableLocales.includes(stored)) return stored
  } catch { /* storage is optional */ }
  return 'uz'
}
export const locale = ref(initialLocale())

export function setLocale(next) {
  if (!availableLocales.includes(next)) return
  locale.value = next
  if (typeof document !== 'undefined') document.documentElement.lang = next
  try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* optional */ }
}

export function t(path, params = {}) {
  const keys = path.split('.')
  let value = messages[locale.value]
  for (const key of keys) value = value?.[key]
  if (value === undefined) {
    value = messages.uz
    for (const key of keys) value = value?.[key]
  }
  if (typeof value !== 'string') return path
  return value.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''))
}

export const localizedProducts = computed(() => catalog.map(product => {
  const item = messages[locale.value].productItems[product.id] || messages.uz.productItems[product.id]
  const tagKey = product.category === 'fittings' ? 'fittingTag' : product.category === 'corrugated' ? 'corrugatedTag' : 'pipeTag'
  return { ...product, name: item[0], subheading: item[1], description: item[2], tag: t(`categories.${tagKey}`) }
}))
export const localizedCategories = computed(() => categoryData.map(c => ({ ...c, name: t(`categories.${c.key}`) })))
export const localizedAdvantages = computed(() => advantageData.map((item, index) => ({
  ...item, title: messages[locale.value].advantages.items[index][0], description: messages[locale.value].advantages.items[index][1],
})))
export const translatedAddress = computed(() => t('location.address'))
export const translatedMapsQuery = computed(() => t('location.query'))

export function useI18n() { return { locale, setLocale, availableLocales, t, localizedProducts, localizedCategories, localizedAdvantages, translatedAddress, translatedMapsQuery } }

// Initialize html lang immediately on client; no external i18n dependency required.
if (typeof document !== 'undefined') document.documentElement.lang = locale.value
