<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine } from '@babylonjs/core/Engines/engine'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
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
  { number: '01', title: '个人主页重构', type: 'WEB / 2024', copy: '用 Vue、TypeScript 和 Babylon.js 做一个可以持续更新的个人空间。', tone: 'cyan', mark: '↗', tags: ['Vue', 'TypeScript', 'Babylon.js'] },
  { number: '02', title: '3D Identity Lab', type: 'EXPERIMENT / NOW', copy: '一组关于头像、几何体和光线的 WebGL 交互实验。', tone: 'violet', mark: '◌', tags: ['WebGL', 'Motion', 'Interaction'] },
  { number: '03', title: 'GitHub 开源记录', type: 'OPEN SOURCE / ONGOING', copy: '把日常写下来的工具、问题和解决方案整理成可以复用的内容。', tone: 'lime', mark: '✦', tags: ['Code', 'Notes', 'Community'] },
]

const journal = [
  { date: '2024.09', title: '开始重做自己的个人主页', copy: '把零散的实验整理成一个更清晰的入口。' },
  { date: '2024.08', title: '研究 Babylon.js 的材质与光照', copy: '记录实时 3D 场景里那些值得复用的小技巧。' },
  { date: '2024.06', title: '把一个小想法发布到 GitHub', copy: '从一个周末实验开始，慢慢补齐说明和使用方式。' },
]

const scrollY = ref(0)
const pointer = ref({ x: 0, y: 0 })
const activeSection = ref('home')
const scrollProgress = ref(0)
const scenePaused = ref(false)
const sceneTheme = ref(0)
const canvas = ref<HTMLCanvasElement | null>(null)
let engine: Engine | null = null
let babylonScene: Scene | null = null
let camera: ArcRotateCamera | null = null
let heroRoot: any = null
let sceneResize = () => engine?.resize()

function updateScroll() {
  scrollY.value = window.scrollY
  scrollProgress.value = Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1)
  const sections = ['home', 'work', 'journal', 'about']
  const current = sections.find((id) => {
    const el = document.getElementById(id)
    if (!el) return false
    const box = el.getBoundingClientRect()
    return box.top <= 140 && box.bottom > 140
  })
  if (current) activeSection.value = current
}

function toggleScene() { scenePaused.value = !scenePaused.value }
function changeSceneTheme() { sceneTheme.value = (sceneTheme.value + 1) % 3 }

function updatePointer(event: PointerEvent) {
  pointer.value = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }
}

