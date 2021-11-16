# KOGE 简介

<ImageZoom 
  src="https://raw.githubusercontent.com/2BAB/KOGE/main/koge-book-cover.png" 
  :border="false" 
  width="560"
/>

KOGE 是 Kotlin-oriented Gradle Essentials 的缩写，顾名思义是面向 Kotlin 的 Gradle 基础手册。它不是“Awesome Gradle”的项目收藏夹，也并非一本仅由我阐释的书。它按照合理的先后顺序，列出新手最困惑的概念，再从一些互联网上已有的问题、源码、示例项目中去学习。**它是一份大纲，一本简练的自学手册。**

手册选择了 **Kotlin** 作为介绍 DSL 脚本和插件开发的语言，链接和用例以 **Android** 构建为主。Gradle Kotlin DSL 在 IDE 中的补全支持优秀，Kotlin 的社区和生态足够活跃，作为 Android 开发者的我也十分享受一门语言带来的统一体验（App 主体开发和构建工具开发）。对于其他平台的 Gradle 使用者，也可以沿袭同样的脉络进行学习。

另外，“基础”的定义范围十分明确，它覆盖了下方第 1 点和部分第 2 点中的内容（源自我之前的一个[问卷调查](https://mp.weixin.qq.com/s/TmHYKMU1KYOTdN_ytZNWZA)）。重点解决**理解脚本、编写脚本，和常见 Gradle 工程化实践。**

> 1. “仅基础使用”（初级）：我能读懂、修改 build.gradle(.kts)，对 Gradle、AGP 有基础的认知，例如了解 Gradle 的任务机制，但碰到非 App 源码的编译错误有点不知所措；
> 2. “实现高效自动化、工程化”（中级）：我对工程化、自动化有一定的认知、追求，可以通过构建脚本拆分、自定义 Task 来实现日常事务的优化，例如使用 buildSrc 模块抽取并统一管理依赖、使用自定义 Task 组合 CICD 的流程，运用一些最佳实践来提高编译构建效率；
> 3. “编译构建增强”（高级）：我可以通过查阅 Gradle 文档、Debug AGP、编译期的 Profiler 日志，来自定义 Annotation Processor、Gradle Plugin 等解决一个项目碰到实际问题，抽象成一套可复用的工具；
> 4. “对编译构建有较为全面的理解”（资深）：我了解编译构建的主要环节实现，常见架构应用的原理，实践过多个编译构建增强工具，对项目的基础架构梳理得井井有条；
> 5. “深度参与”：我了解 Android App 编译构建的前沿发展，积极参与社区 Discussion、Proposal、PR、Review，灵活运用、修改各类工具，对于不同类型的问题、需求能给出优解、多解。
   
每个基础内容点都大致按如下四个步骤组织：

1. 是什么？
2. 能用来做什么？
3. 自学该注意哪些要点？
4. 自学内容链接、摘要、代码、运行结果等。

**不要因为语言是英文而跳过所有的链接内容，具体的知识点阐述、代码实战其实都在这些链接的文章、文档中。**

手册持续编写中 🚧...暂无可完整阅读的版本。

想参与手册编辑，请访问 KOGE 的 [Github Repo](https://github.com/2BAB/KOGE)。其他相关问题，欢迎[联系我](https://2bab.me/about)。

![](https://2bab-images.lastmayday.com/blog/%E5%85%AC%E4%BC%97%E5%8F%B7.jpg?imageslim)