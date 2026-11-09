<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { site } from '../data/site'
import AppIcon from './AppIcon.vue'
import SectionHead from './SectionHead.vue'

const copied = ref(false)
let timer = 0

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
  } catch {
    const input = document.createElement('textarea')
    input.value = site.email
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }
  copied.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    copied.value = false
  }, 1800)
}

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <section id="contact" class="section">
    <SectionHead
      index="04 / Contact"
      icon="mail"
      title="聊聊吧"
      desc="项目合作、技术交流，或者只是想说声嗨——邮件是最快能找到我的方式。"
    />

    <div class="card contact-card" v-reveal>
      <div class="contact-main">
        <p class="contact-lead">有个想法，<span>或者只是想打个招呼？</span></p>
        <div class="contact-row">
          <a class="contact-email" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <button
            type="button"
            class="copy-btn"
            :class="{ 'is-copied': copied }"
            @click="copyEmail"
          >
            <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />
            {{ copied ? '已复制到剪贴板' : '复制邮箱地址' }}
          </button>
        </div>
      </div>

      <dl class="contact-meta">
        <div class="contact-meta-item">
          <dt>Location</dt>
          <dd>{{ site.location }}</dd>
        </div>
        <div class="contact-meta-item">
          <dt>Status</dt>
          <dd><i class="status-dot" aria-hidden="true"></i>可接受新的机会</dd>
        </div>
        <div class="contact-meta-item">
          <dt>GitHub</dt>
          <dd>
            <a :href="site.github" target="_blank" rel="noreferrer">{{ site.handle }} ↗</a>
          </dd>
        </div>
        <div class="contact-meta-item">
          <dt>Response</dt>
          <dd>通常 24 小时内</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  padding: 30px 32px 24px;
}
.contact-main {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.contact-lead {
  font-family: var(--serif);
  font-size: clamp(24px, 3.3vw, 32px);
  font-weight: 600;
  line-height: 1.45;
}
.contact-lead span {
  color: var(--muted);
  font-weight: 500;
}
.contact-row {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.contact-email {
  font-family: var(--serif);
  font-size: clamp(24px, 3.4vw, 38px);
  font-weight: 500;
  color: var(--text);
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 3px;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}
.contact-email:hover {
  color: var(--primary);
  border-color: var(--primary);
}
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-2);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}
.copy-btn:hover {
  color: var(--primary);
  border-color: var(--line-strong);
  background: var(--hover);
}
.copy-btn.is-copied {
  color: var(--green);
  border-color: var(--green);
}
.contact-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.contact-meta-item dt {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.contact-meta-item dd {
  margin: 7px 0 0;
  font-size: 13px;
  color: var(--text-2);
  display: flex;
  align-items: center;
  gap: 7px;
}
.contact-meta-item dd a:hover {
  color: var(--primary);
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px color-mix(in srgb, var(--green) 60%, transparent);
}
@media (max-width: 760px) {
  .contact-card {
    padding: 22px 20px 18px;
  }
  .contact-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 460px) {
  .contact-meta {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
