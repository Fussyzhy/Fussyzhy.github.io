<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

const canvas = ref<HTMLCanvasElement | null>(null)
const palette = ['#64b5f6', '#f472b6', '#fbbf24', '#4ade80', '#22d3ee', '#c084fc']

let context: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let frame = 0
let enabled = false

function resize() {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.floor(window.innerWidth * dpr)
  el.height = Math.floor(window.innerHeight * dpr)
  context = el.getContext('2d')
  context?.setTransform(dpr, 0, 0, dpr, 0, 0)
  if (context) context.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

function loop() {
  if (!context) return
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  particles = particles.filter((particle) => particle.life > 0)
  for (const particle of particles) {
    particle.life -= 1
    particle.x += particle.vx
    particle.y += particle.vy
    particle.vy += 0.06
    particle.vx *= 0.985
    const alpha = Math.max(particle.life / particle.maxLife, 0)
    context.globalAlpha = alpha
    context.fillStyle = particle.color
    context.beginPath()
    context.arc(particle.x, particle.y, particle.size * alpha + 0.6, 0, Math.PI * 2)
    context.fill()
  }
  context.globalAlpha = 1
  if (particles.length > 0) {
    frame = requestAnimationFrame(loop)
  } else {
    frame = 0
  }
}

function burst(event: PointerEvent) {
  const count = 12
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const speed = 1.6 + Math.random() * 2.6
    const maxLife = 26 + Math.floor(Math.random() * 14)
    particles.push({
      x: event.clientX,
      y: event.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.8,
      life: maxLife,
      maxLife,
      size: 1.2 + Math.random() * 1.6,
      color: palette[Math.floor(Math.random() * palette.length)],
    })
  }
  if (!frame) frame = requestAnimationFrame(loop)
}

onMounted(() => {
  enabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!enabled) return
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointerdown', burst, { passive: true })
})

onBeforeUnmount(() => {
  if (!enabled) return
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointerdown', burst)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <canvas v-if="enabled" ref="canvas" class="sparkles" aria-hidden="true"></canvas>
</template>

<style scoped>
.sparkles {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 95;
  pointer-events: none;
}
</style>
