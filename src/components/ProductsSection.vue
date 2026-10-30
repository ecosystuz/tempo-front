<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUpRight, X, Phone } from 'lucide-vue-next'
import { site } from '../data/site'
import { useI18n } from '../i18n'
import SectionHeading from './SectionHeading.vue'
import ProductCard from './ProductCard.vue'
const { t, localizedProducts, localizedCategories } = useI18n()
const props = defineProps({ preview: { type: Boolean, default: false } })
const router = useRouter()
const selectedCategory = ref('all')
const activeProductId = ref(null)
const activeProduct = computed(() => localizedProducts.value.find(item => item.id === activeProductId.value) || null)
const filtered = computed(() => props.preview
  ? ['ppr-pipe', 'elbow-87', 'flex-pipe'].map(id => localizedProducts.value.find(p => p.id === id)).filter(Boolean)
  : selectedCategory.value === 'all' ? localizedProducts.value : localizedProducts.value.filter(p => p.category === selectedCategory.value))
function selectCategory(key) { selectedCategory.value = key }
function show(product) { activeProductId.value = product.id; document.body.classList.add('modal-open') }
function close() { activeProductId.value = null; document.body.classList.remove('modal-open') }
function enquire() { if (!activeProductId.value) return; const id = activeProductId.value; close(); router.push({ path: '/buyurtma', query: { product: id } }) }
function keyHandler(event) { if (event.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', keyHandler))
onUnmounted(() => { window.removeEventListener('keydown', keyHandler); document.body.classList.remove('modal-open') })
</script>
<template>
  <section :id="preview ? 'featured-products' : 'products'" class="products-section section-space"><div class="container">
    <SectionHeading :eyebrow="t(preview ? 'products.eyebrowPreview' : 'products.eyebrowFull')" :title="t(preview ? 'products.previewTitle' : 'products.fullTitle')" :highlight="t(preview ? 'products.previewAccent' : 'products.fullAccent')" :description="t('products.desc')" />
    <div v-if="!preview" class="catalog-toolbar" data-reveal><div class="category-filter" role="group" :aria-label="t('products.filterLabel')">
      <button v-for="category in localizedCategories" :key="category.key" type="button" :class="{active: selectedCategory === category.key}" :aria-pressed="selectedCategory === category.key" @click="selectCategory(category.key)">{{ category.name }} <span v-if="category.key === 'all'">{{ localizedProducts.length }}</span></button>
    </div><span class="catalog-result">{{ filtered.length.toString().padStart(2, '0') }} {{ t('products.result') }}</span></div>
    <!-- A normal keyed grid prevents disappearing cards from overlapping the next filter result. -->
    <div class="products-grid"><ProductCard v-for="(item, index) in filtered" :key="item.id" :product="item" :index="index" @details="show" /></div>
    <div v-if="!preview" class="product-promo" data-reveal><div class="promo-inner"><div class="promo-icon">✳</div><div><b>{{ t('products.noProduct') }}</b><p>{{ t('products.manager') }}</p></div></div><RouterLink to="/buyurtma" class="link-arrow">{{ t('products.leaveRequest') }} <ArrowUpRight :size="20"/></RouterLink></div>
    <div v-if="preview" class="preview-all"><RouterLink to="/mahsulotlar" class="button button-dark button-lg">{{ t('products.all') }} <ArrowUpRight :size="19"/></RouterLink><span>{{ t('products.previewMeta') }}</span></div>
  </div></section>
  <Teleport to="body"><Transition name="modal-fade"><div v-if="activeProduct" class="modal-backdrop" @click.self="close"><div class="product-modal" role="dialog" aria-modal="true" :aria-label="activeProduct.name"><button class="modal-close" type="button" @click="close" :aria-label="t('common.close')"><X :size="21"/></button><div class="modal-product-visual"><img :src="activeProduct.image" :alt="activeProduct.name" /></div><div class="modal-product-info"><span class="section-eyebrow"><i></i> {{ t('products.catalog') }} / {{ activeProduct.tag }}</span><h2>{{ activeProduct.name }}</h2><p>{{ activeProduct.description }}</p><div class="modal-availability">{{ t('products.availability') }}</div><button type="button" class="button button-red button-lg" @click="enquire">{{ t('products.enquire') }} <ArrowUpRight :size="19" /></button><a class="modal-tel" :href="`tel:${site.phoneHref}`"><Phone :size="16"/> {{ site.phoneText }}</a></div></div></div></Transition></Teleport>
</template>
