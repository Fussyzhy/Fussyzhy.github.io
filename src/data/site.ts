export const site = {
  name: '昊阳',
  latin: 'HaoYang',
  handle: 'Fussyzhy',
  title: '昊阳的小站',
  slogan: 'Still building.',
  subtitle: '把想法做成能真正运行的产品',
  role: '全栈开发者',
  location: '杭州，中国',
  email: '2233832509@qq.com',
  github: 'https://github.com/Fussyzhy',
  since: 2019,
}

export interface Quote {
  text: string
  source: string
}

export const quotes: Quote[] = [
  { text: '先让它跑起来，再回头把它做干净。', source: '— 昊阳' },
  { text: '保持好奇，把事情做好。', source: '— 昊阳' },
  { text: '做一个真正能被用起来的东西。', source: '— 昊阳' },
]

export const techIcons = [
  { name: 'Vue 3', icon: '/icons/vue.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Node.js', icon: '/icons/node.svg' },
  { name: 'NestJS', icon: '/icons/nestjs.svg' },
  { name: 'Electron', icon: '/icons/electron.svg' },
  { name: 'Cocos Creator', icon: '/icons/cocos.svg' },
  { name: 'MySQL', icon: '/icons/mysql.svg' },
  { name: 'Redis', icon: '/icons/redis.svg' },
]

export const prologueLinks = [
  { label: '项目橱窗', href: '#work', icon: 'folder', color: 'var(--primary)' },
  { label: '全部项目', href: '#archive', icon: 'grid', color: 'var(--cyan)' },
  { label: '关于我', href: '#about', icon: 'user', color: 'var(--pink)' },
  { label: '联系我', href: '#contact', icon: 'mail', color: 'var(--red)' },
]

export const navItems = [
  { id: 'work', label: '精选项目', href: '#work', icon: 'folder' },
  { id: 'archive', label: '全部项目', href: '#archive', icon: 'grid' },
  { id: 'about', label: '关于我', href: '#about', icon: 'user' },
  { id: 'contact', label: '联系我', href: '#contact', icon: 'mail' },
]
