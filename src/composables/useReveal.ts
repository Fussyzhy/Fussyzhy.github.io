import type { Directive } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()
let fallbackBound = false

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 快速滚动时 IntersectionObserver 可能漏掉元素，这里兜底把已经越过的元素补上。 */
function bindFallback() {
  if (fallbackBound) return
  fallbackBound = true
  let timer = 0
  window.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.will-reveal:not(.is-revealed)').forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight) {
            el.classList.add('is-revealed')
          }
        })
      }, 160)
    },
    { passive: true },
  )
}

/**
 * v-reveal — 元素进入视口时播放一次上浮淡入。
 * 可用 `data-delay="120"` 指定延迟（毫秒）。
 */
export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (reducedMotion()) {
      el.classList.add('is-revealed')
      return
    }
    bindFallback()
    const delay = Number(el.dataset.delay ?? 0)
    el.style.setProperty('--reveal-delay', `${Number.isFinite(delay) ? delay : 0}ms`)
    el.classList.add('will-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.classList.add('is-revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
