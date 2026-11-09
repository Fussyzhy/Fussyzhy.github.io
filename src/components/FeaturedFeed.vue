<script setup lang="ts">
import { featured, projects } from '../data/projects'
import AppIcon from './AppIcon.vue'
import ProjectCard from './ProjectCard.vue'
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section id="work" class="section">
    <SectionHead
      index="01 / Selected work"
      icon="folder"
      title="精选项目"
      desc="从 20 个公开仓库里挑出的 6 个：桌面工具、游戏、汉化和一个联机小实验。"
    />

    <div class="feed">
      <ProjectCard
        v-for="(project, index) in featured"
        :key="project.id"
        v-reveal
        :data-delay="index * 50"
        :project="project"
      />
    </div>

    <a class="feed-all" href="#archive" v-reveal>
      查看全部 {{ projects.length }} 个项目
      <AppIcon name="arrow-right" :size="14" />
    </a>
  </section>
</template>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.feed-all {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  padding: 10px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-2);
  border-radius: 10px;
  transition:
    color 0.25s ease,
    background 0.25s ease;
}
.feed-all:hover {
  color: var(--primary);
  background: var(--hover);
}
</style>
