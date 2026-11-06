<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import CursorFollower from './components/CursorFollower.vue'
import FeaturedWork from './components/FeaturedWork.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectArchive from './components/ProjectArchive.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import TickerMarquee from './components/TickerMarquee.vue'

const loading = ref(true)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loading.value = false
    return
  }
  window.setTimeout(() => {
    loading.value = false
  }, 900)
})
</script>

<template>
  <a class="skip-link" href="#work">跳到项目内容</a>

  <div class="grain" aria-hidden="true"></div>

  <Transition name="curtain">
    <div v-if="loading" class="curtain" aria-hidden="true">
      <div class="curtain-inner">
        <span class="curtain-name">HaoYang</span>
        <span class="curtain-line"></span>
        <span class="curtain-meta">PORTFOLIO / HANGZHOU</span>
      </div>
    </div>
  </Transition>

  <CursorFollower />
  <SiteHeader />

  <main id="top" class="site-main">
    <HeroSection />
    <TickerMarquee />
    <FeaturedWork />
    <ProjectArchive />
    <AboutSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
