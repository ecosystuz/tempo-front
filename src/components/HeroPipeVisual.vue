<script setup>
import { useI18n } from '../i18n'

defineProps({ activeIndex: { type: Number, required: true } })
const emit = defineEmits(['select'])
const { t } = useI18n()
</script>

<template>
  <div class="hero-animated-carousel" role="region" :aria-label="t('hero.visualAlt')">
    <div class="hero-motion" role="img" :aria-label="t(`hero.slides.${activeIndex}.visualLabel`)">
      <div class="hero-motion-grid" aria-hidden="true"></div>
      <div class="hero-motion-halo" aria-hidden="true"></div>
      <Transition name="hero-diagram-fade" mode="out-in">
        <div :key="activeIndex" class="hero-diagram" aria-hidden="true">
          <!-- 01: The same technical pipe rings as the original site. -->
          <template v-if="activeIndex === 0">
            <div class="hero-motion-ring hero-motion-ring--outer"></div>
            <div class="hero-motion-ring hero-motion-ring--middle"></div>
            <div class="hero-motion-ring hero-motion-ring--inner"></div>
            <div class="hero-motion-core"><span>{{ t('hero.flow') }}</span><b>01</b></div>
            <div class="hero-motion-line hero-motion-line--one"></div>
            <div class="hero-motion-line hero-motion-line--two"></div>
          </template>
          <!-- 02: Pipe fitting junction – animated connections. -->
          <template v-else-if="activeIndex === 1">
            <div class="tech-fitting tech-fitting--horizontal"></div>
            <div class="tech-fitting tech-fitting--vertical"></div>
            <div class="tech-fitting tech-fitting--joint"></div>
            <div class="tech-fitting tech-fitting--pulse"></div>
            <span class="tech-fitting-label tech-fitting-label--top">90°</span>
            <span class="tech-fitting-label tech-fitting-label--side">{{ t('hero.slides.1.datum') }}</span>
          </template>
          <!-- 03: Precision scanner, no photos or images. -->
          <template v-else-if="activeIndex === 2">
            <div class="tech-precision tech-precision--outer"></div>
            <div class="tech-precision tech-precision--middle"></div>
            <div class="tech-precision tech-precision--inner"></div>
            <div class="tech-precision tech-precision--axis-x"></div>
            <div class="tech-precision tech-precision--axis-y"></div>
            <div class="tech-precision tech-precision--sweep"></div>
            <div class="tech-precision tech-precision--dot"></div>
            <span class="tech-precision-label">± 0.1</span>
          </template>
          <!-- 04: Repeated ridges represent a flexible corrugated system. -->
          <template v-else>
            <div class="tech-flex-frame"></div>
            <div class="tech-flex-path"></div>
            <div class="tech-flex-ridges">
              <i v-for="n in 9" :key="n" :style="{ '--ridge-index': n }"></i>
            </div>
            <div class="tech-flex-start"></div>
            <div class="tech-flex-end"></div>
            <span class="tech-flex-label">{{ t('hero.slides.3.datum') }}</span>
          </template>
        </div>
      </Transition>
      <div class="hero-motion-datum hero-motion-datum--top">{{ t(`hero.slides.${activeIndex}.datum`) }}</div>
      <div class="hero-motion-datum hero-motion-datum--bottom">{{ t('hero.precision') }} / TEMPO GROUP</div>
      <div class="hero-motion-corner hero-motion-corner--tl" aria-hidden="true"></div>
      <div class="hero-motion-corner hero-motion-corner--br" aria-hidden="true"></div>
    </div>
    <div class="hero-motion-navigation" role="group" :aria-label="t('hero.carouselControls')">
      <button
        v-for="index in 4"
        :key="index"
        type="button"
        class="hero-motion-dot"
        :class="{ 'is-active': activeIndex === index - 1 }"
        :aria-label="t('hero.slideButton', { number: index })"
        :aria-pressed="activeIndex === index - 1"
        @click="emit('select', index - 1)"
      ><span class="hero-motion-dot-fill"></span></button>
    </div>
  </div>
