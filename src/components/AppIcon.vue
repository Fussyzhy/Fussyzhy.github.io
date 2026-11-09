<script setup lang="ts">
import { computed } from 'vue'

const icons: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  user: 'M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  sun: 'M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4',
  moon: 'M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  'arrow-up': 'M12 19V5M5 12l7-7 7 7',
  'arrow-right': 'M5 12h14M13 5l7 7-7 7',
  calendar: 'M4 6h16v14H4zM8 3v4M16 3v4M4 10h16',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4',
  tag: 'M3 12V4h8l9 9-8 8-9-9zM7.5 7.5h.01',
  star: 'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  check: 'M4 12l5 5L20 6',
  triangle: 'M4 7h16L12 19z',
  heart: 'M12 20.5 3.9 12.4a5 5 0 0 1 7.1-7.1l1 1 1-1a5 5 0 0 1 7.1 7.1z',
  github:
    'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z',
}

const filled = new Set(['github', 'star', 'triangle', 'heart'])

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })

const path = computed(() => icons[props.name] ?? '')
const isFilled = computed(() => filled.has(props.name))
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="isFilled ? 'currentColor' : 'none'"
    :stroke="isFilled ? 'none' : 'currentColor'"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle v-if="name === 'sun'" cx="12" cy="12" r="4" />
    <path :d="path" />
  </svg>
</template>
