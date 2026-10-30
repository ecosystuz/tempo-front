<script setup>
import { ref, watch, computed } from 'vue'
import { Phone, MapPin, Globe2, ArrowUpRight, Copy, Check, ExternalLink } from 'lucide-vue-next'
import { site } from '../data/site'
import { useI18n } from '../i18n'
import { messages } from '../i18n/messages'
const { t, locale, localizedProducts, translatedAddress } = useI18n()
const props = defineProps({ preselectedProduct: { type: String, default: '' }, orderOnly: { type: Boolean, default: false } })
// Store stable product IDs so changing the language does not reset the form.
const form = ref({ name: '', phone: '', product: '', quantity: '', note: '' })
const errorKey = ref('')
const error = computed(() => errorKey.value ? t(errorKey.value) : '')
const prepared = ref(false)
const copied = ref(false)
const sending = ref(false)
// Pin the embedded map to the exact coordinates in the supplied Google Maps link.
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsCoordinates)}&z=17&output=embed`
const mapLink = site.mapsUrl
const productName = computed(() => localizedProducts.value.find(p => p.id === form.value.product)?.name || (form.value.product === 'other' ? t('contact.other') : ''))
watch(() => props.preselectedProduct, val => { if (val && localizedProducts.value.some(p => p.id === val)) { form.value.product = val; prepared.value = false } }, { immediate: true })
const message = computed(() => [
  t('contact.messageTitle'),
  `${t('contact.labelName')}: ${form.value.name}`,
  `${t('contact.labelPhone')}: ${form.value.phone}`,
  `${t('contact.labelProduct')}: ${productName.value}`,
  `${t('contact.labelQuantity')}: ${form.value.quantity || t('contact.unspecified')}`,
  `${t('contact.labelNote')}: ${form.value.note || t('contact.none')}`,
].join('\n'))
function validPhone(value) { return value.replace(/\D/g, '').length >= 9 }
async function submit() {
  prepared.value = false
  copied.value = false
  if (!form.value.name.trim() || !validPhone(form.value.phone) || !form.value.product) {
    errorKey.value = 'contact.validation'
    return
  }
  errorKey.value = ''
  if (site.formEndpoint) {
    sending.value = true
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form.value, product: productName.value, productId: form.value.product }),
      })
      if (!response.ok) throw new Error('Request failed')
      prepared.value = true
      return
    } catch {
      errorKey.value = 'contact.serverError'
    } finally { sending.value = false }
  }
  prepared.value = true
}
async function copy() {
  try { await navigator.clipboard.writeText(message.value); copied.value = true }
  catch {
    const node = document.createElement('textarea')
    node.value = message.value; node.style.position = 'fixed'; node.style.left = '-9999px'
    document.body.appendChild(node); node.select()
    copied.value = document.execCommand('copy'); node.remove()
  }
}
</script>
<template>
  <section id="contact" class="contact-section section-space" :class="{ 'order-only': orderOnly }"><div class="container">
    <div v-if="!orderOnly" class="contact-heading" data-reveal><div><span class="section-eyebrow"><i></i>{{ t('contact.eyebrow') }}</span><h2>{{ t('contact.title1') }} <em>{{ t('contact.title2') }}</em></h2></div><p>{{ t('contact.desc') }}</p></div>
    <div class="contact-content">
      <div v-if="orderOnly" class="order-side" data-reveal><span class="section-eyebrow"><i></i>{{ t('contact.orderEyebrow') }}</span><h2>{{ t('contact.orderTitle') }}</h2><p>{{ t('contact.orderDesc') }}</p><ol><li v-for="index in 3" :key="index">{{ messages[locale].contact.steps[index-1] }}</li></ol><a :href="`tel:${site.phoneHref}`" class="order-side-call"><Phone :size="20"/> {{ site.phoneText }} <ArrowUpRight :size="18"/></a></div>
      <div v-else class="contact-left" data-reveal>
        <a class="contact-method" :href="`tel:${site.phoneHref}`"><span class="contact-method-icon"><Phone :size="23" /></span><span><small>{{ t('common.phone').toUpperCase() }}</small><strong>{{ site.phoneText }}</strong></span><ArrowUpRight class="contact-method-arrow" :size="20"/></a>
        <a class="contact-method" :href="site.website" target="_blank" rel="noopener noreferrer"><span class="contact-method-icon"><Globe2 :size="23" /></span><span><small>{{ t('common.officialSite').toUpperCase() }}</small><strong>{{ site.websiteText }}</strong></span><ArrowUpRight class="contact-method-arrow" :size="20"/></a>
        <div id="location" class="contact-method address-method"><span class="contact-method-icon"><MapPin :size="23" /></span><span><small>{{ t('common.address').toUpperCase() }}</small><strong>{{ translatedAddress }}</strong></span></div>
        <div class="map-frame"><iframe :src="mapEmbed" :title="t('contact.locationMap')" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a :href="mapLink" target="_blank" rel="noopener noreferrer">{{ t('common.seeMap') }} <ExternalLink :size="16"/></a></div>
      </div>
      <div id="order" class="contact-form-card" data-reveal><div class="form-header"><span>{{ t('contact.formEyebrow') }}</span><h3>{{ t(orderOnly ? 'contact.orderFormTitle' : 'contact.contactFormTitle') }}</h3><p>{{ t('contact.formDesc') }}</p></div><form @submit.prevent="submit" novalidate>
        <div class="form-two-cols"><label>{{ t('contact.name') }} <b>*</b><input v-model.trim="form.name" name="name" :placeholder="t('contact.name')" autocomplete="name" required /></label><label>{{ t('contact.phone') }} <b>*</b><input v-model.trim="form.phone" name="phone" placeholder="+998 90 123 45 67" inputmode="tel" autocomplete="tel" required /></label></div>
        <label>{{ t('contact.select') }} <b>*</b><select v-model="form.product" required><option value="" disabled>{{ t('contact.choose') }}</option><option v-for="product in localizedProducts" :key="product.id" :value="product.id">{{ product.name }}</option><option value="other">{{ t('contact.other') }}</option></select></label>
        <label>{{ t('contact.quantity') }} <span>{{ t('contact.optional') }}</span><input v-model.trim="form.quantity" name="quantity" :placeholder="t('contact.quantityPlaceholder')" /></label>
        <label>{{ t('contact.note') }} <span>{{ t('contact.optional') }}</span><textarea v-model.trim="form.note" rows="3" :placeholder="t('contact.notePlaceholder')" /></label>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        <button type="submit" class="button button-red form-button" :disabled="sending">{{ t(sending ? 'contact.sending' : site.formEndpoint ? 'contact.send' : 'contact.prepare') }} <ArrowUpRight :size="19" /></button>
        <p v-if="!site.formEndpoint" class="form-legal">{{ t('contact.demo') }}</p>
        <div v-if="prepared" class="prepared-message" role="status"><div class="prepared-title"><Check :size="17" /><strong>{{ t(site.formEndpoint && !error ? 'contact.accepted' : 'contact.ready') }}</strong></div><template v-if="!site.formEndpoint || error"><pre>{{ message }}</pre><div class="prepared-actions"><button type="button" class="copy-button" @click="copy"><Check v-if="copied" :size="16"/><Copy v-else :size="16"/> {{ t(copied ? 'contact.copied' : 'contact.copy') }}</button><a :href="`tel:${site.phoneHref}`"><Phone :size="16"/> {{ t('common.call') }}</a></div></template></div>
      </form></div>
    </div>
  </div></section>
</template>
