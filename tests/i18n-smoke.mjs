import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { baseParse } from '@vue/compiler-dom'
import { messages } from '../src/i18n/messages.js'
import { products, navLinks, categories, advantages } from '../src/data/site.js'
function leaves(obj, prefix = '') {
  const keys = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = `${prefix}${k}`
    if (v && typeof v === 'object') Object.assign(keys, leaves(v, `${key}.`))
    else keys[key] = v
  }
  return keys
}
const languages = ['uz','ru','en']
const baseline = Object.keys(leaves(messages.uz)).sort()
for (const lang of languages) {
  const pack = messages[lang]
  assert.deepEqual(Object.keys(leaves(pack)).sort(), baseline, `${lang}: mismatched translation keys`)
  for (const [key, value] of Object.entries(leaves(pack))) {
    assert.equal(typeof value, 'string', `${lang}.${key} must be a string`)
    assert.ok(value.trim(), `${lang}.${key} is blank`)
    const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort()
    assert.deepEqual(placeholders(value), placeholders(leaves(messages.uz)[key]), `${lang}.${key}: interpolation mismatch`)
  }
  assert.equal(pack.advantages.items.length, advantages.length)
  assert.equal(pack.process.items.length, 3)
  assert.equal(Object.keys(pack.productItems).length, products.length)
  for (const product of products) {
    assert.ok(pack.productItems[product.id], `${lang}: missing ${product.id}`)
    assert.equal(pack.productItems[product.id].length, 3)
  }
  for (const nav of navLinks) assert.ok(pack.nav[nav.key], `${lang}: missing nav.${nav.key}`)
  for (const category of categories) assert.ok(pack.categories[category.key], `${lang}: missing category ${category.key}`)
}
const vueFiles = []
function visit(folder) {
  for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
    const dest = path.join(folder, item.name)
    if (item.isDirectory()) visit(dest)
    else if (/\.(vue|js)$/.test(item.name)) vueFiles.push(dest)
  }
}
visit(path.resolve('src'))
for (const file of vueFiles.filter(f => f.endsWith('.vue'))) {
  const template = parse(fs.readFileSync(file, 'utf8')).descriptor.template
  if (!template) continue
  function check(node) {
    if (node.type === 2 && /[a-zA-ZА-Яа-я]/.test(node.content)) {
      assert.ok(/^(\s*[—/·]\s*)?(TEMPO|TEMPO GROUP|Tempo)(\s*[—/·]\s*)?$/.test(node.content.trim()), file + ': untranslated text ' + node.content)
    }
    for (const prop of node.props || []) {
      if (prop.type === 6 && ['title','alt','aria-label','placeholder'].includes(prop.name) && prop.value) {
        assert.ok(!/[a-zA-ZА-Яа-я]/.test(prop.value.content) || prop.value.content === 'Tempo', file + ': untranslated ' + prop.name)
      }
    }
    for (const child of node.children || []) check(child)
  }
  check(baseParse(template.content))
}
const content = vueFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n')
for (const match of content.matchAll(/\bt\(['"]([^'"]+)['"]/g)) {
  assert.ok(match[1].split('.').reduce((v, key) => v?.[key], messages.uz) !== undefined, `missing key: ${match[1]}`)
}
const stored = new Map()
globalThis.window = { localStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) } }
globalThis.document = { documentElement: { lang: 'uz' }, createElement: () => ({}) }
const { locale, setLocale, t, localizedProducts } = await import('../src/i18n/index.js')
assert.equal(locale.value, 'uz')
const selectedId = products[0].id
for (const lang of languages) {
  setLocale(lang)
  assert.equal(locale.value, lang)
  assert.equal(document.documentElement.lang, lang)
  assert.equal(stored.get('tempo-preferred-language'), lang)
  assert.equal(t('nav.home'), messages[lang].nav.home)
  assert.equal(localizedProducts.value.find(product => product.id === selectedId)?.name, messages[lang].productItems[selectedId][0])
}
setLocale('invalid')
assert.equal(locale.value, 'en')
console.log(`PASS — UZ, RU, EN: ${baseline.length} translation groups, ${products.length} translated products, switching and persistence verified.`)

