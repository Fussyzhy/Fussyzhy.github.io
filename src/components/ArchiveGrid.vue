<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  categoryLabels,
  categoryOrder,
  projects,
  type Category,
} from '../data/projects'
import AppIcon from './AppIcon.vue'
import ProjectCard from './ProjectCard.vue'
import SectionHead from './SectionHead.vue'

type Filter = 'all' | Category

const active = ref<Filter>('all')

const filters = computed(() => [
  { id: 'all' as Filter, label: '全部', count: projects.length },
  ...categoryOrder.map((category) => ({
    id: category as Filter,
    label: categoryLabels[category],
    count: projects.filter((project) => project.category === category).length,
  })),
])

const filtered = computed(() =>
  active.value === 'all'
    ? projects
    : projects.filter((project) => project.category === active.value),
)

const pad = (value: number) => String(value).padStart(2, '0')
</script>

<template>
  <section id="archive" class="section">
    <SectionHead
      index="02 / Full archive"
      icon="grid"
      title="全部项目"
      desc="20 个公开仓库，按类型筛选。标着 FORK 的是基于他人仓库的二次开发——Balatro 汉化是这里 star 最多的项目。"
    />

    <div class="archive-bar" v-reveal>
      <div class="filters" role="group" aria-label="按类型筛选项目">
        <button
          v-for="chip in filters"
          :key="chip.id"
          type="button"
          class="filter"
          :class="{ 'is-active': active === chip.id }"
          :aria-pressed="active === chip.id"
          @click="active = chip.id"
        >
          {{ chip.label }}
          <span class="filter-count">{{ pad(chip.count) }}</span>
        </button>
      </div>
      <p class="archive-count">
        显示 <span>{{ pad(filtered.length) }}</span> / {{ pad(projects.length) }}
      </p>
    </div>

    <TransitionGroup name="archive" tag="div" class="archive-grid">
      <ProjectCard
        v-for="project in filtered"
        :key="project.id"
        :project="project"
        compact
      />
    </TransitionGroup>

    <p class="archive-note" v-reveal>
      <span class="note-mark"><AppIcon name="star" :size="11" /></span>
      数据来自 GitHub，截至 2026 年 11 月。完整仓库列表见
      <a class="note-link" href="https://github.com/Fussyzhy?tab=repositories" target="_blank" rel="noreferrer">
        github.com/Fussyzhy
      </a>
    </p>
  </section>
</template>

<style scoped>
.archive-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 12px;
  color: var(--text-2);
  transition:
    all 0.2s ease;
}
.filter:hover {
  border-color: var(--line-strong);
  color: var(--text);
}
.filter.is-active {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--bg);
}
.filter-count {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--muted);
}
.filter.is-active .filter-count {
  color: color-mix(in srgb, var(--bg) 65%, transparent);
}
.archive-count {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.archive-count span {
  color: var(--primary);
}
.archive-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.archive-note {
  margin-top: 20px;
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-size: 12px;
  color: var(--muted);
  flex-wrap: wrap;
}
.note-mark {
  color: var(--yellow);
  display: inline-grid;
  place-items: center;
}
.note-link {
  color: var(--primary);
}
.note-link:hover {
  text-decoration: underline;
}

.archive-move,
.archive-enter-active,
.archive-leave-active {
  transition:
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.archive-enter-from,
.archive-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.archive-leave-active {
  position: absolute;
  width: calc(50% - 7px);
}

@media (max-width: 760px) {
  .archive-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .archive-leave-active {
    width: 100%;
  }
}
</style>
