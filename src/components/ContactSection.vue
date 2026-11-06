<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '../data/projects'

const copied = ref(false)
let timer = 0

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
  } catch {
    const input = document.createElement('textarea')
    input.value = profile.email
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
</script>

<template>
  <section id="contact" class="section contact">
    <div class="section-inner">
      <header class="section-head" v-reveal>
        <div>
          <div class="section-label">
            <span class="section-index">04</span>
            <span>Contact</span>
          </div>
          <h2 class="section-title">聊聊吧<span class="accent">.</span></h2>
        </div>
        <p class="section-desc">
          项目合作、技术交流，或者只是想说声嗨——邮件是最快能找到我的方式。
        </p>
      </header>

      <div class="contact-main">
        <p class="contact-lead" v-reveal>
          有个想法，<br />
          <span>或者只是想打个招呼？</span>
        </p>

        <div class="contact-email-block" v-reveal data-delay="90">
          <a
            class="contact-email"
            v-magnetic
            data-magnetic="16"
            :href="`mailto:${profile.email}`"
            data-cursor="link"
          >
            {{ profile.email }}
            <span class="email-underline" aria-hidden="true"></span>
          </a>
          <button type="button" class="copy-button" :class="{ 'is-copied': copied }" @click="copyEmail">
            <span class="copy-icon" aria-hidden="true">{{ copied ? '✓' : '⧉' }}</span>
            {{ copied ? '已复制到剪贴板' : '复制邮箱地址' }}
          </button>
        </div>
      </div>

      <dl class="contact-meta">
        <div class="contact-meta-item" v-reveal>
          <dt>Location</dt>
          <dd>{{ profile.location }}</dd>
        </div>
        <div class="contact-meta-item" v-reveal data-delay="60">
          <dt>Status</dt>
          <dd><span class="status-dot" aria-hidden="true"></span>可接受新的机会</dd>
        </div>
        <div class="contact-meta-item" v-reveal data-delay="120">
          <dt>GitHub</dt>
          <dd>
            <a class="link-sweep" :href="profile.github" target="_blank" rel="noreferrer">
              Fussyzhy ↗
            </a>
          </dd>
        </div>
        <div class="contact-meta-item" v-reveal data-delay="180">
          <dt>Response</dt>
          <dd>通常 24 小时内</dd>
        </div>
      </dl>

      <span class="contact-mark" aria-hidden="true">✳</span>
    </div>
  </section>
</template>

<style scoped>
.contact .section-inner {
  position: relative;
}
.contact-main {
  display: flex;
  flex-direction: column;
  gap: clamp(26px, 4vh, 40px);
  padding: clamp(10px, 2vh, 20px) 0 clamp(48px, 8vh, 84px);
}
.contact-lead {
  font-size: clamp(34px, 5.4vw, 74px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.055em;
}
.contact-lead span {
  color: var(--muted);
}
.contact-email-block {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 36px);
  flex-wrap: wrap;
}
.contact-email {
  position: relative;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(26px, 4.6vw, 62px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  padding-bottom: 6px;
}
.email-underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--line-strong);
}
.email-underline::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.contact-email:hover .email-underline::after {
  transform: scaleX(1);
  transform-origin: left center;
}
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    background 0.3s ease;
}
.copy-button:hover {
  border-color: var(--ink);
  color: var(--ink);
}
.copy-button.is-copied {
  border-color: var(--accent);
  color: var(--accent);
}
.copy-icon {
  font-size: 11px;
}
.contact-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.contact-meta-item {
  padding: 18px 20px 22px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.contact-meta-item dt {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.contact-meta-item dd {
  margin: 8px 0 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.contact-meta-item .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.contact-mark {
  position: absolute;
  right: var(--gutter);
  top: clamp(64px, 10vh, 124px);
  font-size: clamp(28px, 4vw, 52px);
  color: var(--accent);
  animation: mark-spin 18s linear infinite;
  line-height: 1;
}
@keyframes mark-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 860px) {
  .contact-meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .contact-mark {
    display: none;
  }
}
@media (max-width: 560px) {
  .contact-meta {
    grid-template-columns: minmax(0, 1fr);
  }
  .contact-email-block {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
