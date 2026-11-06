<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/projects'

const nav = [
  { id: 'work', label: '项目', href: '#work' },
  { id: 'archive', label: '全部', href: '#archive' },
  { id: 'about', label: '关于', href: '#about' },
  { id: 'contact', label: '联系', href: '#contact' },
]

const progress = ref<HTMLSpanElement | null>(null)
const active = ref('work')
const hidden = ref(false)
const scrolled = ref(false)
const clock = ref('')

let lastY = 0
let ticking = false
let timer = 0

function updateTime() {
  clock.value = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

function updateActive() {
  const offset = 140
  let current = ''
  for (const item of nav) {
    const el = document.getElementById(item.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offset) current = item.id
  }
  active.value = current
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    if (progress.value) progress.value.style.transform = `scaleX(${Math.min(y / max, 1)})`
    hidden.value = y > 260 && y > lastY + 4
    scrolled.value = y > 12
    lastY = y
    updateActive()
    ticking = false
  })
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-hidden': hidden, 'is-scrolled': scrolled }">
    <span ref="progress" class="header-progress" aria-hidden="true"></span>
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="回到顶部">
        <span class="brand-mark">HY</span>
        <span class="brand-name">
          昊阳
          <span class="brand-alias">/ HaoYang</span>
        </span>
      </a>

      <nav class="header-nav" aria-label="主导航">
        <a
          v-for="item in nav"
          :key="item.id"
          :href="item.href"
          class="nav-link"
          :class="{ 'is-active': active === item.id }"
        >
          <span class="nav-index">{{ String(nav.indexOf(item) + 1).padStart(2, '0') }}</span>
          {{ item.label }}
        </a>
      </nav>

      <div class="header-meta">
        <span class="clock" aria-label="杭州时间">
          <span class="clock-dot" aria-hidden="true"></span>
          {{ clock }}
          <em>HANGZHOU</em>
        </span>
        <a
          class="header-github"
          v-magnetic
          data-magnetic="6"
          :href="profile.github"
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: blur(14px) saturate(120%);
  border-bottom: 1px solid transparent;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    background 0.3s ease;
}
.site-header.is-scrolled {
  border-bottom-color: var(--line);
}
.site-header.is-hidden {
  transform: translateY(-101%);
}
.header-progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
}
.header-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  height: var(--header-h);
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.brand-mark {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  border: 1px solid var(--ink);
  padding: 5px 7px;
  line-height: 1;
  transition:
    background 0.25s ease,
    color 0.25s ease;
}
.brand:hover .brand-mark {
  background: var(--ink);
  color: var(--paper);
}
.brand-name {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.brand-alias {
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  font-weight: 400;
  color: var(--ink-soft);
  margin-left: 2px;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.2vw, 34px);
}
.nav-link {
  position: relative;
  font-size: 13px;
  color: var(--ink-soft);
  padding: 6px 0;
  transition: color 0.25s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-link:hover,
.nav-link.is-active {
  color: var(--ink);
}
.nav-link.is-active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}
.nav-index {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--muted);
  margin-right: 4px;
  vertical-align: super;
  letter-spacing: 0.02em;
}
.nav-link.is-active .nav-index {
  color: var(--accent);
}
.header-meta {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 26px);
}
.clock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
  white-space: nowrap;
}
.clock em {
  font-style: normal;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.12em;
}
.clock-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  animation: clock-pulse 2.4s ease-in-out infinite;
}
@keyframes clock-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.8);
  }
}
.header-github {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 8px 14px;
  border: 1px solid var(--ink);
  transition:
    background 0.3s ease,
    color 0.3s ease;
}
.header-github:hover {
  background: var(--ink);
  color: var(--paper);
}
.header-github span {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.header-github:hover span {
  transform: translate(2px, -2px);
}

@media (max-width: 860px) {
  .brand-alias,
  .clock {
    display: none;
  }
  .header-inner {
    gap: 14px;
  }
  .nav-link {
    font-size: 12px;
  }
  .nav-index {
    display: none;
  }
}
@media (max-width: 560px) {
  .header-nav {
    gap: 12px;
  }
  .brand-name {
    font-size: 13px;
  }
  .header-github {
    padding: 7px 10px;
    font-size: 12px;
  }
}
</style>
