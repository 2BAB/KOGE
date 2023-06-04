# Kotlin Script (KTS) 和 DSL

本节我们将了解 Kotlin Script 和 DSL 的来龙去脉，从而从源头上理解 `*.gradle.kts`。

## 泛用型 KTS 脚本

大家可能对 KTS 会存在一种刻板印象，认为 KTS 就是指 Kotlin DSL 的 Gradle 脚本。事实上 `*.kts` 是一种泛用性的 Kotlin 脚本（Kotlin Script），可被运用在许多的领域。类似的工具比如 Shell，Python 脚本，KTS 脚本的优势在于统一性和易上手，同时还携带了脚本内引用外部依赖的功能；当然，缺点也是显而易见的——系统需要安装 Kotlin 依赖（常用系统都没有自带）。

KTS 目前有两种标准：

- ["KScript"@holgerbrandl](https://github.com/holgerbrandl/kscript/) 标准：以 `*.kts` 作为文件扩展名，2016 年由第三方（文档和标准说明在 holgerbrandl/kscript 仓库，详见参考资料）创立的标准，2017 年的 KotlinConf 上有过一次详细的演示，目前仍然是功能最丰富的标准，涵盖了脚本缓存，外部依赖引用，命令行解释器，自动生成 Gradle 工程（方便 IDE 集成）等功能，除去 Kotlin 主体，还需要安装 KScript 工具；
- ["Kotlin 官方标准"](https://github.com/Kotlin/KEEP/blob/master/proposals/scripting-support.md)：以 `*.main.kts` 作为文件扩展名（文档和标准说明在 Kotlin/KEEP 仓库，详见参考资料），官方于 Kotlin 1.3 时创立了标准，1.4 中补全了 KScript 已有的一些主要功能，并且无需 Gradle 工程可直接由 Intellij IDEA 支持依赖引用。

下面我们列出两个实际案例，分别是使用 KScript 制作的 Gradle 缓存清理工具 deep-clean 和 Kotlin 官方的一些 Script 案例：

1. ["rock3r/deep-clean"@SebastianoPoggi](https://github.com/rock3r/deep-clean/blob/master/deep-clean.kts)
2. ["kotlin-script-examples"@Kotlin](https://github.com/Kotlin/kotlin-script-examples)

最后，如果想详细了解两种标准的对比和历史发展，可以参考这篇文章：

- ["The state of Kotlin Scripting"@MartinBonnin](https://medium.com/@mbonnin/may-2020-the-state-of-kotlin-scripting-99cb6cc57db1)


## 泛用型 Kotlin DSL

同 KTS，Kotlin DSL 并不是一个只存在于 Gradle 脚本中的技术，你可以在很多地方见到它的身影。了解具体的场景前，我们先熟悉下常见的 Kotlin DSL 都是由什么样的基础元素组成的，以下面四篇文章文档为例：其中 1、2 Kotlin 官方与 DSL 有关的两篇经典解析，从高阶函数到 Type-safe builders；3、4 是关于 Kotlin DSL 的两份系列教程，完整解释了如何理解和应用 Kotlin DSL。

1. ["High-order functions and lambdas"@Kotlin](https://kotlinlang.org/docs/lambdas.html)
2. ["Type-safe builders"@Kotlin](https://kotlinlang.org/docs/type-safe-builders.html)
3. ["Kotlin DSL | Introduction"@GlennSandoval](https://medium.com/kotlin-and-kotlin-for-android/kotlin-dsl-introduction-6123c43ae770)
4. ["Domain-Specific Languages In Kotlin: Getting Started"@TinoBalint](https://www.raywenderlich.com/2780058-domain-specific-languages-in-kotlin-getting-started)

除了 Gradle 的使用场景，你还可以在这些知名 Library 中见到 Kotlin DSL 的身影：

1. ["Koin"@InsertKoinIO](https://github.com/InsertKoinIO/koin)
2. ["Ktor"@Kotlin](https://github.com/ktorio/ktor)


## *.gradle.kts

Gradle Kotlin DSL 就是在泛用 KTS 脚本的基础上，进一步约定了脚本的 Context（比如 `Project` 和 `Settings` 对象），并且加入了 DSL 简化配置的特性（各类插件的 Extension）。你可以从 1、2 两篇文档中了解 Gradle Kotlin DSL 的大部分特性；3 是 Android 官方的迁移文档；4 则是 Gradle 官方的一个 dsl samples 仓库；5 是 KTS 中经常使用到的“代理属性”的官方文档; 6 是插件开发中存在大量 Groovy 代码情况下，如何与 Kotlin 混合编译。

1. ["Gradle Kotlin DSL Primer"@Gradle](https://docs.gradle.org/current/userguide/kotlin_dsl.html)
2. ["Migrating build logic from Groovy to Kotlin"@Gradle](https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html)
3. ["Android：将构建配置从 Groovy 迁移到 KTS"@Android](https://developer.android.com/studio/build/migrate-to-kts)
4. ["gradle/kotlin-dsl-samples"@Gradle](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples)
5. ["Delegated properties"@Kotlin](https://kotlinlang.org/docs/delegated-properties.html)
6. ["我与 Groovy 不共戴天"@小灵通](https://juejin.cn/post/7084949825866694686/)

## 小结

了解通用性的 Kotlin Script 和 DSL 其实可以给我们的工作带来很多便利，一门语言解决了多个工作需求。

而官方的态度虽然没到仅支持 KTS 的地步，但 Gradle Kotlin DSL 是目前 Android 官方较为推荐的写法（相较于 Groovy）。

> 将来，KTS 会比 Groovy 更适合用于编写 Gradle 脚本，因为采用 Kotlin 编写的代码可读性更高，并且 Kotlin 提供了更好的编译时检查和 IDE 支持。

Gradle 官方文档也推荐使用静态语言进行插件编写：

- ["Prefer using a statically-typed language to implement a plugin"@Gradle](https://docs.gradle.org/current/userguide/designing_gradle_plugins.html#prefer_using_a_statically_typed_language_to_implement_a_plugin)