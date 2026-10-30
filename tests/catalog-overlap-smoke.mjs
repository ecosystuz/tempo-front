import fs from 'node:fs'
import assert from 'node:assert/strict'
const vue = fs.readFileSync('src/components/ProductsSection.vue', 'utf8')
assert.match(vue, /<div class="products-grid"><ProductCard v-for=/)
assert.doesNotMatch(vue, /<TransitionGroup name="product" tag="div" class="products-grid"/)
assert.match(vue, /:aria-pressed="selectedCategory === category.key"/)
if (fs.existsSync('dist/assets/ProductsSection-BWhKW3I9.js') && fs.existsSync('dist/assets/index-BjFr5X7W.css')) {
  const bundle = fs.readFileSync('dist/assets/ProductsSection-BWhKW3I9.js', 'utf8')
  const css = fs.readFileSync('dist/assets/index-BjFr5X7W.css', 'utf8')
  assert.doesNotMatch(bundle, /i\(U,\{name:"product",tag:"div",class:"products-grid"/)
  assert.match(bundle, /e\("div",\{class:"products-grid"\}/)
  assert.match(css, /grid-auto-flow: row/)
  assert.match(css, /animation: none/)
}
console.log('Catalog switching / grid overlap regression: PASS')
