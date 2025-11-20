import { LinkCategory, Quote } from './types';

export const QUOTES: Quote[] = [
  { text: "生活原本沉闷，但跑起来就有风。", author: "刘宇" },
  { text: "满怀希望，就会所向披靡。", author: "宫崎骏" },
  { text: "且视他人之疑目如盏盏鬼火，大胆地去走你的夜路。", author: "史铁生" },
  { text: "热爱可抵岁月漫长。", author: "佚名" },
  { text: "保持热爱，奔赴山海。", author: "未知" },
];

export const NAV_DATA: LinkCategory[] = [
  {
    id: 'personal',
    title: '我的收藏',
    icon: '⭐',
    links: [
      { id: 'p1', name: '搜索导航', desc: 'Bing Search', url: 'https://www.bing.com', icon: '🏠', color: 'bg-blue-100 text-blue-600' },
      { id: 'p2', name: '代码仓库', desc: 'GitHub Profile', url: 'https://github.com', icon: '🐙', color: 'bg-gray-100 text-gray-800' },
      { id: 'p3', name: 'Bilibili', desc: '干杯 🍻', url: 'https://www.bilibili.com/', icon: '📺', color: 'bg-pink-100 text-pink-500' },
      { id: 'p4', name: 'QQ邮箱', desc: '邮件直达', url: 'https://wx.mail.qq.com/', icon: '✉️', color: 'bg-yellow-100 text-yellow-600' },
      { id: 'p5', name: '图床', desc: 'Image Hosting', url: 'https://telegraph-image-eil.pages.dev/', icon: '🖼️', color: 'bg-purple-100 text-purple-600' },
      { id: 'p6', name: 'ChatGPT', desc: 'AI 助手', url: 'https://chatgpt.com/', icon: '🤖', color: 'bg-emerald-100 text-emerald-600' },
      { id: 'p7', name: '三国杀', desc: '烧脑益智', url: 'https://my.4399.com/yxsgs/', icon: '🃏', color: 'bg-red-100 text-red-600' },
      { id: 'p8', name: '学习通', desc: 'Online Study', url: 'https://i.chaoxing.com/', icon: '📚', color: 'bg-indigo-100 text-indigo-600' },
    ]
  },
  {
    id: 'dev',
    title: '开发工具',
    icon: '🛠️',
    links: [
      { id: 'd1', name: 'V2EX', desc: '创意工作者社区', url: 'https://www.v2ex.com/', icon: '💬', color: 'bg-slate-100 text-slate-600' },
      { id: 'd2', name: '掘金', desc: '技术社区', url: 'https://juejin.cn/', icon: '💎', color: 'bg-blue-100 text-blue-600' },
      { id: 'd3', name: 'StackOverflow', desc: '问题解答', url: 'https://stackoverflow.com/', icon: '🧱', color: 'bg-orange-100 text-orange-600' },
      { id: 'd4', name: 'Canva', desc: '在线设计', url: 'https://www.canva.com/', icon: '🎨', color: 'bg-cyan-100 text-cyan-600' },
    ]
  },
  {
    id: 'daily',
    title: '摸鱼必备',
    icon: '☕',
    links: [
      { id: 'e1', name: 'YouTube', desc: '视频世界', url: 'https://www.youtube.com/', icon: '▶️', color: 'bg-red-100 text-red-600' },
      { id: 'e2', name: '知乎', desc: '发现更大的世界', url: 'https://www.zhihu.com/', icon: '🧠', color: 'bg-blue-100 text-blue-600' },
      { id: 'e3', name: '微博', desc: '随时随地发现新鲜事', url: 'https://weibo.com/', icon: '👁️', color: 'bg-orange-100 text-orange-600' },
      { id: 'e4', name: '豆瓣', desc: '电影书籍', url: 'https://www.douban.com/', icon: '🥑', color: 'bg-green-100 text-green-600' },
    ]
  }
];