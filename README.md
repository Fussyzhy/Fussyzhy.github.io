# 昊阳 / HaoYang — 个人网站

全栈开发者的个人主页与项目档案。用 Vue 3 + TypeScript + Vite 手写，部署在 GitHub Pages。

## 页面结构

- **Hero** — 姓名排版、简介、关键数据与头像卡片（含指针倾斜与旋转徽章）
- **精选项目** — 6 个代表项目，悬停出现跟随光标的预览卡
- **全部项目** — 20 个公开仓库，按「桌面 / Web / 游戏 / 汉化 / 实验」筛选，带动画重排
- **关于** — 简介、技术栈、2024—2026 时间线
- **联系** — 邮箱一键复制、状态信息

## 交互细节

自定义光标（`VIEW` / `OPEN` 状态）、滚动进度与隐藏式导航、`IntersectionObserver` 逐段显隐、磁吸按钮、数字滚动、指针驱动卡片倾斜、页脚杭州实时时钟。全部动效尊重 `prefers-reduced-motion`。

## 开发

```bash
yarn install
yarn dev      # http://127.0.0.1:25555
yarn build
yarn preview
```

## 目录

```
src/
  data/projects.ts        个人资料、20 个项目、技术栈、时间线
  composables/            v-reveal / v-magnetic 指令
  components/             Hero、精选、归档、关于、联系、页头页脚、光标
  style.css               设计系统与基础样式
public/
  avatar.jpg              自托管头像
  fonts/                  Instrument Serif + JetBrains Mono（自托管 woff2）
```

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。
