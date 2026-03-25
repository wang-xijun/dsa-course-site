import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import InteractiveFrame from './components/InteractiveFrame.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('InteractiveFrame', InteractiveFrame)
  }
} satisfies Theme
