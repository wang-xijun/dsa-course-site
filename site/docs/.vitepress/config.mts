import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '数据结构与算法',
  description: '教材、课堂材料与交互演示站点',
  base,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教材', link: '/book/' },
      { text: '交互演示', link: '/interactive/' }
    ],
    sidebar: {
      '/book/': [
        {
          text: '教材',
          items: [
            { text: '总览', link: '/book/' },
            { text: '第 2 章 算法复杂度', link: '/book/ch02-algorithm-complexity' }
          ]
        }
      ],
      '/interactive/': [
        {
          text: '交互演示',
          items: [
            { text: '总览', link: '/interactive/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    footer: {
      message: '面向 AI Coding 时代的数据结构与算法课程',
      copyright: 'Copyright © littleKing'
    }
  }
})
