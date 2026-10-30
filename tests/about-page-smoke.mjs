import assert from 'node:assert/strict'
import fs from 'node:fs'
import { parse, compileTemplate, compileScript } from '@vue/compiler-sfc'
import { navLinks } from '../src/data/site.js'
import { messages } from '../src/i18n/messages.js'
const read = file => fs.readFileSync(file, 'utf8')
const page = read('src/pages/AboutPage.vue')
const parsed = parse(page, { filename: 'AboutPage.vue' })
assert.equal(parsed.errors.length, 0, 'SFC parser errors')
const script = compileScript(parsed.descriptor, { id: 'about-page' })
assert.ok(script.content.includes('currentCertificate'), 'Certificate dialog state missing')
const template = compileTemplate({ source: parsed.descriptor.template.content, filename: 'AboutPage.vue', id: 'about-page' })
assert.deepEqual(template.errors, [], 'Vue template compile errors')
assert.ok(navLinks.some(link => link.key === 'about' && link.href === '/about-us'))
assert.match(read('src/router/index.js'), /path: '\/about-us', name: 'about'/)
assert.match(read('src/App.vue'), /'about'/)
assert.match(read('src/components/HeroSection.vue'), /to="\/about-us"/)
assert.match(read('src/components/AboutSection.vue'), /to="\/about-us"/)
assert.ok(fs.existsSync('public/images/certificates/iso-9001-leader-pipe.png'))
assert.ok(fs.existsSync('public/images/certificates/conformity-leader-pipe.png'))
for (const language of ['uz', 'ru', 'en']) {
 assert.ok(messages[language].titles.about)
 assert.ok(messages[language].nav.about)
 assert.ok(messages[language].about.more)
 for (const [key,value] of Object.entries(messages[language].aboutPage)) assert.ok(value.trim(), `${language}.${key}`)
 assert.match(messages[language].aboutPage.conformityStatus, /2026/)
 assert.match(messages[language].aboutPage.isoStatus, /2027/)
}
console.log('PASS — About Us route, links, compiled Vue page, UZ/RU/EN translations, certificate image files and validity notes verified.')
