<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ index: string; title: string; icon?: string; desc?: string }>(), {
  icon: 'grid',
})
</script>

<template>
  <header class="section-head" v-reveal>
    <div class="section-head-main">
      <p class="section-kicker">
        <span class="section-icon"><AppIcon :name="icon" :size="14" /></span>
        <span>{{ index }}</span>
      </p>
      <h2 class="section-title">{{ title }}</h2>
    </div>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </header>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}
.section-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}
.section-icon {
  color: var(--primary);
  display: grid;
  place-items: center;
}
.section-title {
  font-family: var(--serif);
  font-size: clamp(26px, 3.6vw, 34px);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.2;
}
.section-desc {
  max-width: 38ch;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-2);
  text-align: right;
  padding-bottom: 4px;
}
@media (max-width: 700px) {
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .section-desc {
    text-align: left;
    padding-bottom: 0;
  }
}
</style>
