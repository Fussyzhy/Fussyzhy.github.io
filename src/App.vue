<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine } from '@babylonjs/core/Engines/engine'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { Scene } from '@babylonjs/core/scene'

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
const canvas = ref<HTMLCanvasElement | null>(null)
let engine: Engine | null = null
let babylonScene: Scene | null = null
let camera: ArcRotateCamera | null = null
let heroRoot: any = null

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

function createBabylonScene() {
  if (!canvas.value) return
  engine = new Engine(canvas.value, true, { preserveDrawingBuffer: true, stencil: true, antialias: true })
  babylonScene = new Scene(engine)
  babylonScene.clearColor = new Color4(0.02, 0.025, 0.035, 0)
  camera = new ArcRotateCamera('hero-camera', -Math.PI / 2, Math.PI / 2.4, 8.8, Vector3.Zero(), babylonScene)
  camera.lowerRadiusLimit = 7
  camera.upperRadiusLimit = 11
  camera.inputs.clear()
  new HemisphericLight('soft-fill', new Vector3(0, 1, 0), babylonScene).intensity = 0.55
  const key = new PointLight('acid-key', new Vector3(3, 4, -4), babylonScene)
  key.diffuse = new Color3(0.78, 1, 0.3)
  key.intensity = 3.5
  const cyan = new PointLight('cyan-rim', new Vector3(-4, 1, 2), babylonScene)
  cyan.diffuse = new Color3(0.15, 0.8, 1)
  cyan.intensity = 3

  heroRoot = MeshBuilder.CreateBox('hero-root', { size: 0.01 }, babylonScene)
  heroRoot.isVisible = false
  const coreMat = new StandardMaterial('core-material', babylonScene)
  coreMat.diffuseColor = new Color3(0.67, 0.95, 0.16)
  coreMat.emissiveColor = new Color3(0.22, 0.65, 0.06)
  coreMat.specularColor = new Color3(0.8, 1, 0.5)
  const core = MeshBuilder.CreateIcoSphere('core', { radius: 1.15, subdivisions: 3 }, babylonScene)
  core.material = coreMat
  core.parent = heroRoot
  const coreHalo = MeshBuilder.CreateIcoSphere('core-halo', { radius: 1.32, subdivisions: 2 }, babylonScene)
  const haloMat = new StandardMaterial('halo-material', babylonScene)
  haloMat.wireframe = true
  haloMat.emissiveColor = new Color3(0.2, 0.8, 0.9)
  haloMat.alpha = 0.38
  coreHalo.material = haloMat
  coreHalo.parent = heroRoot

  const ringMat = new StandardMaterial('ring-material', babylonScene)
  ringMat.emissiveColor = new Color3(0.55, 0.92, 0.95)
  ringMat.diffuseColor = new Color3(0.1, 0.35, 0.42)
  for (let i = 0; i < 3; i += 1) {
    const ring = MeshBuilder.CreateTorus(`orbit-${i}`, { diameter: 3.2 + i * 0.65, thickness: 0.035 + i * 0.012, tessellation: 96 }, babylonScene)
    ring.material = ringMat
    ring.parent = heroRoot
    ring.rotation.x = 0.78 + i * 0.37
    ring.rotation.y = i * 0.7
    ring.rotation.z = i * 0.35
  }

  const cubeMat = new StandardMaterial('cube-material', babylonScene)
  cubeMat.emissiveColor = new Color3(0.58, 0.15, 0.95)
  cubeMat.diffuseColor = new Color3(0.18, 0.05, 0.27)
  for (let i = 0; i < 8; i += 1) {
    const cube = MeshBuilder.CreateBox(`satellite-${i}`, { size: 0.18 + (i % 3) * 0.06 }, babylonScene)
    const angle = (Math.PI * 2 * i) / 8
    cube.position = new Vector3(Math.cos(angle) * (2.1 + (i % 2) * 0.45), (i % 3 - 1) * 0.48, Math.sin(angle) * (2.1 + (i % 2) * 0.45))
    cube.material = cubeMat
    cube.parent = heroRoot
  }

  const floorMat = new StandardMaterial('floor-material', babylonScene)
  floorMat.wireframe = true
  floorMat.emissiveColor = new Color3(0.12, 0.24, 0.28)
  const grid = MeshBuilder.CreateGround('grid', { width: 12, height: 12, subdivisions: 18 }, babylonScene)
  grid.material = floorMat
  grid.position.y = -2.15
  grid.rotation.y = Math.PI / 8

  engine.runRenderLoop(() => {
    if (!babylonScene || !heroRoot || !camera) return
    const time = performance.now() * 0.00045
    heroRoot.rotation.y += 0.0028
    heroRoot.rotation.x = Math.sin(time * 1.4) * 0.08 + pointer.value.y * 0.24
    heroRoot.position.y += ((Math.min(scrollY.value * 0.003, 0.65) + pointer.value.y * 0.15) - heroRoot.position.y) * 0.035
    camera.alpha += ((-Math.PI / 2 + pointer.value.x * 0.48) - camera.alpha) * 0.035
    camera.beta += ((Math.PI / 2.4 + pointer.value.y * 0.12) - camera.beta) * 0.035
    babylonScene.render()
  })
}

