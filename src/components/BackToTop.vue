<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 600
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="back-top">
    <button v-if="visible" type="button" class="back-top" aria-label="回到顶部" @click="toTop">
      <AppIcon name="arrow-up" :size="16" />
    </button>
  </Transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  color: var(--text-2);
  box-shadow: var(--shadow);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.back-top:hover {
  color: var(--primary);
  border-color: var(--line-strong);
  transform: translateY(-3px);
}
.back-top-enter-active,
.back-top-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
