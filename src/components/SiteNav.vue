<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { navItems, site } from '../data/site'
import { useTheme } from '../composables/useTheme'
import AppIcon from './AppIcon.vue'

const { theme, init, toggle } = useTheme()
const active = ref('')
const scrolled = ref(false)
const menuOpen = ref(false)

let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 8
    let current = ''
    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= 140) current = item.id
    }
    active.value = current
    ticking = false
  })
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

onMounted(() => {
  init()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-nav" :class="{ 'is-scrolled': scrolled }">
    <div class="nav-group">
      <button
        type="button"
        class="icon-btn only-mobile"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" />
      </button>

      <a class="icon-btn" href="#top" aria-label="回到首页" title="首页">
        <AppIcon name="home" />
      </a>

      <nav class="nav-links" aria-label="主导航">
        <a
          v-for="item in navItems"
          :key="item.id"
          class="icon-btn"
          :class="{ 'is-active': active === item.id }"
          :href="item.href"
          :aria-label="item.label"
          :title="item.label"
        >
          <AppIcon :name="item.icon" :size="19" />
        </a>
      </nav>
    </div>

    <div class="nav-group">
      <button
        type="button"
        class="icon-btn"
        :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
        :title="theme === 'dark' ? '浅色模式' : '深色模式'"
        @click="toggle"
      >
        <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="19" />
      </button>

      <a
        class="icon-btn"
        :href="site.github"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <AppIcon name="github" :size="19" />
      </a>
    </div>
  </header>

  <Transition name="menu-fade">
    <div v-if="menuOpen" class="mobile-menu" role="dialog" aria-modal="true" aria-label="导航菜单">
      <nav class="mobile-nav">
        <a
          v-for="(item, index) in navItems"
          :key="item.id"
          class="mobile-link"
          :href="item.href"
          :style="{ '--i': index }"
          @click="closeMenu"
        >
          <span class="mobile-link-icon"><AppIcon :name="item.icon" :size="20" /></span>
          <span class="mobile-link-label">{{ item.label }}</span>
          <span class="mobile-link-index">0{{ index + 1 }}</span>
        </a>
      </nav>
      <div class="mobile-foot">
        <a :href="site.github" target="_blank" rel="noreferrer">github.com/{{ site.handle }} ↗</a>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-bottom: 1px solid transparent;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    backdrop-filter 0.3s ease;
}
.site-nav.is-scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(16px) saturate(150%);
  border-bottom-color: var(--line);
}
.nav-group {
  display: flex;
  align-items: center;
  gap: 2px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
}
.icon-btn {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--text-2);
  transition:
    color 0.2s ease,
    background 0.2s ease;
}
.icon-btn:hover {
  color: var(--text);
  background: var(--hover);
}
.icon-btn.is-active {
  color: var(--primary);
}
.only-mobile {
  display: none;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--bg);
  padding: 84px 24px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}
.mobile-nav {
  display: flex;
  flex-direction: column;
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 4px;
  border-bottom: 1px solid var(--line);
  animation: menu-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 60ms);
}
.mobile-link-icon {
  color: var(--primary);
  display: grid;
  place-items: center;
}
.mobile-link-label {
  font-size: 20px;
  font-weight: 500;
}
.mobile-link-index {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
}
.mobile-foot {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 28px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}
.mobile-foot a:hover {
  color: var(--primary);
}
@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.25s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  .only-mobile {
    display: grid;
  }
  .nav-links {
    display: none;
  }
}
</style>
