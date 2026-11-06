<script setup lang="ts">
const items = [
  'Vue 3',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Electron',
  'Cocos Creator',
  'MySQL',
  'Redis',
  '开源',
  '桌面应用',
  '游戏汉化',
]
</script>

<template>
  <div class="ticker" aria-label="技术栈与关键词">
    <div class="ticker-track">
      <div class="ticker-group">
        <template v-for="(item, index) in items" :key="`a-${item}`">
          <span class="ticker-item">{{ item }}</span>
          <span class="ticker-mark" aria-hidden="true">{{ index % 2 === 0 ? '✳' : '·' }}</span>
        </template>
      </div>
      <div class="ticker-group" aria-hidden="true">
        <template v-for="(item, index) in items" :key="`b-${item}`">
          <span class="ticker-item">{{ item }}</span>
          <span class="ticker-mark" aria-hidden="true">{{ index % 2 === 0 ? '✳' : '·' }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 15px 0;
  background: var(--paper);
}
.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker-scroll 42s linear infinite;
}
.ticker:hover .ticker-track {
  animation-play-state: paused;
}
.ticker-group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.ticker-item {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 0 18px;
  white-space: nowrap;
}
.ticker-mark {
  color: var(--accent);
  font-size: 12px;
}
@keyframes ticker-scroll {
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
