# KOGE 简介

<ImageZoom 
  src="https://raw.githubusercontent.com/2BAB/KOGE/main/koge-book-cover.png" 
  :border="false" 
  width="560"
/>

KOGE 是 Kotlin-oriented Gradle Essentials 的缩写，顾名思义是面向 Kotlin 的 Gradle 基础手册。我们按照合理的先后顺序，列出新手最困惑的概念，再从一些互联网上已有的问题、源码、示例项目中去学习。**它不是 “Awesome Gradle” 的项目收藏夹，而是一份大纲，一本简练的自学手册。**

手册选择了 **Kotlin** 作为介绍 DSL 脚本和插件开发的语言，链接和用例以 **Android** 构建场景为主。Gradle Kotlin DSL 在 IDE 中的补全支持优秀，Kotlin 的生态活跃，作为 Android 开发者的我也十分享受一门语言带来的统一体验（App 主体开发和构建工具开发）。对于其他平台的 Gradle 使用者，也可以沿袭同样的脉络进行学习。

另外，“基础”的定义范围十分明确，它覆盖了下方第 1 点和部分第 2 点中的内容（源自我之前的一个[问卷调查](https://mp.weixin.qq.com/s/TmHYKMU1KYOTdN_ytZNWZA)）。重点解决**理解脚本、编写脚本，和常见 Gradle 工程化实践。**

> 1. “仅基础使用”（初级）：我能读懂、修改 build.gradle(.kts)，对 Gradle、AGP 有基础的认知，例如了解 Gradle 的任务机制，但碰到非 App 源码的编译错误有点不知所措；
> 2. “实现高效自动化、工程化”（中级）：我对工程化、自动化有一定的认知、追求，可以通过构建脚本拆分、自定义 Task 来实现日常事务的优化，例如使用 buildSrc 模块抽取并统一管理依赖、使用自定义 Task 组合 CICD 的流程，运用一些最佳实践来提高编译构建效率；
> 3. “编译构建增强”（高级）：我可以通过查阅 Gradle 文档、Debug AGP、编译期的 Profiler 日志，来自定义 Annotation Processor、Gradle Plugin 等解决一个项目碰到实际问题，抽象成一套可复用的工具；
> 
> ...
   
每个基础内容点都大致按如下四个步骤组织：

1. 它是什么？
2. 它能用来做什么？
3. 它的自学要点？
4. 主体内容，重点文档/文章链接、摘要、代码、运行结果等。

**最后，不要因为语言是英文而跳过所有的链接内容，详细的知识点阐述、代码实战其实都在这些链接的文章、文档中。**


## 版权声明

1. *个人创作*的内容，均遵守**[署名-非商业性使用 4.0 国际 (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans)**协议。
2. *链接引用*均按照 `"标题"@作者` 的格式嵌入链接，少量的*内容引用*均在上下文中以前述*链接引用*的格式给出原文链接。
3. 任何形式的引用，均无针对原文的修改。
4. 引用内容的主要组成是 Gradle、Android、Kotlin 的官方文档和 Github Repo，其他内容多为 Medium/dev.to 平台上开放的博客文章，以及个人博客文章、Github 代码库等。


## 关于

手册持续迭代中 🚧...当前版本号↓

![GitHub tag](https://img.shields.io/github/tag/2BAB/KOGE.svg)

想参与手册编辑，请访问 KOGE 的 [Github Repo](https://github.com/2BAB/KOGE)。其他相关问题，欢迎[联系我](https://2bab.me/about)。

![](https://2bab-images.lastmayday.com/blog/%E5%85%AC%E4%BC%97%E5%8F%B7.jpg?imageslim)


## 贡献者名单

<a href="https://github.com/2BAB/KOGE/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=2BAB/KOGE" />
</a>