function createBabylonScene() {
  if (!canvas.value) return
  engine = new Engine(canvas.value, true, { preserveDrawingBuffer: true, stencil: true, antialias: true, alpha: true })
  babylonScene = new Scene(engine)
  babylonScene.clearColor = new Color4(0, 0, 0, 0)
  camera = new ArcRotateCamera('hero-camera', -Math.PI / 2, Math.PI / 2.35, 8.6, Vector3.Zero(), babylonScene)
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
  coreMat.diffuseColor = new Color3(0.45, 0.8, 0.18)
  coreMat.emissiveColor = new Color3(0.1, 0.34, 0.04)
  coreMat.specularColor = new Color3(0.8, 1, 0.5)
  const core = MeshBuilder.CreateIcoSphere('core', { radius: 1.2, subdivisions: 3 }, babylonScene)
  core.material = coreMat
  core.parent = heroRoot

  const portrait = MeshBuilder.CreatePlane('portrait', { width: 1.78, height: 2.05 }, babylonScene)
  const portraitMat = new StandardMaterial('portrait-material', babylonScene)
  portraitMat.diffuseTexture = new Texture(github.avatar, babylonScene, true, false)
  portraitMat.emissiveColor = new Color3(0.28, 0.28, 0.28)
  portraitMat.specularColor = new Color3(0.1, 0.1, 0.1)
  portrait.position = new Vector3(-1.28, -0.22, 0.22)
  portrait.billboardMode = Mesh.BILLBOARDMODE_ALL
  portrait.scaling.setAll(0.72)
  portrait.parent = heroRoot

  const coreHalo = MeshBuilder.CreateIcoSphere('core-halo', { radius: 1.36, subdivisions: 2 }, babylonScene)
  const haloMat = new StandardMaterial('halo-material', babylonScene)
  haloMat.wireframe = true
  haloMat.emissiveColor = new Color3(0.2, 0.8, 0.9)
  haloMat.alpha = 0.38
  coreHalo.material = haloMat
  coreHalo.parent = heroRoot

  const ringMat = new StandardMaterial('ring-material', babylonScene)
  ringMat.emissiveColor = new Color3(0.55, 0.92, 0.95)
  ringMat.diffuseColor = new Color3(0.1, 0.35, 0.42)
  for (let i = 0; i < 2; i += 1) {
    const ring = MeshBuilder.CreateTorus(`orbit-${i}`, { diameter: 3.1 + i * 0.7, thickness: 0.028 + i * 0.012, tessellation: 96 }, babylonScene)
    ring.material = ringMat
    ring.parent = heroRoot
    ring.rotation.x = 0.82 + i * 0.45
    ring.rotation.y = i * 0.8
    ring.rotation.z = i * 0.42
  }

  const particleMat = new StandardMaterial('particle-material', babylonScene)
  particleMat.emissiveColor = new Color3(0.78, 0.95, 0.28)
  particleMat.diffuseColor = new Color3(0.2, 0.3, 0.08)
  for (let i = 0; i < 28; i += 1) {
    const particle = MeshBuilder.CreateIcoSphere(`particle-${i}`, { radius: i % 4 === 0 ? 0.05 : 0.025, subdivisions: 1 }, babylonScene)
    const angle = (Math.PI * 2 * i) / 28
    const radius = 2.05 + (i % 5) * 0.18
    particle.position = new Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.8) * 1.35, Math.sin(angle) * radius)
    particle.material = particleMat
    particle.parent = heroRoot
  }

  engine.runRenderLoop(() => {
    if (!babylonScene || !heroRoot || !camera) return
    const time = performance.now() * 0.00045
    const heroHeight = document.getElementById('home')?.getBoundingClientRect().height || window.innerHeight
    const progress = Math.min(scrollY.value / Math.max(heroHeight * 0.9, 1), 1)
    if (!scenePaused.value) heroRoot.rotation.y += 0.0018
    heroRoot.rotation.x = Math.sin(time * 1.1) * 0.055 + pointer.value.y * 0.16
    heroRoot.position.x += ((progress * -0.85 + pointer.value.x * 0.12) - heroRoot.position.x) * 0.035
    heroRoot.position.y += ((progress * 0.55 + pointer.value.y * 0.12) - heroRoot.position.y) * 0.035
    heroRoot.scaling.setAll(1 - progress * 0.22)
    camera.alpha += ((-Math.PI / 2 + pointer.value.x * 0.48) - camera.alpha) * 0.035
    camera.beta += ((Math.PI / 2.35 + pointer.value.y * 0.1 + progress * 0.08) - camera.beta) * 0.035
    camera.radius += ((8.6 + progress * 1.2) - camera.radius) * 0.035
    const palettes = [new Color3(0.45, 0.8, 0.18), new Color3(0.65, 0.32, 1), new Color3(1, 0.38, 0.18)]
    coreMat.diffuseColor = palettes[sceneTheme.value]
    coreMat.emissiveColor = palettes[sceneTheme.value].scale(0.28)
    babylonScene.render()
  })
}

onMounted(() => {
  updateScroll()
  createBabylonScene()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('pointermove', updatePointer, { passive: true })
  sceneResize = () => engine?.resize()
  window.addEventListener('resize', sceneResize)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('pointermove', updatePointer)
  window.removeEventListener('resize', sceneResize)
  engine?.dispose()
  babylonScene?.dispose()
})
</script>

