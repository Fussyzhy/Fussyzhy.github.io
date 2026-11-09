<script setup lang="ts">
import { prologueLinks, site, techIcons } from '../data/site'
import { profile } from '../data/projects'
import AppIcon from './AppIcon.vue'
import QuoteLine from './QuoteLine.vue'
</script>

<template>
  <section id="top" class="prologue">
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-haze" aria-hidden="true"></div>

    <div class="prologue-inner">
      <div class="avatar" v-reveal>
        <img :src="profile.avatar" :alt="`${site.name}的头像`" width="200" height="200" />
        <span class="avatar-badge" aria-hidden="true">
          <AppIcon name="star" :size="13" />
        </span>
      </div>

      <p class="prologue-name" v-reveal data-delay="80">
        {{ site.name }}<span class="prologue-alias"> / {{ site.latin }}</span>
      </p>

      <div class="prologue-card" v-reveal data-delay="140">
        <span class="frame-line frame-line-top" aria-hidden="true"></span>
        <span class="frame-line frame-line-bottom" aria-hidden="true"></span>
        <h1 class="prologue-title">{{ site.title }}</h1>
        <p class="prologue-slogan">{{ site.slogan }}</p>
        <p class="prologue-sub">{{ site.subtitle }}</p>
        <p class="prologue-meta">{{ site.role }} · {{ site.location }} · {{ site.since }}—now</p>
      </div>

      <div class="tech-row" v-reveal data-delay="200">
        <span class="tech-label">Stack</span>
        <ul class="tech-icons">
          <li v-for="item in techIcons" :key="item.name" :title="item.name">
            <img :src="item.icon" :alt="item.name" width="26" height="26" loading="lazy" />
          </li>
        </ul>
      </div>

      <nav class="prologue-links" aria-label="站点导航" v-reveal data-delay="260">
        <a
          v-for="link in prologueLinks"
          :key="link.label"
          :href="link.href"
          class="prologue-link"
          :style="{ '--link-color': link.color }"
        >
          <span class="prologue-link-icon"><AppIcon :name="link.icon" :size="18" /></span>
          {{ link.label }}
        </a>
      </nav>

      <QuoteLine v-reveal data-delay="320" />

      <a class="go-down" href="#work" aria-label="向下滚动">
        <AppIcon name="triangle" :size="12" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.prologue {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 92px 20px 64px;
  z-index: 1;
  overflow: hidden;
}
.prologue-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 720px;
  text-align: center;
}
.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  padding: 4px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.avatar:hover {
  transform: scale(1.04) rotate(-2deg);
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-badge {
  position: absolute;
  right: -1px;
  bottom: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-3);
  border: 2px solid var(--bg);
  color: var(--primary);
  display: grid;
  place-items: center;
}
.prologue-name {
  margin-top: 16px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.prologue-alias {
  font-family: var(--serif);
  font-weight: 500;
  color: var(--text-2);
  margin-left: 2px;
}
.prologue-card {
  position: relative;
  margin-top: 26px;
  padding: 22px 40px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 100%, transparent);
  min-width: min(100%, 420px);
}
.frame-line {
  position: absolute;
  left: 50%;
  width: 1px;
  background: var(--line-strong);
  transform: translateX(-50%);
}
.frame-line-top {
  bottom: 100%;
  height: 26px;
  transform-origin: bottom;
  animation: frame-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}
.frame-line-bottom {
  top: 100%;
  height: 26px;
  transform-origin: top;
  animation: frame-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
}
@keyframes frame-grow {
  from {
    transform: translateX(-50%) scaleY(0);
  }
  to {
    transform: translateX(-50%) scaleY(1);
  }
}
.prologue-title {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.prologue-slogan {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
}
.prologue-sub {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text-2);
}
.prologue-meta {
  margin-top: 14px;
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.tech-row {
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.tech-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}
.tech-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(14px, 2.4vw, 24px);
}
.tech-icons li {
  display: grid;
  place-items: center;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.tech-icons img {
  width: 26px;
  height: 26px;
  opacity: 0.92;
  filter: saturate(0.95);
}
.tech-icons li:hover {
  transform: translateY(-3px) scale(1.08);
}
.prologue-links {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, auto));
  gap: 8px;
  justify-content: center;
}
.prologue-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}
.prologue-link:hover {
  background: var(--hover);
  transform: translateY(-1px);
}
.prologue-link-icon {
  color: var(--link-color);
  display: grid;
  place-items: center;
}
.go-down {
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 2;
  transform: translateX(-50%);
  color: var(--muted);
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  animation: go-down 2.4s ease-in-out infinite;
  transition: color 0.25s ease;
}
.go-down:hover {
  color: var(--primary);
}
@keyframes go-down {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, 6px);
    opacity: 1;
  }
}
@media (max-width: 640px) {
  .prologue {
    padding-top: 84px;
  }
  .prologue-card {
    padding: 20px 24px;
    min-width: min(100%, 320px);
  }
  .prologue-title {
    font-size: 21px;
  }
  .prologue-links {
    grid-template-columns: repeat(2, minmax(0, auto));
    gap: 4px;
  }
  .prologue-link {
    font-size: 15px;
    padding: 9px 14px;
  }
  .tech-icons {
    gap: 16px;
  }
  .tech-icons img {
    width: 23px;
    height: 23px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .go-down,
  .frame-line {
    animation: none;
  }
}
</style>
