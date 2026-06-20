import type { Theme } from 'vitepress'
import Layout from '@2bab/minibook-kit/theme/Layout.vue'
import ImageZoom from '@2bab/minibook-kit/theme/ImageZoom.vue'
import '@2bab/minibook-kit/theme/styles.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('ImageZoom', ImageZoom)
  }
} satisfies Theme
