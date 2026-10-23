<script setup>
import { ArrowUpRight, Plus } from 'lucide-vue-next'
import { useI18n } from '../i18n'
const { t } = useI18n()
const props = defineProps({ product: { type: Object, required: true }, index: { type: Number, default: 0 } })
const emit = defineEmits(['details'])
</script>
<template>
  <article class="product-card" :style="{ '--card-order': index }">
    <button class="product-card-hit" type="button" @click="emit('details', product)" :aria-label="t('products.detailsLabel', { name: product.name })">
      <div class="product-visual"><img :src="product.image" :alt="`Tempo — ${product.name}`" loading="lazy" /><span class="product-category-chip">{{ product.tag }}</span><span class="product-plus"><Plus :size="19" /></span></div>
      <div class="product-body"><div><p>{{ product.subheading }}</p><h3>{{ product.name }}</h3></div><span class="product-arrow"><ArrowUpRight :size="20"/></span></div>
    </button>
  </article>
</template>
