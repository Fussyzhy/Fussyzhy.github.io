import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 用户主页仓库用 /
  server: {
    port: 25555, // 修改为你想要的端口
  },
})
