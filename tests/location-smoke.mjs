import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { site } from '../src/data/site.js'
import { messages } from '../src/i18n/messages.js'

const root = new URL('../', import.meta.url)
const read = (file) => readFileSync(new URL(file, root), 'utf8')
const expectedAddresses = {
  uz: 'Buxoro viloyati, Buxoro shahri, Alpomish 1',
  ru: 'Бухарская область, город Бухара, Алпомиш 1',
  en: 'Alpomish 1, Bukhara, Bukhara Region, Uzbekistan',
}
assert.equal(site.mapsUrl, 'https://maps.app.goo.gl/cENGJWrjhFXDazkv7')
assert.equal(site.mapsCoordinates, '39.748492,64.460131')
assert.equal(site.address, expectedAddresses.uz)
for (const [language, address] of Object.entries(expectedAddresses)) {
  assert.equal(messages[language].location.address, address)
  assert.equal(messages[language].location.query, site.mapsCoordinates)
  assert.equal(messages[language].common.exampleAddress, undefined)
  assert.equal(messages[language].common.demoNotice, undefined)
  assert.ok(messages[language].contact.locationMap)
}
const contact = read('src/components/ContactSection.vue')
const header = read('src/components/SiteHeader.vue')
const footer = read('src/components/SiteFooter.vue')
assert.ok(contact.includes('site.mapsCoordinates'))
assert.ok(contact.includes('mapLink = site.mapsUrl'))
assert.ok(header.includes(':href="site.mapsUrl"'))
assert.ok(footer.includes(':href="site.mapsUrl"'))
for (const content of [contact, header, footer]) {
  assert.ok(!content.includes('common.exampleAddress'))
  assert.ok(!content.includes('common.demoNotice'))
}
console.log('PASS — Buxoro address (UZ/RU/EN), map coordinates and direct Google Maps links verified.')
