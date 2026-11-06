<script setup lang="ts">
import { profile, stack, timeline } from '../data/projects'
</script>

<template>
  <section id="about" class="section about">
    <div class="section-inner">
      <header class="section-head" v-reveal>
        <div>
          <div class="section-label">
            <span class="section-index">03</span>
            <span>About</span>
          </div>
          <h2 class="section-title">关于我<span class="accent">.</span></h2>
        </div>
        <p class="section-desc">
          全栈开发者，常驻杭州。写前端、写接口，也做一些会被装进电脑里的桌面工具。
        </p>
      </header>

      <div class="about-grid">
        <div class="about-copy">
          <p class="about-lead" v-reveal>
            保持好奇，<br />
            <span class="about-lead-accent">把事情做好。</span>
          </p>

          <div class="about-body">
            <p v-reveal data-delay="60">{{ profile.intro }}</p>
            <p v-reveal data-delay="110">
              现在在杭州做全栈开发，日常在 Vue 和 NestJS 之间来回切换。做东西的习惯是先让它跑起来，
              再回头把它做干净——这个网站也是这么来的。
            </p>
            <p v-reveal data-delay="160">
              工作之外会去城市里散步、拍照，也愿意花一个周末给喜欢的游戏做汉化。
              想聊项目、技术，或者只是交换一个有趣的想法，都欢迎发邮件。
            </p>
          </div>

          <div class="about-links" v-reveal data-delay="200">
            <a class="about-link" :href="profile.github" target="_blank" rel="noreferrer" data-cursor="link">
              <span class="about-link-label">GitHub</span>
              <span class="about-link-value">github.com/{{ profile.handle }}</span>
              <span class="about-link-arrow" aria-hidden="true">↗</span>
            </a>
            <a class="about-link" :href="`mailto:${profile.email}`" data-cursor="link">
              <span class="about-link-label">Email</span>
              <span class="about-link-value">{{ profile.email }}</span>
              <span class="about-link-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside class="about-stack" v-reveal data-delay="80">
          <div v-for="group in stack" :key="group.en" class="stack-group">
            <div class="stack-head">
              <h3 class="stack-cn">{{ group.group }}</h3>
              <span class="stack-en">{{ group.en }}</span>
            </div>
            <ul class="stack-items">
              <li v-for="item in group.items" :key="item" class="tag">{{ item }}</li>
            </ul>
          </div>
        </aside>
      </div>

      <ol class="timeline">
        <li
          v-for="(entry, index) in timeline"
          :key="entry.year"
          class="timeline-item"
          v-reveal
          :data-delay="index * 70"
        >
          <span class="timeline-year">{{ entry.year }}</span>
          <h3 class="timeline-title">{{ entry.title }}</h3>
          <p class="timeline-copy">{{ entry.copy }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: clamp(36px, 6vw, 88px);
  align-items: start;
}
.about-lead {
  font-size: clamp(32px, 4.4vw, 58px);
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: -0.045em;
  margin-bottom: clamp(26px, 4vh, 40px);
}
.about-lead-accent {
  color: var(--accent);
}
.about-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 52ch;
  font-size: 15px;
  line-height: 1.9;
  color: var(--ink-soft);
}
.about-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: clamp(26px, 4vh, 40px);
}
.about-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border: 1px solid var(--line);
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
}
.about-link:hover {
  border-color: var(--ink);
  background: var(--paper-2);
}
.about-link-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.about-link-value {
  font-size: 13px;
}
.about-link-arrow {
  color: var(--accent);
  font-size: 13px;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.about-link:hover .about-link-arrow {
  transform: translate(2px, -2px);
}

.about-stack {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-top: 6px;
}
.stack-group {
  border-top: 1px solid var(--line);
  padding-top: 14px;
}
.stack-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.stack-cn {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.stack-en {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--muted);
}
.stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: clamp(48px, 8vh, 92px);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  list-style: none;
}
.timeline-item {
  padding: 22px 20px 26px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background 0.35s ease;
}
.timeline-item:hover {
  background: var(--paper-2);
}
.timeline-year {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--accent);
}
.timeline-title {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.timeline-copy {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.75;
  color: var(--ink-soft);
}

@media (max-width: 980px) {
  .about-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 44px;
  }
  .about-stack {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 26px;
  }
  .timeline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .about-stack {
    grid-template-columns: minmax(0, 1fr);
  }
  .timeline {
    grid-template-columns: minmax(0, 1fr);
  }
  .about-link {
    width: 100%;
  }
}
</style>
