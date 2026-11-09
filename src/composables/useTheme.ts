import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')
let initialized = false

export function useTheme() {
  const apply = (next: Theme) => {
    theme.value = next
    document.documentElement.dataset.theme = next
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = next === 'light' ? '#f6f8fc' : '#111114'
    try {
      localStorage.setItem('hy-theme', next)
    } catch {
      /* ignore */
    }
  }

  const init = () => {
    if (initialized) return
    initialized = true
    let stored: string | null = null
    try {
      stored = localStorage.getItem('hy-theme')
    } catch {
      stored = null
    }
    apply(stored === 'light' ? 'light' : 'dark')
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  return { theme, init, toggle }
}
