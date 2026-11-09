<script setup lang="ts">
import { computed } from 'vue'
import { categoryLabels, type Project } from '../data/projects'
import AppIcon from './AppIcon.vue'

const props = withDefaults(defineProps<{ project: Project; compact?: boolean }>(), {
  compact: false,
})

const langColors: Record<string, string> = {
  TypeScript: '#3178C6',
  Vue: '#41B883',
  Lua: '#2C2D72',
  Electron: '#47848F',
  C: '#A8B9CC',
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
}

const langColor = computed(() =>
  props.project.language ? (langColors[props.project.language] ?? 'var(--muted)') : 'var(--muted)',
)
</script>

<template>
  <a
    class="pcard"
    :class="{ 'is-compact': compact }"
    :href="project.url"
    target="_blank"
    rel="noreferrer"
  >
    <div class="pcard-meta">
      <span class="meta-item">
        <AppIcon name="calendar" :size="12" />
        {{ project.year }}
      </span>
      <span class="meta-item">
        <span class="meta-star"><AppIcon name="star" :size="12" /></span>
        {{ project.stars }}
      </span>
      <span v-if="project.language" class="meta-item">
        <i class="lang-dot" :style="{ background: langColor }" aria-hidden="true"></i>
        {{ project.language }}
      </span>
      <span class="pcard-cat">{{ categoryLabels[project.category] }}</span>
      <span v-if="project.fork" class="pcard-fork">FORK</span>
      <span class="pcard-arrow" aria-hidden="true">
        <AppIcon name="arrow-right" :size="15" />
      </span>
    </div>

    <h3 class="pcard-title">{{ project.name }}</h3>
    <p class="pcard-cn">{{ project.cn }}</p>
    <p v-if="!compact" class="pcard-desc">{{ project.blurb }}</p>

    <div class="pcard-foot">
      <ul class="pcard-tags">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>
      <span v-if="!compact" class="pcard-link">查看仓库</span>
    </div>
  </a>
</template>

<style scoped>
.pcard {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease;
}
.pcard:hover {
  border-color: var(--line-strong);
  background: var(--card-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.pcard-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.meta-star {
  color: var(--yellow);
  display: grid;
  place-items: center;
}
.lang-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.pcard-cat {
  color: var(--text-2);
}
.pcard-fork {
  padding: 1px 5px;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: var(--text-2);
}
.pcard-arrow {
  margin-left: auto;
  color: var(--muted);
  display: grid;
  place-items: center;
  transition:
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.pcard:hover .pcard-arrow {
  color: var(--primary);
  transform: translateX(3px);
}
.pcard-title {
  margin-top: 14px;
  font-family: var(--sans);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  transition: color 0.25s ease;
}
.pcard:hover .pcard-title {
  color: var(--primary);
}
.pcard-cn {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--text-2);
}
.pcard-desc {
  margin-top: 10px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pcard-foot {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pcard-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pcard-tags li {
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.03em;
  color: var(--muted);
  padding: 3px 7px;
  border: 1px solid var(--line);
  border-radius: 999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}
.pcard:hover .pcard-tags li {
  border-color: var(--line-strong);
  color: var(--text-2);
}
.pcard-link {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--primary);
  white-space: nowrap;
}
.is-compact {
  padding: 16px 18px 14px;
}
.is-compact .pcard-title {
  font-size: 19px;
  margin-top: 10px;
}
.is-compact .pcard-foot {
  margin-top: 12px;
  padding-top: 10px;
}
@media (max-width: 600px) {
  .pcard {
    padding: 18px 18px 16px;
  }
  .pcard-title {
    font-size: 20px;
  }
}
</style>
