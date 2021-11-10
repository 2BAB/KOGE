# 性能优化

本节我们将了解常见、易操作、收益好的一些性能优化策略。

## 通用优化策略 

考虑通用性的策略时，一般从根本性的方法出发。除了外部硬件条件升级外，最根本的策略还属下述三个点：

- **减负：减少不必要的 Configuration、Task；**
- **缓存&增量：缓存编译结果，支持增量编译；**
- **并发：Project 和 Task 的多任务并行；**

三个策略再结合两个阶段分别考量：**配置阶段**和**运行阶段**。

配置阶段的优化：

1. 考虑可以直接开启的 Gradle 特性，例如 `--configuration-cache`，这些特性没有默认开启，一方面可能它们还在孵化（未达到稳定版），另外一方面是需要脚本编写时的配合。
2. 考虑自己的脚本、插件、第三方插件的升级，例如采用惰性方式创建 Task，修改 Configuration Cache 兼容的编写方式。

运行阶段的优化：

1. 考虑可以直接开启的 Gradle 特性，例如 `--parallel`，同上它有自身的一些限制和不完善，极端情况下会导致编译过程出错。
2. 有一些插件其实可以在 Debug 模式下被禁用：测试相关的插件，例如 Jacoco，我们可能只需要 CI 环境下的默认开启，本地可以加入一个开关到 local.propeties 并默认关闭；资源优化处理相关的插件，例如我开源的 ScratchPaper 插件，其作用于 App 图标的修改，添加区分测试版本的一些元信息，可以设定为打对应的提测包时才启用。
3. 考虑自己的脚本、插件、第三方插件的升级，例如使用 `WorkExecutor` 支持任务内的子任务并行，AGP 以及 Kotlin Plugin 最近的几个版本也根据该特性修改子任务并行的实现。

上述的内容基本都可以在 Gradle 的文档中找到：

1. [Configuration cache](https://docs.gradle.org/current/userguide/configuration_cache.html)
2. [Task Configuration Avoidance](https://docs.gradle.org/current/userguide/task_configuration_avoidance.html#task_configuration_avoidance)
3. [Developing Parallel Tasks using the Worker API](https://docs.gradle.org/current/userguide/worker_api.html#header)
4. [Parallel project execution](https://docs.gradle.org/current/userguide/multi_project_configuration_and_execution.html#sec:parallel_execution)


想更进一步去探究每个流程的性能瓶颈，可以使用 `--scan` `--profile` 等参数或者 `gradle-profile` 等工具获取构建过程的详细报告

1. [Improving the Performance of Gradle Builds](https://docs.gradle.org/current/userguide/performance.html)：介绍了深入分析的方法、工具，但对于初学者来说可能投入和收益的比例并不可观。
2. [Gradle Enterprise Gradle Plugin User Manual](https://docs.gradle.com/enterprise/gradle-plugin/?_ga=2.127298381.1900135053.1636116790-1881714751.1634284859#getting_set_up)
3. [DIY Gradle build optimization](https://alexsaveau.dev/blog/gradle/performance/diy-gradle-build-optimization)：用一些实际案例介绍如何针对 `--scan` 等工具的结果去做优化。
4. [Hello, my Gradle builds are slow!](https://medium.com/@liutikas/hello-my-gradle-builds-are-slow-483427e6eb4)：一个 AndroidX 团队使用 `--scan` 分析依赖下载耗时的简单案例（虽然是 Gradle Enterprise 商业版的案例，但这篇文章用到的功能都是免费版就有的）。


## Android 构建优化策略

这个部分我仅推荐参考 AGP 官方的文档"[优化构建速度](https://developer.android.com/studio/build/optimize-your-build)"，更新及时收益良好，但注意其更多倾向于 Debug 包的优化策略。



1. 确保工具已是最新版本
2. 创建用于开发的 build 变体
3. 单变体项目同步
4. 避免编译不必要的资源
5. 对调试 build 停用 Crashlytics
6. 将静态 build 配置值用于调试 build
7. 使用静态依赖项版本
8. 创建库模块
9. 为自定义构建逻辑创建任务
10. 将图片转换为 WebP 格式
11. 停用 PNG 处理
12. 使用增量注解处理器
13. 配置 JVM 垃圾回收器

## 小结

- 升级 Gradle 及相关插件包括 AGP 是最简单、收益最高的优化策略，其次是优化自己编写的脚本、插件。
- 虽然长期坚持更新 Gradle、AGP 需要一定维护成本，但仔细计算会发现不更新的代价更严重。
- 不必追着“优化小技巧”的文章跑，一方面它们过时的很快；另一方面理解了原理可以从更直接有效的角度切入。