<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { quotes } from '../data/site'

const text = ref('')
const source = ref('')
const idle = ref(false)

let timer = 0
let cancelled = false
let charIndex = 0
let quoteIndex = 0

function schedule(fn: () => void, ms: number) {
  timer = window.setTimeout(fn, ms)
}

function type() {
  if (cancelled) return
  const quote = quotes[quoteIndex]
  idle.value = false
  source.value = quote.source
  if (charIndex <= quote.text.length) {
    text.value = quote.text.slice(0, charIndex)
    charIndex += 1
    schedule(type, 58)
    return
  }
  idle.value = true
  schedule(erase, 2600)
}

function erase() {
  if (cancelled) return
  idle.value = false
  const quote = quotes[quoteIndex]
  if (charIndex > 0) {
    charIndex -= 1
    text.value = quote.text.slice(0, charIndex)
    schedule(erase, 22)
    return
  }
  quoteIndex = (quoteIndex + 1) % quotes.length
  schedule(type, 420)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.value = quotes[0].text
    source.value = quotes[0].source
    return
  }
  schedule(type, 900)
})

onBeforeUnmount(() => {
  cancelled = true
  window.clearTimeout(timer)
})
</script>

<template>
  <p class="quote" aria-live="off">
    <span class="quote-body">
      <span class="quote-text">{{ text }}</span>
      <span class="quote-cursor" :class="{ 'is-idle': idle }" aria-hidden="true"></span>
    </span>
    <span class="quote-source">{{ source }}</span>
  </p>
</template>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 44px;
  max-width: 560px;
  font-size: 13px;
  color: var(--muted);
  text-align: center;
  line-height: 1.7;
}
.quote-mark {
  display: none;
}
.quote-body {
  display: inline-block;
}
.quote-text {
  min-height: 1.7em;
}
.quote-cursor {
  display: inline-block;
  width: 1px;
  height: 1.05em;
  margin-left: 2px;
  background: var(--primary);
  vertical-align: text-bottom;
  animation: caret 1s steps(1) infinite;
}
.quote-cursor.is-idle {
  animation: caret 1s steps(1) infinite;
  opacity: 0.4;
}
@keyframes caret {
  50% {
    opacity: 0;
  }
}
.quote-source {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
  opacity: 0.8;
}
@media (prefers-reduced-motion: reduce) {
  .quote-cursor {
    display: none;
  }
}
</style>
