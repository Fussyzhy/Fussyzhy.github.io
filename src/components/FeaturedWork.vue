<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { categoryLabels, featured, type Project } from '../data/projects'

const current = ref<Project | null>(null)
const hovering = ref(false)
const preview = ref<HTMLElement | null>(null)

let targetX = 0
let targetY = 0
let x = 0
let y = 0
let frame = 0
let running = false

const pad = (value: number) => String(value).padStart(2, '0')

function loop() {
  x += (targetX - x) * 0.18
  y += (targetY - y) * 0.18
  if (preview.value) {
    const width = 220
    const height = 168
    const left = Math.min(Math.max(x + 26, 12), window.innerWidth - width - 12)
    const top = Math.min(Math.max(y - height / 2, 88), window.innerHeight - height - 12)
    preview.value.style.transform = `translate3d(${left}px, ${top}px, 0)`
  }
  if (running) frame = requestAnimationFrame(loop)
}

function start() {
  if (running) return
  running = true
  x = targetX
  y = targetY
  frame = requestAnimationFrame(loop)
}

function stop() {
  running = false
  cancelAnimationFrame(frame)
}

function onMove(event: PointerEvent) {
  targetX = event.clientX
  targetY = event.clientY
}

function onEnter(project: Project) {
  current.value = project
  hovering.value = true
  if (window.matchMedia('(pointer: fine)').matches) start()
}

function onLeave() {
  hovering.value = false
  stop()
}

onBeforeUnmount(stop)
</script>

