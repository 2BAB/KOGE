import { defineMinibook } from '@2bab/minibook-kit/config'

const englishSidebar = [
  {
    text: 'Introduction',
    link: '/'
  },
  {
    text: 'Basis',
    items: [
      { text: 'Getting Started', link: '/basis/getting-started' },
      { text: 'Kotlin DSL', link: '/basis/kotlin-dsl' },
      { text: 'DSL Configuration', link: '/basis/dsl-configuration' },
      { text: 'Dependency Management', link: '/basis/dependency-management' },
      { text: 'Regular Tasks', link: '/basis/regular-tasks' },
      { text: 'Lifecycle', link: '/basis/lifecycle' }
    ]
  },
  {
    text: 'Customization',
    items: [
      { text: 'Advanced Scripting', link: '/customization/advanced-scripts' },
      { text: 'Parameter Passing', link: '/customization/arguments' },
      { text: 'Custom Tasks', link: '/customization/customized-task' },
      { text: 'Performance Optimization', link: '/customization/performance-optimization' }
    ]
  },
  {
    text: 'More',
    link: '/more'
  }
]

const chineseSidebar = [
  {
    text: '简介',
    link: '/zh-cn/'
  },
  {
    text: '基础',
    items: [
      { text: '快速开始', link: '/zh-cn/basis/getting-started' },
      { text: 'Kotlin Script (KTS) 和 DSL', link: '/zh-cn/basis/kotlin-dsl' },
      { text: 'DSL 配置', link: '/zh-cn/basis/dsl-configuration' },
      { text: '依赖管理', link: '/zh-cn/basis/dependency-management' },
      { text: '常规任务', link: '/zh-cn/basis/regular-tasks' },
      { text: '生命周期', link: '/zh-cn/basis/lifecycle' }
    ]
  },
  {
    text: '自定义',
    items: [
      { text: '脚本进阶', link: '/zh-cn/customization/advanced-scripts' },
      { text: '参数传递', link: '/zh-cn/customization/arguments' },
      { text: '自定义任务', link: '/zh-cn/customization/customized-task' },
      { text: '实例：上传 APK', link: '/zh-cn/customization/sample-artifact-process' },
      { text: '实例：统一 Library 的脚本', link: '/zh-cn/customization/sample-convention-plugin' },
      { text: '性能优化', link: '/zh-cn/customization/performance-optimization' }
    ]
  },
  {
    text: '更多',
    link: '/zh-cn/more'
  }
]

export default defineMinibook({
  id: 'koge',
  title: 'KOGE',
  description: 'Kotlin-oriented Gradle Essentials, a self-study handbook.',
  favicon: '/favicon.ico',
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      sidebar: englishSidebar
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-cn/',
      sidebar: chineseSidebar
    }
  }
})
