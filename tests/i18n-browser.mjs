import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { createServer } from 'vite'
import { messages } from '../src/i18n/messages.js'
const server = await createServer({server:{host:'127.0.0.1',port:0}})
await server.listen()
const base = server.resolvedUrls.local[0]
let browser
try {
  browser = await chromium.launch({headless:true, ...(process.platform === 'win32' ? {channel:'msedge'} : {})})
  for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
    const context = await browser.newContext({viewport, reducedMotion:'reduce'})
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    await page.route('https://www.google.com/**', route => route.abort())
    await page.addInitScript(() => { try { sessionStorage.setItem('tempo-pipe-tunnel-seen-v1','1') } catch {} })
    async function language(lang) {
      await page.locator('.header-actions .language-switcher button').filter({hasText:lang.toUpperCase()}).click()
      await page.waitForFunction(lang => document.documentElement.lang === lang,lang)
      assert.equal(await page.evaluate(() => localStorage.getItem('tempo-preferred-language')),lang)
    }
    for (const [path,name] of [['/','home'],['/mahsulotlar','products'],['/boglanish','contact'],['/buyurtma?product=elbow-87','order']]) {
      await page.goto(base + path.slice(1))
      await page.locator('main h1').waitFor()
      const marker = await page.evaluate(() => window.__documentMarker = Math.random())
      for (const lang of ['uz','ru','en']) {
        const pack = messages[lang]
        await language(lang)
        assert.equal(await page.evaluate(() => window.__documentMarker),marker,'Language change reloaded the document')
        assert.equal(await page.title(),`${pack.titles[name]} | TEMPO GROUP`)
        assert.equal(await page.locator('.footer-kicker').textContent(),pack.footer.kicker)
        if(name==='home') {
          assert.equal(await page.locator('.hero-motion-core span').textContent(),pack.hero.flow)
          assert.equal(await page.locator('.catalog-preview img').getAttribute('src'),`/images/catalog/${lang}-wide.svg`)
          await page.locator('.catalog-preview').click()
          assert.equal(await page.locator('.catalog-modal-body img').getAttribute('src'),`/images/catalog/${lang}-full.svg`)
          await page.locator('.catalog-modal-body img').evaluate(img => img.decode())
          await page.keyboard.press('Escape')
        }
        if(name==='products') {
          assert.equal(await page.locator('.product-body h3').first().textContent(),pack.productItems['elbow-87'][0])
          await page.locator('.product-card-hit').first().click()
          assert.equal(await page.locator('.product-modal h2').textContent(),pack.productItems['elbow-87'][0])
          const next = lang === 'en' ? 'uz' : 'en'
          // Footer controls remain in the DOM while the modal is open.
          await page.locator('.site-footer .language-switcher button').filter({hasText:next.toUpperCase()}).dispatchEvent('click')
          assert.equal(await page.locator('.product-modal h2').textContent(),messages[next].productItems['elbow-87'][0])
          await page.locator('.site-footer .language-switcher button').filter({hasText:lang.toUpperCase()}).dispatchEvent('click')
          await page.keyboard.press('Escape')
        }
        if(name==='contact'||name==='order') {
          await page.locator('form button[type=submit]').click()
          assert.equal(await page.locator('.form-error').textContent(),pack.contact.validation)
          assert.equal(await page.locator('input[name=name]').getAttribute('placeholder'),pack.contact.name)
          await page.locator('input[name=name]').fill('Test')
          await page.locator('input[name=phone]').fill('+998901234567')
          await page.locator('select').selectOption('elbow-87')
          await page.locator('form button[type=submit]').click()
          assert.ok((await page.locator('.prepared-message pre').textContent()).includes(pack.productItems['elbow-87'][0]))
          const next = lang==='en'?'uz':'en'
          await language(next)
          assert.ok((await page.locator('.prepared-message pre').textContent()).includes(messages[next].productItems['elbow-87'][0]))
          assert.equal(await page.locator('select').inputValue(),'elbow-87')
          await page.locator('input[name=name]').fill('')
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
        assert.equal(overflow,false,`${viewport.width} ${path} ${lang}: horizontal overflow`)
      }
      await language('ru')
      await page.reload()
      await page.locator('main h1').waitFor()
      assert.equal(await page.locator('html').getAttribute('lang'),'ru')
      assert.equal(await page.title(),`${messages.ru.titles[name]} | TEMPO GROUP`)
    }
    if(viewport.width===390) {
      await page.locator('.menu-toggle').click()
      await page.locator('.mobile-menu .language-switcher button').filter({hasText:'EN'}).click()
      assert.equal(await page.locator('.mobile-menu a').first().textContent(),messages.en.nav.home)
    }
    assert.deepEqual(errors,[])
    await page.screenshot({path:`tests/i18n-${viewport.width}.png`,fullPage:true})
    await context.close()
    console.log(`PASS ${viewport.width}px: 4 pages × UZ/RU/EN, immediate switching, forms, modals, reload persistence`)
  }
} finally {
  await browser?.close()
  await server.close()
}
