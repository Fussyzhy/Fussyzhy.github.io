<script setup lang="ts">
import { site } from '../data/site'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-line">
        <span class="heart" aria-hidden="true"><AppIcon name="heart" :size="12" /></span>
        © {{ site.since }}–{{ year }} {{ site.name }} · 用 Vue 3 + Vite 手写
      </p>
      <p class="footer-sub">
        <a :href="site.github" target="_blank" rel="noreferrer">GitHub</a>
        <span aria-hidden="true">·</span>
        <a :href="`mailto:${site.email}`">Email</a>
        <span aria-hidden="true">·</span>
        部署于 GitHub Pages
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--line);
  margin-top: 40px;
  padding: 26px 20px 30px;
}
.footer-inner {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}
.footer-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}
.heart {
  color: var(--pink);
  display: inline-grid;
  place-items: center;
  animation: heart-beat 2.4s ease-in-out infinite;
}
@keyframes heart-beat {
  0%,
  100% {
    transform: scale(1);
  }
  12% {
    transform: scale(1.18);
  }
  24% {
    transform: scale(1);
  }
}
.footer-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.8;
}
.footer-sub a {
  color: var(--text-2);
  transition: color 0.2s ease;
}
.footer-sub a:hover {
  color: var(--primary);
}
</style>
