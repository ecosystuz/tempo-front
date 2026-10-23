import fs from 'node:fs'
import { messages } from '../src/i18n/messages.js'
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]))
const bitmap = file => `data:image/webp;base64,${fs.readFileSync(`public/images/${file}`).toString('base64')}`
function lines(text, max) {
  const result = ['']
  for (const word of text.split(' ')) {
    if ((result.at(-1) + ' ' + word).trim().length > max && result.at(-1)) result.push(word)
    else result[result.length - 1] = (result.at(-1) + ' ' + word).trim()
  }
  return result
}
function text(value, x, y, size, color = '#fff', max = 30, weight = 700) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}">${lines(value, max).map((line,i) => `<tspan x="${x}" dy="${i ? size*1.2 : 0}">${escape(line)}</tspan>`).join('')}</text>`
}
function rect(x,y,w,h,fill) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>` }
const artwork = {full:bitmap('tempo-brochure.webp'),wide:bitmap('tempo-catalog-wide.webp')}
fs.mkdirSync('public/images/catalog', {recursive:true})
// Text overlays preserve the supplied catalogue photography, tables, logos and composition.
for (const [lang, p] of Object.entries(messages)) {
  for (const wide of [false,true]) {
    const w = wide ? 1280 : 1226, h = wide ? 372 : 1280
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xml:lang="${lang}"><title>${escape(p.catalog.dialog)}</title><image href="${artwork[wide?'wide':'full']}" width="${w}" height="${h}"/>`
    if (!wide) {
      svg += rect(40,188,525,190,'#17496a')
      svg += text(p.intro.slogan.toUpperCase(),47,220,39,'#fff',20)
      svg += rect(700,120,460,88,'#17496a')
      svg += text(p.catalog.our,825,154,40,'#fff',22) + rect(700,164,452,44,'#fd052d') + text(p.catalog.productsTitle,710,199,36,'#fff',22)
      // Preserve the red emphasis used in the original brochure.
      svg += rect(48,326,490,40,'#fd052d')
      svg += text(p.catalog.createdForYou,57,357,29,'#fff',32)
    } else {
      svg += rect(717,64,136,199,'#fff')
      svg += text(p.intro.slogan.toUpperCase(),720,73,7,'#173c50',27)
      svg += text(p.about.lead,720,115,4.9,'#173c50',44,400)
      svg += text(p.about.desc,720,146,4.9,'#173c50',44,400)
      svg += text(p.products.availability,720,211,4.9,'#173c50',44,400)
      const headings = [
        [18,66,81,'elbow-87'],[18,112,81,'elbow-45'],[18,156,81,'junction'],[18,209,81,'junction'],[18,262,81,'coupler'],
        [145,67,72,'reducer'],[145,112,72,'reducer'],[145,157,72,'junction'],[145,210,72,'junction'],[145,262,72,'coupler'],
        [289,69,75,'ppr-pipe'],[290,127,80,'ppr-pipe'],[290,184,80,'pvc-pipe'],[290,242,80,'multilayer-pipe'],
        [858,69,70,'flex-pipe'],[858,165,70,'flex-pipe'],[858,262,70,'flex-pipe'],
        [1143,69,90,'multilayer-pipe'],[1143,139,90,'multilayer-pipe'],[1143,267,90,'ppr-pipe'],
      ]
      for (const [x,y,width,id] of headings) {
        svg += rect(x,y-5,width,7,'#fff') + text(p.productItems[id][0],x,y,4.6,'#173c50',38)
      }
      // Localized table headings; numeric specifications stay in the original artwork.
      for (const [x,y,width] of [[18,75,79],[18,120,79],[18,166,79],[18,218,79],[18,270,79],[145,75,70],[145,120,70],[145,167,70],[145,219,70],[145,270,70],[290,77,69],[290,135,81],[290,192,81],[290,250,81],[1143,77,69],[1143,147,69],[1143,275,69]]) {
        svg += rect(x,y,width,5,'#ec333d') + text(p.catalog.specifications,x+1,y+3.8,3.1,'#fff',60)
      }
      // Coil descriptions are language-dependent; dimensions remain universal.
      for (const y of [86,182,279]) {
        svg += rect(858,y,68,20,'#fff') + text(p.productItems['flex-pipe'][1],858,y+5,4.4,'#173c50',25,400)
      }
    }
    svg += '</svg>'
    fs.writeFileSync(`public/images/catalog/${lang}-${wide?'wide':'full'}.svg`,svg)
  }
}
console.log('Generated 6 localized catalogue overlays (UZ, RU, EN).')
