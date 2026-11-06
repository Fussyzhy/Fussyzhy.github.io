<script setup lang="ts">
import { computed, ref } from 'vue'
import { profile, stats } from '../data/projects'
import StatNumber from './StatNumber.vue'

const letters = computed(() => profile.latin.split(''))

const card = ref<HTMLElement | null>(null)

function onCardMove(event: PointerEvent) {
  const el = card.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
  const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
  el.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`)
}

function onCardLeave() {
  const el = card.value
  if (!el) return
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">
          <span class="status-dot" aria-hidden="true"></span>
          Open to work
          <span class="eyebrow-sep">·</span>
          {{ profile.location }}
          <span class="eyebrow-sep">·</span>
          {{ profile.since }}—now
        </p>

        <h1 class="hero-title">
          <span class="hero-cn"><span class="hero-cn-inner">{{ profile.name }}</span></span>
          <span class="hero-en" aria-label="HaoYang">
            <span
              v-for="(letter, index) in letters"
              :key="`${letter}-${index}`"
              class="hero-char"
              :style="{ '--i': index }"
              aria-hidden="true"
              >{{ letter }}</span
            ><span class="hero-dot" aria-hidden="true">.</span>
          </span>
        </h1>

        <p class="hero-lede">
          全栈开发者。把想法做成能真正运行的产品——从 Vue 界面、Node.js 服务，
          到装进你电脑的桌面应用。
        </p>

        <div class="hero-actions">
          <a class="button button-solid" v-magnetic data-magnetic="9" href="#work" data-cursor="link">
            看我的项目
            <span class="button-arrow" aria-hidden="true">↓</span>
          </a>
          <a class="button button-ghost" v-magnetic data-magnetic="7" :href="`mailto:${profile.email}`" data-cursor="link">
            发封邮件
            <span class="button-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <dl class="hero-stats">
        <div v-for="item in stats" :key="item.en" class="hero-stat">
          <dt class="stat-value">
            <StatNumber v-if="item.animate" :value="item.value" />
            <template v-else>{{ item.value }}</template>
          </dt>
          <dd class="stat-label">
            <span>{{ item.label }}</span>
            <em>{{ item.en }}</em>
          </dd>
        </div>
      </dl>

      <div class="hero-visual">
        <div ref="card" class="portrait" @pointermove="onCardMove" @pointerleave="onCardLeave">
          <div class="portrait-frame">
            <img :src="profile.avatar" :alt="`${profile.name}的 GitHub 头像`" width="460" height="460" />
            <span class="portrait-code">GH / 47082730</span>
            <span class="portrait-tag">FULL-STACK</span>
          </div>
          <div class="portrait-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="badge-path"
                  d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
                />
              </defs>
              <text>
                <textPath href="#badge-path" startOffset="0">
                  OPEN TO WORK · HANGZHOU · OPEN TO WORK ·
                </textPath>
              </text>
            </svg>
            <span class="badge-core">✳</span>
          </div>
        </div>

        <div class="hero-scroll" aria-hidden="true">
          <span>SCROLL</span>
          <span class="scroll-line"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: calc(var(--header-h) + clamp(48px, 8vh, 104px)) var(--gutter) clamp(40px, 6vh, 72px);
  max-width: var(--maxw);
  margin: 0 auto;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  grid-template-areas:
    'copy visual'
    'stats visual';
  column-gap: clamp(32px, 5vw, 84px);
  row-gap: clamp(24px, 4vh, 44px);
  align-items: center;
  min-height: calc(100vh - var(--header-h) - 160px);
}
.hero-copy {
  grid-area: copy;
}
.hero-stats {
  grid-area: stats;
  align-self: start;
}
.hero-visual {
  grid-area: visual;
}
.eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.hero-eyebrow {
  margin-bottom: clamp(20px, 3vh, 34px);
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(255, 74, 26, 0.5);
  animation: status-pulse 2.2s ease-out infinite;
}
@keyframes status-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 74, 26, 0.45);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(255, 74, 26, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 74, 26, 0);
  }
}
.eyebrow-sep {
  color: var(--muted);
}
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.02em;
  margin-bottom: clamp(22px, 3.2vh, 36px);
}
.hero-cn {
  display: block;
  overflow: hidden;
  font-size: clamp(52px, 8.4vw, 118px);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.055em;
}
.hero-cn-inner {
  display: inline-block;
  animation: rise-in 0.95s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 0.05s;
}
.hero-en {
  display: block;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(64px, 12.2vw, 172px);
  line-height: 0.82;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-top: 0.06em;
  white-space: nowrap;
}
.hero-char {
  display: inline-block;
  animation: char-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.18s + var(--i) * 0.055s);
}
.hero-dot {
  display: inline-block;
  color: var(--accent);
  animation: char-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.18s + 7 * 0.055s);
}
@keyframes char-in {
  from {
    opacity: 0;
    transform: translateY(0.55em) rotate(4deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}
.hero-lede {
  max-width: 34ch;
  font-size: clamp(15px, 1.35vw, 18px);
  line-height: 1.85;
  color: var(--ink-soft);
  margin: 0 0 clamp(26px, 4vh, 40px);
  animation: rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  animation: rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.62s both;
}
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  animation: rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.74s both;
}
.hero-stat {
  padding: 16px 14px 14px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.stat-value {
  font-family: var(--mono);
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
}
.stat-label {
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
  color: var(--ink-soft);
}
.stat-label em {
  font-style: normal;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  color: var(--muted);
}
.hero-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
}
.portrait {
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  width: min(100%, clamp(240px, 26vw, 336px));
  animation: rise-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}
.portrait-frame {
  position: relative;
  border: 1px solid var(--ink);
  padding: 10px;
  background: var(--paper);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 14px 14px 0 -1px var(--accent);
}
.portrait-frame img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: contrast(1.06) saturate(0.88);
}
.portrait-code,
.portrait-tag {
  position: absolute;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  background: var(--paper);
  padding: 3px 5px;
}
.portrait-code {
  top: 18px;
  left: 18px;
  border: 1px solid var(--line);
}
.portrait-tag {
  bottom: 18px;
  right: 18px;
  background: var(--ink);
  color: var(--paper);
}
.portrait-badge {
  position: absolute;
  left: -56px;
  bottom: -40px;
  z-index: 3;
  width: 112px;
  height: 112px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--paper);
  border: 1px solid var(--line);
  box-shadow: 0 0 0 6px var(--paper);
}
.portrait-badge svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: badge-spin 26s linear infinite;
}
.portrait-badge text {
  font-family: var(--mono);
  font-size: 7.6px;
  letter-spacing: 0.16em;
  fill: var(--ink);
}
.badge-core {
  font-size: 22px;
  color: var(--accent);
  line-height: 1;
}
@keyframes badge-spin {
  to {
    transform: rotate(360deg);
  }
}
.portrait-note {
  display: none;
}
.hero-scroll {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--muted);
}
.scroll-line {
  display: block;
  width: 64px;
  height: 1px;
  background: var(--line-strong);
  position: relative;
  overflow: hidden;
}
.scroll-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: translateX(-100%);
  animation: scroll-sweep 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes scroll-sweep {
  0% {
    transform: translateX(-100%);
  }
  55%,
  100% {
    transform: translateX(100%);
  }
}
@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'copy'
      'visual'
      'stats';
    min-height: 0;
    row-gap: clamp(32px, 5vh, 52px);
  }
  .hero-en {
    white-space: normal;
  }
  .hero-lede {
    max-width: 44ch;
  }
  .hero-visual {
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    gap: 24px;
  }
  .portrait {
    width: min(74%, 320px);
  }
  .hero-scroll {
    display: none;
  }
}
@media (max-width: 620px) {
  .hero {
    padding-top: calc(var(--header-h) + 42px);
  }
  .hero-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .hero-visual {
    justify-content: center;
  }
  .portrait {
    width: min(88%, 300px);
  }
  .portrait-badge {
    left: -8px;
    bottom: -18px;
    width: 84px;
    height: 84px;
    box-shadow: 0 0 0 5px var(--paper);
  }
}
</style>
