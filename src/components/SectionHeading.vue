<script setup>
defineProps({ eyebrow: String, title: String, highlight: String, description: String, inverse: { type: Boolean, default: false } })
</script>
<template>
  <div class="section-heading" :class="{ inverse }" data-reveal>
    <div class="section-heading-title"><span class="section-eyebrow"><i></i>{{ eyebrow }}</span><h2>{{ title }} <span>{{ highlight }}</span></h2></div>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
