<script setup lang="ts">
import { computed, ref } from 'vue'
type Post = { title: string; excerpt: string; date: string; read: string; tag: string; color: string }
const activeTag = ref('全部'); const search = ref(''); const email = ref(''); const subscribed = ref(false)
const posts: Post[] = [
  { title: '把复杂的事情讲简单，是一种能力', excerpt: '最近在做一个数据产品，重新思考了「清晰」这件事。好的设计不是增加更多，而是删掉不必要的选择。', date: '2024.06.18', read: '8 min read', tag: '思考', color: '#f2c14e' },
  { title: '我的年度阅读清单：从输入到行动', excerpt: '记录过去一年真正影响过我的 12 本书，以及它们如何悄悄改变了我的工作方式。', date: '2024.05.26', read: '6 min read', tag: '生活', color: '#9ec5ab' },
  { title: '一名前端开发者的工具箱', excerpt: '那些让我每天都更快一点、更专注一点的工具、习惯和工作流。', date: '2024.04.09', read: '10 min read', tag: '技术', color: '#d98e73' },
  { title: '在城市里寻找一点松弛感', excerpt: '周末去了几个安静的地方，带着相机，也带着不赶时间的自己。', date: '2024.03.11', read: '4 min read', tag: '生活', color: '#9bb7d4' },
  { title: '从 0 到 1 做一个个人网站', excerpt: '分享我的搭建过程、踩坑记录，以及为什么我最终选择了简单的方案。', date: '2024.02.02', read: '12 min read', tag: '技术', color: '#c4a7e7' },
  { title: '写给正在迷茫的你', excerpt: '没有标准答案的时候，先去做一件具体的小事。', date: '2024.01.15', read: '5 min read', tag: '思考', color: '#e8a0bf' },
]
const tags = ['全部', '思考', '技术', '生活']
const filteredPosts = computed(() => posts.filter(post => { const matchTag = activeTag.value === '全部' || post.tag === activeTag.value; const q = search.value.trim().toLowerCase(); return matchTag && (!q || `${post.title}${post.excerpt}`.toLowerCase().includes(q)) }))
function subscribe() { if (email.value.trim()) subscribed.value = true }
</script>

<template>
  <div class="page-shell"><header class="topbar"><a class="brand" href="#top">HJ<span>.</span></a><nav><a href="#articles">文章</a><a href="#about">关于我</a><a href="#now">订阅</a></nav><a class="contact" href="https://github.com/Fussyzhy" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></header>
    <main id="top"><section class="hero" id="about"><div class="hero-copy"><p class="eyebrow">你好，我是韩江 <span>👋</span></p><h1>记录思考，<br /><em>分享成长。</em></h1><p class="intro">一名独立开发者和设计爱好者。这里记录我的所见、所学，以及那些值得反复思考的小事。</p><a class="primary-btn" href="#articles">阅读我的文章 <span>↓</span></a></div><div class="portrait"><div class="portrait-bg"></div><div class="portrait-card"><span class="sun">✦</span><span class="scribble">stay curious</span></div></div></section>
      <section class="featured"><div class="section-label">精选文章 <span>FEATURED</span></div><article class="feature-card"><div class="feature-art"><div class="art-circle"></div><div class="art-text">MAKE<br />ROOM<br /><small>FOR IDEAS</small></div></div><div class="feature-body"><div class="meta"><span class="tag">思考</span><span>2024.06.18&nbsp; · &nbsp;8 min read</span></div><h2>把复杂的事情讲简单，是一种能力</h2><p>最近在做一个数据产品，重新思考了「清晰」这件事。好的设计不是增加更多，而是删掉不必要的选择。</p><a class="read-link" href="#articles">阅读全文 <span>→</span></a></div></article></section>
      <section class="articles" id="articles"><div class="articles-head"><div><div class="section-label">全部文章 <span>ARCHIVE</span></div><h2>最近的记录</h2></div><div class="tools"><input v-model="search" aria-label="搜索文章" placeholder="搜索文章..." /><div class="filters"><button v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" @click="activeTag = tag">{{ tag }}</button></div></div></div><div class="post-grid"><article v-for="post in filteredPosts" :key="post.title" class="post-card"><div class="post-image" :style="{ background: post.color }"><span>{{ post.tag }}</span><b>✳</b></div><div class="post-content"><div class="post-meta">{{ post.date }} <i>·</i> {{ post.read }}</div><h3>{{ post.title }}</h3><p>{{ post.excerpt }}</p><a class="read-link" href="#top">阅读更多 <span>→</span></a></div></article></div><p v-if="!filteredPosts.length" class="empty">没有找到相关文章，换个关键词试试。</p></section>
      <section class="newsletter" id="now"><div><div class="section-label">订阅通讯 <span>NEWSLETTER</span></div><h2>把新文章寄给你。</h2><p>不定期更新，关于设计、技术和生活的思考。保持联系，但不打扰。</p></div><form @submit.prevent="subscribe"><div class="input-wrap"><input v-model="email" type="email" required placeholder="你的邮箱地址" /><button aria-label="订阅">→</button></div><small v-if="subscribed" class="success">订阅成功，感谢你的关注！</small><small v-else>我们尊重你的收件箱，随时可以退订。</small></form></section></main>
    <footer><span>© 2026 韩江</span><span>Built with curiosity &amp; coffee</span><div><a href="https://github.com/Fussyzhy" target="_blank" rel="noreferrer">GitHub</a><a href="#top">返回顶部</a></div></footer></div>
</template>