<template>
  <div class="site-shell" :style="{ '--scroll-progress': `${scrollProgress * 100}%` }">
    <div class="noise" aria-hidden="true"></div>
    <header class="topbar">
      <a class="wordmark" href="#home" aria-label="回到首页">HY<span>/</span>24</a>
      <nav aria-label="主导航">
        <a href="#home" :class="{ active: activeSection === 'home' }">首页</a>
        <a href="#work" :class="{ active: activeSection === 'work' }">项目</a>
        <a href="#journal" :class="{ active: activeSection === 'journal' }">记录</a>
        <a href="#about" :class="{ active: activeSection === 'about' }">关于</a>
      </nav>
      <a class="github-link" :href="github.url" target="_blank" rel="noreferrer"><span class="github-dot"></span> GitHub <span class="arrow">↗</span></a>
    </header>
    <main>
      <section id="home" class="home-section page-section">
        <div class="home-copy">
          <p class="kicker"><span class="pulse-dot"></span> Frontend developer · Hangzhou</p>
          <h1>你好，我是<br /><span>HaoYang</span><i>.</i></h1>
          <p class="hero-lead">我做界面、交互和创意技术。这个页面是我的个人入口，也是一份持续更新的工作记录。</p>
          <div class="hero-actions"><a class="button button-solid" href="#work">看我的项目 <span>↓</span></a><a class="text-link" :href="github.url" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div>
          <div class="home-facts"><span><b>01</b> 目前在杭州</span><span><b>02</b> 使用 Vue / TypeScript</span><span><b>03</b> 喜欢把想法做出来</span></div>
        </div>
        <div class="home-visual"><div class="profile-card"><div class="profile-card-head"><span>PROFILE / 01</span><span class="status"><span class="pulse-dot"></span> ONLINE</span></div><img :src="github.avatar" :alt="github.name" /><div class="profile-card-info"><strong>{{ github.name }}</strong><span>Frontend developer</span><small>{{ github.location }}</small></div><div class="profile-card-foot"><span>VUE · TS · WEBGL</span><span>↗</span></div></div><div class="scene-mini" aria-label="Babylon.js 三维展示"><canvas ref="canvas" class="babylon-canvas" @click="changeSceneTheme"></canvas><span class="scene-note">A SMALL 3D STUDY<br />FOR THIS PAGE</span><button class="scene-toggle" type="button" @click="toggleScene">{{ scenePaused ? '继续旋转' : '暂停旋转' }}</button></div></div>
      </section>

      <section id="work" class="projects-section page-section">
        <div class="section-heading"><div><p class="kicker">02 / PROJECTS</p><h2>真实做过的，<br /><em>正在做的。</em></h2></div><p>这里放值得被打开的项目。每个条目都应该有明确的用途、技术和结果，之后可以逐个替换成你的真实链接。</p></div>
        <div class="project-grid"><a v-for="project in projects" :key="project.number" class="project-card project-card-new" :class="`tone-${project.tone}`" :href="github.url" target="_blank" rel="noreferrer"><div class="project-top"><span>{{ project.number }}</span><span>{{ project.type }}</span></div><div class="project-main"><div><h3>{{ project.title }}</h3><p>{{ project.copy }}</p></div><span class="project-mark">{{ project.mark }}</span></div><div class="project-tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div><div class="project-bottom"><span>VIEW ON GITHUB <b>↗</b></span><span class="project-bar"></span></div></a></div>
      </section>

      <section id="journal" class="journal-section page-section"><div class="section-heading journal-heading"><div><p class="kicker">03 / JOURNAL</p><h2>最近的<br /><em>记录。</em></h2></div><p>不定期记下一些正在学习、测试和思考的东西。它们不需要完整，但会让这里一直有新的内容。</p></div><div class="journal-list"><article v-for="entry in journal" :key="entry.date" class="journal-entry"><time>{{ entry.date }}</time><div><h3>{{ entry.title }}</h3><p>{{ entry.copy }}</p></div><span class="entry-arrow">↗</span></article></div></section>

      <section id="about" class="about-contact page-section"><div class="about-block"><p class="kicker">04 / ABOUT &amp; CONTACT</p><h2>保持好奇，<br /><em>把事情做好。</em></h2><p>我目前在杭州，主要做前端开发和交互体验。喜欢从一个模糊的想法开始，和设计、产品一起把它变成真正能用的东西。</p><p>如果你想聊项目、技术，或者只是交换一个有趣的想法，可以在 GitHub 找到我。</p></div><div class="contact-block"><span class="contact-label">FIND ME ONLINE</span><a :href="github.url" target="_blank" rel="noreferrer"><strong>github.com/{{ github.handle }}</strong><span>↗</span></a><div class="contact-details"><span>{{ github.location }}</span><span>OPEN TO GOOD IDEAS</span></div></div></section>
    </main>
    <footer><div><span class="footer-mark">HY/24</span><span>© 2024 HaoYang</span></div><span>DESIGNED &amp; BUILT IN HANGZHOU</span><a :href="github.url" target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
  </div>
</template>