<template>
  <section id="work" class="section work">
    <div class="section-inner">
      <header class="section-head" v-reveal>
        <div>
          <div class="section-label">
            <span class="section-index">01</span>
            <span>Selected work</span>
          </div>
          <h2 class="section-title">精选项目<span class="accent">.</span></h2>
        </div>
        <p class="section-desc">
          从 2024 到 2026，六个以为会很快做完、结果做了很久的东西。桌面工具、游戏、汉化和一个联机小实验。
        </p>
      </header>

      <div class="work-list" @pointermove="onMove" @pointerleave="onLeave">
        <a
          v-for="(project, index) in featured"
          :key="project.id"
          class="work-row"
          v-reveal
          :data-delay="index * 55"
          :href="project.url"
          target="_blank"
          rel="noreferrer"
          data-cursor="view"
          @pointerenter="onEnter(project)"
        >
          <span class="row-index">{{ pad(index + 1) }}</span>

          <div class="row-main">
            <h3 class="row-title">{{ project.name }}</h3>
            <p class="row-cn">{{ project.cn }}</p>
          </div>

          <p class="row-blurb">{{ project.blurb }}</p>

          <div class="row-meta">
            <span class="row-cat">{{ categoryLabels[project.category] }}</span>
            <span class="row-year">{{ project.year }}</span>
            <span v-if="project.language" class="row-lang">{{ project.language }}</span>
            <span class="row-stars" :class="{ 'is-zero': project.stars === 0 }">
              <span class="star" aria-hidden="true">★</span>{{ project.stars }}
            </span>
            <span class="row-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="1.4" />
              </svg>
            </span>
          </div>
        </a>
      </div>

      <p class="work-foot" v-reveal data-delay="120">
        更多实验、练习和 fork 在下面的完整归档里。
        <a class="link-sweep" href="#archive">全部 20 个项目 ↓</a>
      </p>

      <div
        ref="preview"
        class="work-preview"
        :class="{ 'is-visible': hovering }"
        aria-hidden="true"
      >
        <template v-if="current">
          <span class="preview-index">{{ pad(featured.indexOf(current) + 1) }}</span>
          <span class="preview-name">{{ current.name }}</span>
          <span class="preview-cn">{{ current.cn }}</span>
          <span class="preview-foot">
            {{ categoryLabels[current.category] }} / {{ current.year }}
          </span>
          <span class="preview-mark">↗</span>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-list {
  border-top: 1px solid var(--line);
}
.work-row {
  --row-bg: transparent;
  --row-fg: var(--ink);
  position: relative;
  display: grid;
  grid-template-columns: 52px minmax(160px, 0.9fr) minmax(0, 1.45fr) minmax(240px, auto);
  align-items: center;
  gap: clamp(16px, 2.4vw, 36px);
  padding: 24px 18px 24px 4px;
  border-bottom: 1px solid var(--line);
  color: var(--row-fg);
  transition:
    background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    padding 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.work-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.work-row:hover {
  --row-bg: var(--ink);
  --row-fg: var(--paper);
  background: var(--row-bg);
  padding-left: 18px;
  padding-right: 18px;
}
.work-row:hover::before {
  transform: scaleY(1);
}
.row-index {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
  transition: color 0.3s ease;
}
.work-row:hover .row-index {
  color: var(--accent);
}
.row-main {
  min-width: 0;
}
.row-title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(24px, 2.5vw, 34px);
  line-height: 1.05;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-cn {
  margin-top: 6px;
  font-size: 12px;
  color: var(--ink-soft);
  transition: color 0.3s ease;
}
.work-row:hover .row-cn {
  color: color-mix(in srgb, var(--paper) 64%, transparent);
}
.row-blurb {
  font-size: 13px;
  line-height: 1.75;
  color: var(--ink-soft);
  max-width: 46ch;
  transition: color 0.3s ease;
}
.work-row:hover .row-blurb {
  color: color-mix(in srgb, var(--paper) 78%, transparent);
}
.row-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--muted);
  justify-content: flex-end;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.work-row:hover .row-meta {
  color: color-mix(in srgb, var(--paper) 62%, transparent);
}
.row-cat {
  color: var(--ink-soft);
}
.work-row:hover .row-cat {
  color: var(--paper);
}
.row-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.row-stars.is-zero {
  opacity: 0.5;
}
.star {
  color: var(--accent);
  font-size: 9px;
}
.row-arrow {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.work-row:hover .row-arrow {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--paper);
  transform: rotate(45deg);
}
.work-foot {
  margin-top: 26px;
  font-size: 13px;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.work-foot a {
  color: var(--ink);
  margin-left: 4px;
}

.work-preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 220px;
  height: 168px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: var(--ink);
  color: var(--paper);
  pointer-events: none;
  opacity: 0;
  transform-origin: left center;
  transition: opacity 0.3s ease;
  will-change: transform;
}
.work-preview.is-visible {
  opacity: 1;
}
.preview-index {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.1em;
}
.preview-name {
  font-family: var(--serif);
  font-style: italic;
  font-size: 24px;
  line-height: 1.05;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-cn {
  font-size: 12px;
  color: color-mix(in srgb, var(--paper) 62%, transparent);
  margin-top: 4px;
}
.preview-foot {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid color-mix(in srgb, var(--paper) 22%, transparent);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--paper) 55%, transparent);
}
.preview-mark {
  position: absolute;
  top: 14px;
  right: 16px;
  color: var(--accent);
  font-size: 14px;
}

@media (max-width: 1080px) {
  .work-row {
    grid-template-columns: 40px minmax(0, 1fr) minmax(0, auto);
  }
  .row-meta {
    justify-content: flex-end;
  }
  .row-blurb {
    display: none;
  }
  .work-preview {
    display: none;
  }
}
@media (max-width: 620px) {
  .work-row {
    grid-template-columns: 32px minmax(0, 1fr);
    padding: 20px 4px;
    gap: 12px;
  }
  .work-row:hover {
    padding-left: 12px;
    padding-right: 12px;
  }
  .row-main {
    min-width: 0;
  }
  .row-title {
    font-size: 26px;
    white-space: normal;
  }
  .row-meta {
    grid-column: 2 / -1;
    flex-wrap: wrap;
    gap: 10px;
  }
  .row-arrow {
    margin-left: auto;
  }
}
</style>