</template>

<style scoped>
.hero-animated-carousel { width: min(100%, 515px); display: flex; align-items: center; flex-direction: column; }
.hero-animated-carousel .hero-motion { width: 100%; flex: 0 0 auto; }
.hero-diagram { position: absolute; inset: 0; display: grid; place-items: center; isolation: isolate; }
.hero-motion-navigation { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 34px; margin-top: -7px; position: relative; z-index: 4; }
.hero-motion-dot { appearance: none; display: grid; place-items: center; width: 34px; height: 32px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; }
.hero-motion-dot-fill { display: block; width: 7px; height: 7px; background: #7aadc6; border-radius: 50%; transition: width .25s ease, background .25s ease, border-radius .25s ease; }
.hero-motion-dot.is-active .hero-motion-dot-fill { width: 24px; border-radius: 7px; background: #ef3935; }
.hero-motion-dot:hover .hero-motion-dot-fill { background: #fff; }
.hero-motion-dot:focus-visible { outline: 2px solid #fff; outline-offset: 0; }
.hero-diagram-fade-enter-active, .hero-diagram-fade-leave-active { transition: opacity .35s ease, transform .35s ease; }
.hero-diagram-fade-enter-from { opacity: 0; transform: scale(.93); }
.hero-diagram-fade-leave-to { opacity: 0; transform: scale(1.06); }

/* Fitting schematic: continuous horizontal tube, vertical branch and luminous coupling. */
.tech-fitting { position: absolute; }
.tech-fitting--horizontal {
  width: 76%; height: 27%; left: 12%; top: 45%; border-radius: 100px;
  border: 16px solid rgba(150, 207, 235, .58); box-shadow: inset 0 0 0 6px rgba(7, 32, 51, .75), 0 0 38px rgba(70, 164, 208, .2);
  transform: rotate(-19deg); animation: fittingFlow 5.5s ease-in-out infinite;
}
.tech-fitting--vertical {
  width: 29%; height: 66%; left: 38%; top: 14%; border-radius: 100px;
  border: 15px solid rgba(175, 221, 240, .55); background: rgba(8, 43, 66, .58);
  box-shadow: inset 0 0 0 6px rgba(7, 32, 51, .72), 0 0 35px rgba(78, 173, 221, .15);
  transform: rotate(-19deg);
}
.tech-fitting--joint {
  width: 31%; height: 31%; top: 37%; left: 35%; border: 14px solid #ef3935; border-radius: 50%;
  background: rgba(16, 61, 91, .9); box-shadow: inset 0 0 0 5px #082e49, 0 0 42px rgba(239,57,53,.24);
  animation: heroMotionBreathe 5s ease-in-out infinite;
}
.tech-fitting--pulse { width: 8px; height: 8px; border-radius: 50%; background: white; top: 52%; left: 49%; box-shadow: 0 0 19px 5px rgba(239,57,53,.64); animation: techPulse 2.4s ease-in-out infinite; }
.tech-fitting-label { position: absolute; font-size: 10px; letter-spacing: .18em; color: #b4dded; font-weight: 900; }
.tech-fitting-label--top { left: 24%; top: 27%; }
.tech-fitting-label--side { right: 11%; bottom: 24%; }

/* Precision scanner: dotted measurement rings plus continuously sweeping arm. */
.tech-precision { position: absolute; }
.tech-precision--outer { width: 74%; aspect-ratio:1; border-radius: 50%; border: 2px dashed rgba(148,206,233,.43); animation: precisionSpin 20s linear infinite; }
.tech-precision--middle { width: 55%; aspect-ratio:1; border-radius: 50%; border: 12px solid rgba(181,226,243,.54); box-shadow: inset 0 0 40px rgba(3,20,38,.7), 0 0 60px rgba(67,164,211,.11); }
.tech-precision--inner { width: 22%; aspect-ratio:1; border-radius: 50%; border: 10px solid #ef3935; background: rgba(8,45,69,.76); box-shadow: 0 0 38px rgba(239,57,53,.24); animation: techPulse 3s ease-in-out infinite; }
.tech-precision--axis-x { width: 82%; height: 1px; background: linear-gradient(90deg,transparent,rgba(191,237,250,.75),transparent); }
.tech-precision--axis-y { height: 82%; width: 1px; background: linear-gradient(transparent,rgba(191,237,250,.75),transparent); }
.tech-precision--sweep { width: 68%; height: 68%; border-radius: 50%; border-right: 3px solid rgba(239,57,53,.88); border-top: 3px solid rgba(239,57,53,.12); border-left: 3px solid transparent; border-bottom: 3px solid transparent; animation: precisionSpin 4s linear infinite; }
.tech-precision--dot { width: 12px; height: 12px; background: #ef3935; box-shadow: 0 0 20px 6px rgba(239,57,53,.26); border-radius: 50%; left: 72%; top: 28%; animation: techPulse 3s ease-in-out infinite; }
.tech-precision-label { position: absolute; top: 26%; right: 10%; letter-spacing: .15em; font-size: 12px; color: #b4dbeb; font-weight: 900; }

/* Corrugated pipe schematic: a row of animated oval ridges, all vector/CSS shapes. */
.tech-flex-frame { position:absolute; inset: 14%; border-radius: 35%; border: 1px dashed rgba(150,207,235,.22); transform: rotate(-22deg); }
.tech-flex-path { position:absolute; width: 83%; height: 32%; border: 3px solid rgba(189,228,244,.23); border-radius: 120px; transform: rotate(-22deg); }
.tech-flex-ridges { position: absolute; width: 75%; height: 48%; left: 13%; top: 26%; display: flex; justify-content: space-evenly; align-items: center; transform: rotate(-22deg); }
.tech-flex-ridges i { display:block; width: 13%; height: 80%; border-radius: 50%; border: 8px solid rgba(165,217,243,.56); box-shadow: inset -3px 0 rgba(3,30,48,.6), 0 0 14px rgba(84,162,212,.1); margin-left: -6%; animation: flexWave 3s ease-in-out infinite; animation-delay: calc(var(--ridge-index) * -.24s); }
.tech-flex-ridges i:nth-child(3n) { border-color: #ef3935; }
.tech-flex-start, .tech-flex-end { position: absolute; width: 18%; height: 42%; border-radius: 50%; border: 9px solid rgba(190,230,247,.6); background: #103c5d; transform: rotate(-22deg); }
.tech-flex-start { left: 9%; top: 40%; }
.tech-flex-end { right: 8%; top: 19%; border-color: rgba(239,57,53,.75); }
.tech-flex-label { position: absolute; bottom: 17%; right: 10%; font-size: 11px; letter-spacing: .16em; font-weight: 900; color:#b4dbeb; }

@keyframes fittingFlow { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.3); } }
@keyframes techPulse { 0%,100% { scale: 1; opacity: .85; } 50% { scale: 1.16; opacity: 1; } }
@keyframes precisionSpin { to { transform: rotate(360deg); } }
@keyframes flexWave { 0%,100% { transform: translateY(0); opacity: .75; } 50% { transform: translateY(-11px); opacity: 1; } }
@media (max-width: 760px) { .hero-animated-carousel { width: min(100%, 340px); } .tech-fitting--vertical, .tech-fitting--horizontal { border-width: 12px; } .tech-flex-ridges i { border-width: 6px; } }
@media (max-width: 480px) { .hero-animated-carousel { width: min(100%, 268px); } .tech-fitting--vertical, .tech-fitting--horizontal { border-width: 9px; } .tech-flex-ridges i { border-width: 5px; } }
@media (prefers-reduced-motion: reduce) {
  .hero-diagram-fade-enter-active, .hero-diagram-fade-leave-active { transition: none; }
  .tech-fitting, .tech-precision, .tech-flex-ridges i { animation: none !important; }
}
</style>
