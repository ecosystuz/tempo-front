import assert from 'node:assert/strict'
import fs from 'node:fs'
import { messages } from '../src/i18n/messages.js'

const hero = fs.readFileSync('src/components/HeroSection.vue', 'utf8')
const diagram = fs.readFileSync('src/components/HeroPipeVisual.vue', 'utf8')
assert.match(hero, /setInterval\([\s\S]*?3000\)/, 'auto-slide interval must be 3 seconds')
assert.match(hero, /activeIndex\.value = \(activeIndex\.value \+ 1\) % slideCount/, 'auto-advance all four slides')
assert.match(hero, /@select="selectSlide"/, 'slide controls should select a new slide')
assert.match(hero, /onBeforeUnmount/, 'timer cleanup needed')
assert.match(hero, /slides\.\$\{activeIndex\}\.line1/, 'left heading should follow active slide')
assert.match(hero, /slides\.\$\{activeIndex\}\.desc/, 'left text should follow active slide')
assert.doesNotMatch(diagram, /<img\b|<picture\b|<video\b/i, 'visual carousel must use CSS only')
for (let i = 0; i < 4; i++) assert.match(diagram, i === 0 ? /activeIndex === 0/ : i === 1 ? /activeIndex === 1/ : i === 2 ? /activeIndex === 2/ : /tech-flex-ridges/, `missing animation ${i+1}`)
for (const lang of ['uz', 'ru', 'en']) {
  const slides = messages[lang].hero.slides
  assert.equal(slides.length, 4, `${lang}: exactly four slides needed`)
  assert.equal(new Set(slides.map(slide => slide.line1)).size, 4, `${lang}: headings must differ`)
  for (const s of slides) for (const k of ['line1','line2a','line2b','desc','feature1','feature2','feature3','visualLabel','datum']) assert.ok(s[k]?.trim(), `${lang}: missing ${k}`)
}
console.log('PASS — 4 image-free CSS animations; 3-second carousel; synchronized text; UZ/RU/EN translations.')
