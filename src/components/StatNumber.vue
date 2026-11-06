<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ value: number; duration?: number }>(), {
  duration: 1500,
})

const el = ref<HTMLSpanElement | null>(null)
const display = ref(0)
let frame = 0
let observer: IntersectionObserver | null = null

function run() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.value
    return
  }
  const started = performance.now()
  const tick = (now: number) => {
    const progress = Math.min((now - started) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = Math.round(eased * props.value)
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return
      run()
      observer?.disconnect()
    },
    { threshold: 0.6 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="stat-number">{{ display }}</span>
</template>
