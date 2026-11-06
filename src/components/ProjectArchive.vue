<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  categoryLabels,
  categoryOrder,
  projects,
  type Category,
} from '../data/projects'

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
  <section id="archive" class="section archive">
    <div class="section-inner">
      <header class="section-head" v-reveal>
        <div>
          <div class="section-label">
            <span class="section-index">02</span>
            <span>Full archive</span>
          </div>
          <h2 class="section-title">全部项目<span class="accent">.</span></h2>
        </div>
        <p class="section-desc">
          20 个公开仓库，按类型排列。标着 FORK 的是基于他人仓库的二次开发——其中 Balatro 汉化是这里
          star 最多的项目。
        </p>
      </header>

      <div class="archive-bar" v-reveal>
        <div class="archive-filters" role="group" aria-label="按类型筛选项目">
          <button
            v-for="chip in filters"
            :key="chip.id"
            type="button"
            class="chip"
            :class="{ 'is-active': active === chip.id }"
            :aria-pressed="active === chip.id"
            @click="active = chip.id"
          >
            {{ chip.label }}
            <span class="chip-count">{{ pad(chip.count) }}</span>
          </button>
        </div>
        <p class="archive-total">
          显示
          <span class="archive-total-num">{{ pad(filtered.length) }}</span>
          / {{ pad(projects.length) }}
        </p>
      </div>

      <TransitionGroup name="archive" tag="div" class="archive-grid">
        <a
          v-for="project in filtered"
          :key="project.id"
          class="archive-item"
          :href="project.url"
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
        >
          <div class="archive-top">
            <span class="archive-lang">
              <span class="lang-dot" aria-hidden="true"></span>
              {{ project.language ?? '—' }}
            </span>
            <span class="archive-year">{{ project.year }}</span>
          </div>

          <h3 class="archive-name">{{ project.name }}</h3>
          <p class="archive-cn">{{ project.cn }}</p>

          <div class="archive-foot">
            <span class="archive-cat">{{ categoryLabels[project.category] }}</span>
            <span v-if="project.fork" class="archive-fork">FORK</span>
            <span class="archive-stars">
              <span class="star" aria-hidden="true">★</span>
              {{ project.stars }}
            </span>
            <span class="archive-arrow" aria-hidden="true">↗</span>
          </div>
        </a>
      </TransitionGroup>

      <p class="archive-note" v-reveal>
        <span class="note-mark">✳</span>
        数据来自 GitHub，截至 2026 年 11 月。完整仓库列表见
        <a class="link-sweep" href="https://github.com/Fussyzhy?tab=repositories" target="_blank" rel="noreferrer">
          github.com/Fussyzhy
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.archive-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 28px;
}
.archive-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid var(--line);
  font-size: 12px;
  color: var(--ink-soft);
  transition:
    background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    color 0.3s ease;
}
.chip:hover {
  border-color: var(--ink);
  color: var(--ink);
}
.chip.is-active {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}
.chip-count {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.04em;
  color: var(--muted);
}
.chip.is-active .chip-count {
  color: var(--accent);
}
.archive-total {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.archive-total-num {
  color: var(--ink);
}

.archive-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.archive-item {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 190px;
  padding: 20px 22px 18px;
  background: var(--paper);
  transition:
    background 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s ease;
}
.archive-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.archive-item:hover {
  background: var(--paper-2);
}
.archive-item:hover::before {
  transform: scaleX(1);
}
.archive-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.archive-lang {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.lang-dot {
  width: 5px;
  height: 5px;
}
.archive-year {
  color: var(--muted);
}
.archive-name {
  margin-top: auto;
  padding-top: 26px;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(22px, 2vw, 28px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.archive-cn {
  margin-top: 5px;
  font-size: 12px;
  color: var(--ink-soft);
}
.archive-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--muted);
}
.archive-fork {
  padding: 2px 5px;
  border: 1px solid var(--line-strong);
  color: var(--ink-soft);
}
.archive-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.archive-stars .star {
  color: var(--accent);
  font-size: 8px;
}
.archive-arrow {
  margin-left: auto;
  font-size: 13px;
  color: var(--ink-soft);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.archive-item:hover .archive-arrow {
  transform: translate(3px, -3px);
  color: var(--accent);
}

.archive-note {
  margin-top: 22px;
  font-size: 12px;
  color: var(--muted);
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.note-mark {
  color: var(--accent);
}
.archive-note a {
  color: var(--ink);
}

/* filter transitions */
.archive-move,
.archive-enter-active,
.archive-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.archive-enter-from,
.archive-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
}
.archive-leave-active {
  position: absolute;
  width: calc(50% - 1px);
  z-index: 0;
}

@media (max-width: 760px) {
  .archive-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .archive-leave-active {
    width: calc(100% - 1px);
  }
  .archive-item {
    min-height: 168px;
  }
}
@media (max-width: 560px) {
  .archive-item {
    padding: 18px;
  }
  .archive-name {
    white-space: normal;
    font-size: 24px;
  }
  .chip {
    padding: 8px 11px;
    font-size: 11px;
  }
}
</style>
