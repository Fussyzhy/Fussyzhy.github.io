<script setup lang="ts">
import { stack, timeline, profile } from '../data/projects'
import { site } from '../data/site'
import AppIcon from './AppIcon.vue'
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section id="about" class="section">
    <SectionHead
      index="03 / About"
      icon="user"
      title="关于我"
      desc="全栈开发者，常驻杭州。写前端、写接口，也做一些会被装进电脑里的桌面工具。"
    />

    <div class="about-grid">
      <div class="card about-bio" v-reveal>
        <p class="about-lead">保持好奇，把事情做好。</p>
        <p>{{ profile.intro }}</p>
        <p>
          现在在杭州做全栈开发，日常在 Vue 和 NestJS 之间来回切换。做东西的习惯是先让它跑起来，
          再回头把它做干净——这个网站也是这么来的。
        </p>
        <p>
          工作之外会去城市里散步、拍照，也愿意花一个周末给喜欢的游戏做汉化。想聊项目、技术，
          或者只是交换一个有趣的想法，都欢迎发邮件。
        </p>
        <div class="about-links">
          <a :href="site.github" target="_blank" rel="noreferrer">
            <AppIcon name="github" :size="15" />
            github.com/{{ site.handle }}
            <span aria-hidden="true">↗</span>
          </a>
          <a :href="`mailto:${site.email}`">
            <AppIcon name="mail" :size="15" />
            {{ site.email }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="card about-stack" v-reveal data-delay="80">
        <h3 class="card-title">技术栈 <span>Stack</span></h3>
        <div v-for="group in stack" :key="group.en" class="stack-group">
          <p class="stack-label">
            {{ group.group }}
            <span>{{ group.en }}</span>
          </p>
          <ul class="stack-items">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <ol class="timeline">
      <li
        v-for="(entry, index) in timeline"
        :key="entry.year"
        class="timeline-item"
        v-reveal
        :data-delay="index * 60"
      >
        <span class="timeline-year">{{ entry.year }}</span>
        <h3 class="timeline-title">{{ entry.title }}</h3>
        <p class="timeline-copy">{{ entry.copy }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 16px;
  align-items: start;
}
.about-bio {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--text-2);
}
.about-lead {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--text);
}
.about-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}
.about-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 12px;
  color: var(--text-2);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}
.about-links a:hover {
  color: var(--primary);
  border-color: var(--line-strong);
  background: var(--hover);
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
}
.card-title span {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 400;
}
.stack-group + .stack-group {
  margin-top: 14px;
}
.stack-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-2);
  margin-bottom: 8px;
}
.stack-label span {
  font-family: var(--mono);
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: var(--muted);
}
.stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.stack-items li {
  padding: 3px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-2);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}
.stack-items li:hover {
  color: var(--primary);
  border-color: var(--line-strong);
}
.timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.timeline-item {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.timeline-item:hover {
  border-color: var(--line-strong);
  background: var(--card-hover);
  transform: translateY(-2px);
}
.timeline-year {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--primary);
}
.timeline-title {
  margin-top: 8px;
  font-size: 13.5px;
  font-weight: 600;
}
.timeline-copy {
  margin-top: 6px;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--muted);
}
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .timeline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .timeline {
    grid-template-columns: minmax(0, 1fr);
  }
  .about-lead {
    font-size: 21px;
  }
}
</style>