onMounted(() => {
  updateScroll()
  createBabylonScene()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('pointermove', updatePointer, { passive: true })
  window.addEventListener('resize', () => engine?.resize())
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('pointermove', updatePointer)
  engine?.dispose()
  babylonScene?.dispose()
})
</script>

<template>
  <div class="site-shell">
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
        <div class="scene-wrap" aria-label="Babylon.js 三维展示"><canvas ref="canvas" class="babylon-canvas"></canvas><div class="scene-ui"><span class="float-label label-top">BABYLON / WEBGL</span><span class="float-label label-side">REAL-TIME<br />GEOMETRY</span><span class="float-label label-bottom">FUSSYZHY <b>•</b> 47082730</span></div><div class="scene-caption"><span>FIG. 01</span><span>3D / PERSONAL IDENTITY</span></div></div>
      </section>
      <div class="ticker" aria-label="兴趣标签"><div class="ticker-track"><span>CREATIVE CODE</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b><span>CREATIVE CODE</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b></div></div>
      <section id="work" class="work-section section-block"><div class="section-intro"><p class="kicker">02 / SELECTED WORK</p><h2>把想法，<br /><em>做成可以触摸的东西。</em></h2><p>我喜欢从一个模糊的念头出发，直到它变成一个有温度的界面、一段顺滑的动效，或一个能被更多人使用的工具。</p></div><div class="project-list"><a v-for="project in projects" :key="project.number" class="project-card" :class="`tone-${project.tone}`" href="#about"><div class="project-top"><span>{{ project.number }}</span><span>{{ project.type }}</span></div><div class="project-main"><div><h3>{{ project.title }}</h3><p>{{ project.copy }}</p></div><span class="project-mark">{{ project.mark }}</span></div><div class="project-bottom"><span>EXPLORE CASE <b>↗</b></span><span class="project-bar"></span></div></a></div></section>
      <section id="about" class="about-section section-block"><div class="about-portrait"><img :src="github.avatar" :alt="github.name" /><div class="portrait-stamp">H / Y<br /><small>MAKER<br />IN RESIDENCE</small></div></div><div class="about-copy"><p class="kicker">03 / A LITTLE ABOUT ME</p><h2>保持好奇，<br /><em>保持在场。</em></h2><p>我的工作横跨前端、交互和视觉设计。我相信好的技术应该让人忘记技术本身，只留下“这很顺手”的感觉。</p><p>工作之外，我会在城市里散步、拍照，或者打开一个新仓库，把脑子里的小问题慢慢做出来。</p><a class="button button-outline" :href="github.url" target="_blank" rel="noreferrer">查看我的 GitHub <span>↗</span></a></div><div class="stats"><div><strong>{{ github.repos }}</strong><span>PUBLIC REPOS</span></div><div><strong>{{ github.followers }}</strong><span>FOLLOWERS</span></div><div><strong>∞</strong><span>IDEAS IN PROGRESS</span></div></div></section>
    </main>
    <footer><div><span class="footer-mark">HY/24</span><span>© 2024 HaoYang</span></div><span>DESIGNED &amp; BUILT IN HANGZHOU</span><a :href="github.url" target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
  </div>
</template>
