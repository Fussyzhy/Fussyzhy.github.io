<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/projects'

const year = new Date().getFullYear()
const clock = ref('')

function updateTime() {
  clock.value = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

let timer = 0
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-mark">HY / {{ String(year).slice(2) }}</span>
        <span class="footer-name">{{ profile.name }} · {{ profile.latin }}</span>
      </div>

      <p class="footer-note">Designed &amp; built in Hangzhou</p>

      <div class="footer-side">
        <span class="footer-clock">{{ clock }} CST</span>
        <a class="footer-top" href="#top" data-cursor="link" aria-label="回到顶部">
          回到顶部
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </div>
    <p class="footer-copy">© {{ profile.since }}—{{ year }} {{ profile.name }}. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  background: var(--paper);
  position: relative;
  z-index: 1;
}
.footer-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 28px var(--gutter) 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-mark {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  border: 1px solid var(--ink);
  padding: 4px 7px;
  line-height: 1;
}
.footer-name {
  font-size: 13px;
  font-weight: 600;
}
.footer-note {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.footer-side {
  display: flex;
  align-items: center;
  gap: 22px;
}
.footer-clock {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--muted);
}
.footer-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--ink);
}
.footer-top span {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.footer-top:hover span {
  transform: translateY(-3px);
}
.footer-copy {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 var(--gutter) 26px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--muted);
}
@media (max-width: 700px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .footer-note {
    display: none;
  }
}
</style>
