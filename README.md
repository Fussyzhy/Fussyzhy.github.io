# 昊阳的小站 · HaoYang

全栈开发者的个人主页与项目档案。深色网格底、居中聚光灯开屏、彩色图标阵列与卡片式项目流，支持明暗主题切换。

## 页面结构

- **Prologue** — 100vh 聚光开屏：圆形头像 + 站点卡片（`昊阳的小站 / Still building.`）+ 技术图标阵列 + 彩色页内导航 + 打字机语录 + 向下箭头
- **精选项目** — 6 个代表项目卡片，含年份 / star / 语言 / 分类 / 标签与仓库链接
- **全部项目** — 20 个公开仓库，按「桌面 / Web / 游戏 / 汉化 / 实验」筛选，切换带 FLIP 动画
- **关于** — 简介、技术栈分组、2019—2026 时间线
- **联系** — 邮箱一键复制、状态与位置信息

## 视觉与交互

- 深色 `#111114` + 40px 网格（仅开屏区域）+ 顶部彩色雾光；浅色主题为天蓝/粉色柔光
- 明暗主题切换，写入 `localStorage`，刷新不闪白
- 中文标题使用 Noto Serif SC（按需子集），正文 DM Sans，标签 JetBrains Mono
- 打字机语录轮播、滚动逐段显隐（带快速滚动兜底）、点击粒子、回到顶部、移动端全屏菜单、卡片 hover
- 所有动效尊重 `prefers-reduced-motion`

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
  data/projects.ts        20 个项目、技术栈、时间线
  data/site.ts            站点信息、语录、技术图标、导航
  composables/            v-reveal 指令、主题状态
  components/             开屏、导航、卡片、各区块、页脚、粒子
  style.css               主题变量与基础样式
public/
  avatar.jpg              自托管头像
  icons/                  技术栈品牌图标
  fonts/                  DM Sans / Noto Serif SC 子集 / JetBrains Mono
```

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。
