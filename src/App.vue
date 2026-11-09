<script setup lang="ts">
import AboutCard from './components/AboutCard.vue'
import ArchiveGrid from './components/ArchiveGrid.vue'
import BackToTop from './components/BackToTop.vue'
import ContactCard from './components/ContactCard.vue'
import FeaturedFeed from './components/FeaturedFeed.vue'
import PrologueHero from './components/PrologueHero.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'
import Sparkles from './components/Sparkles.vue'
</script>

<template>
  <a class="skip-link" href="#work">跳到项目内容</a>

  <SiteNav />

  <main id="top" class="site-main">
    <PrologueHero />
    <div class="content">
      <FeaturedFeed />
      <ArchiveGrid />
      <AboutCard />
      <ContactCard />
    </div>
  </main>

  <SiteFooter />
  <BackToTop />
  <Sparkles />
</template>
