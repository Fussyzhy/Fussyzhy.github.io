import type { Directive } from 'vue'

const cleanups = new WeakMap<HTMLElement, () => void>()

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * v-magnetic — 鼠标在元素附近时产生轻微磁吸位移。
 * 可用 `data-magnetic="18"` 调整位移幅度（像素）。
 */
export const vMagnetic: Directive<HTMLElement> = {
  mounted(el) {
    if (!canHover()) return
    const strength = Number(el.dataset.magnetic ?? 10)
    const amount = Number.isFinite(strength) ? strength : 10

    el.classList.add('is-magnetic')

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      el.style.setProperty('--magnet-x', `${(x * amount).toFixed(2)}px`)
      el.style.setProperty('--magnet-y', `${(y * amount).toFixed(2)}px`)
    }

    const leave = () => {
      el.style.setProperty('--magnet-x', '0px')
      el.style.setProperty('--magnet-y', '0px')
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.set(el, () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
