import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoLinkCard from './components/DemoLinkCard.vue'
import InteractiveFrame from './components/InteractiveFrame.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoLinkCard', DemoLinkCard)
    app.component('InteractiveFrame', InteractiveFrame)
  }
} satisfies Theme
