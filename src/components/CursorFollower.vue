<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const dot = ref<HTMLDivElement | null>(null)
const ring = ref<HTMLDivElement | null>(null)
const mode = ref<'default' | 'view' | 'link'>('default')
const visible = ref(false)

let targetX = 0
let targetY = 0
let ringX = 0
let ringY = 0
let frame = 0
let enabled = false

function onPointerMove(event: PointerEvent) {
  targetX = event.clientX
  targetY = event.clientY
  visible.value = true

  const target = event.target as Element | null
  const cursorTarget = target?.closest?.('[data-cursor]') as HTMLElement | null
  const value = cursorTarget?.dataset.cursor
  mode.value = value === 'view' ? 'view' : value === 'link' ? 'link' : 'default'
}

function onPointerLeave() {
  visible.value = false
}

function loop() {
  ringX += (targetX - ringX) * 0.16
  ringY += (targetY - ringY) * 0.16
  if (dot.value) dot.value.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
  if (ring.value) ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  enabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!enabled) return
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  frame = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  if (!enabled) return
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div v-if="enabled" class="cursor-layer" :class="{ 'is-visible': visible }" aria-hidden="true">
    <div ref="ring" class="cursor-ring" :class="`mode-${mode}`">
      <span class="cursor-label">{{ mode === 'view' ? 'VIEW' : mode === 'link' ? 'OPEN' : '' }}</span>
    </div>
    <div ref="dot" class="cursor-dot" :class="`mode-${mode}`"></div>
  </div>
</template>

<style scoped>
.cursor-layer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.cursor-layer.is-visible {
  opacity: 1;
}
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  will-change: transform;
}
.cursor-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--ink);
  transition: opacity 0.2s ease;
}
.cursor-ring {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition:
    width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    margin 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease,
    border-color 0.3s ease;
}
.cursor-label {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.14em;
  color: var(--paper);
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 0.2s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.cursor-ring.mode-view,
.cursor-ring.mode-link {
  width: 66px;
  height: 66px;
  margin: -33px 0 0 -33px;
  background: var(--ink);
  border-color: var(--ink);
}
.cursor-ring.mode-view .cursor-label,
.cursor-ring.mode-link .cursor-label {
  opacity: 1;
  transform: scale(1);
}
.cursor-dot.mode-view,
.cursor-dot.mode-link {
  opacity: 0;
}

@media (pointer: coarse) {
  .cursor-layer {
    display: none;
  }
}
</style>
