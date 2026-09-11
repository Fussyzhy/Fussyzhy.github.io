<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const github = {
  name: 'HaoYang',
  handle: 'Fussyzhy',
  avatar: 'https://avatars.githubusercontent.com/u/47082730?v=4',
  url: 'https://github.com/Fussyzhy',
  location: 'Hangzhou, China',
  repos: 15,
  followers: 8,
}

const projects = [
  { number: '01', title: 'Web experiments', type: 'INTERACTION / 2024', copy: '把好奇心变成可以被点击、拖拽和再次发现的小东西。', tone: 'cyan', mark: '↗' },
  { number: '02', title: 'Open source notes', type: 'SYSTEM / 2023', copy: '在开源社区里记录问题、方案和那些意外的灵感。', tone: 'violet', mark: '⌘' },
  { number: '03', title: 'Quiet interfaces', type: 'DESIGN / NOW', copy: '让复杂的工具变得清晰、友好，也保留一点个性。', tone: 'lime', mark: '✦' },
]

const scrollY = ref(0)
const pointer = ref({ x: 0, y: 0 })
const activeSection = ref('home')

const sceneStyle = computed(() => ({
  '--scene-x': `${pointer.value.y * -8}deg`,
  '--scene-y': `${pointer.value.x * 10}deg`,
  '--scene-depth': `${Math.min(scrollY.value * 0.18, 120)}px`,
}))

function updateScroll() {
  scrollY.value = window.scrollY
  const sections = ['home', 'work', 'about']
  const current = sections.find((id) => {
    const el = document.getElementById(id)
    if (!el) return false
    const box = el.getBoundingClientRect()
    return box.top <= 140 && box.bottom > 140
  })
  if (current) activeSection.value = current
}

function updatePointer(event: PointerEvent) {
  pointer.value = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('pointermove', updatePointer, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('pointermove', updatePointer)
})
</script>

<template>
  <div class="site-shell" :style="sceneStyle">
    <div class="noise" aria-hidden="true"></div>
    <header class="topbar">
      <a class="wordmark" href="#home" aria-label="回到首页">HY<span>/</span>24</a>
      <nav aria-label="主导航">
        <a href="#home" :class="{ active: activeSection === 'home' }">首页</a>
        <a href="#work" :class="{ active: activeSection === 'work' }">作品</a>
        <a href="#about" :class="{ active: activeSection === 'about' }">关于</a>
      </nav>
      <a class="github-link" :href="github.url" target="_blank" rel="noreferrer"><span class="github-dot"></span> GitHub <span class="arrow">↗</span></a>
    </header>
    <main>
      <section id="home" class="hero-section">
        <div class="hero-copy">
          <p class="kicker"><span class="pulse-dot"></span> Independent maker · 2024—now</p>
          <h1><span class="greeting">你好，我是</span><br /><span>HaoYang</span><i>.</i></h1>
          <p class="hero-lead">我在杭州做一些有趣的数字体验，写代码，也研究人与界面之间那些微妙的距离。</p>
          <div class="hero-actions"><a class="button button-solid" href="#work">看看我在做什么 <span>↓</span></a><a class="text-link" :href="github.url" target="_blank" rel="noreferrer">在 GitHub 上认识我 <span>↗</span></a></div>
          <div class="hero-meta"><span>SCROLL TO EXPLORE</span><span class="scroll-line"></span><span>01 / 03</span></div>
        </div>
        <div class="scene-wrap" aria-label="三维头像展示"><div class="scene" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="axis axis-a"></div><div class="axis axis-b"></div><div class="avatar-card"><img :src="github.avatar" :alt="`${github.name} 的 GitHub 头像`" /><span class="avatar-corner corner-tl"></span><span class="avatar-corner corner-br"></span></div><div class="float-label label-top">BUILD / PLAY / REPEAT</div><div class="float-label label-side">31° 13' N<br />121° 28' E</div><div class="float-label label-bottom">FUSSYZHY <b>•</b> 47082730</div></div><div class="scene-caption"><span>FIG. 01</span><span>PERSONAL / IDENTITY</span></div></div>
      </section>
      <div class="ticker" aria-label="兴趣标签"><div class="ticker-track"><span>CREATIVE CODE</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b><span>CREATIVE CODE</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b></div></div>
      <section id="work" class="work-section section-block"><div class="section-intro"><p class="kicker">02 / SELECTED WORK</p><h2>把想法，<br /><em>做成可以触摸的东西。</em></h2><p>我喜欢从一个模糊的念头出发，直到它变成一个有温度的界面、一段顺滑的动效，或一个能被更多人使用的工具。</p></div><div class="project-list"><a v-for="project in projects" :key="project.number" class="project-card" :class="`tone-${project.tone}`" href="#about"><div class="project-top"><span>{{ project.number }}</span><span>{{ project.type }}</span></div><div class="project-main"><div><h3>{{ project.title }}</h3><p>{{ project.copy }}</p></div><span class="project-mark">{{ project.mark }}</span></div><div class="project-bottom"><span>EXPLORE CASE <b>↗</b></span><span class="project-bar"></span></div></a></div></section>
      <section id="about" class="about-section section-block"><div class="about-portrait"><img :src="github.avatar" :alt="github.name" /><div class="portrait-stamp">H / Y<br /><small>MAKER<br />IN RESIDENCE</small></div></div><div class="about-copy"><p class="kicker">03 / A LITTLE ABOUT ME</p><h2>保持好奇，<br /><em>保持在场。</em></h2><p>我的工作横跨前端、交互和视觉设计。我相信好的技术应该让人忘记技术本身，只留下“这很顺手”的感觉。</p><p>工作之外，我会在城市里散步、拍照，或者打开一个新仓库，把脑子里的小问题慢慢做出来。</p><a class="button button-outline" :href="github.url" target="_blank" rel="noreferrer">查看我的 GitHub <span>↗</span></a></div><div class="stats"><div><strong>{{ github.repos }}</strong><span>PUBLIC REPOS</span></div><div><strong>{{ github.followers }}</strong><span>FOLLOWERS</span></div><div><strong>∞</strong><span>IDEAS IN PROGRESS</span></div></div></section>
    </main>
    <footer><div><span class="footer-mark">HY/24</span><span>© 2024 HaoYang</span></div><span>DESIGNED &amp; BUILT IN HANGZHOU</span><a :href="github.url" target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
  </div>
</template>
