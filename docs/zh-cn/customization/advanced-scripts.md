# 脚本进阶

## Script Plugin

除了平常项目维护的 `build.gradle(.kts)` `settings.gradle(.kts)` “脚本”，引用的“插件”外，其实还有一种“脚本插件”（Script Plugin）。严格来说，它们就是“脚本”，只不过被定义在了上述的脚本之外，不跟随某个特定的模块走，可以被模块内的脚本所引用。但是 Gradle 官方把它归类到了 Plugin 的类目下，可以从这篇文章中找到相关的定义和使用描述。

- [Types of plugins](https://docs.gradle.org/current/userguide/plugins.html#sec:types_of_plugins)
- [Script plugins](https://docs.gradle.org/current/userguide/plugins.html#sec:script_plugins)

脚本插件和普通二进制插件一样，可以被 `apply(...)` 或者 `id(...)` 引用。但事实上，一般定义在外部的脚本（比如和 `build.gradle(.kts)` 放在一起，甚至是一个网络上加载的脚本），只能用 `apply(...)` 引用，偶尔也会看到大家叫它 Standalone Script Plugin。而 `id(...)` 引用的脚本插件则是放在 `buildSrc` 或者其他 included build 的模块中，称之为 Precompiled Script Plugins。

[Precompiled script plugins](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:precompiled_plugins)

如果熟悉 Groovy DSL 的朋友，应该见过类似 `maven.gradle` `bintray.gradle` 的独立脚本插件，例如：

- [bintray.gradle](https://github.com/2BAB/Seal/blob/2.0.0/bintray.gradle)


转到 Kotlin 后应该会有很多疑问，不是都用的 Standalone Script Plugin 比较多吗？Precompiled Script Plugins 又是为什么？在 Gradle Kotlin DSL 的语境下，这两种脚本的区分其实很明显：

- Standalone Script Plugin 有一个明显的限制：你没法直接使用项目已经定义好的外部依赖，也就没法用来做配置插件等等的工作，当然，有一种曲线救国的方式是在脚本内重新声明 `buildsrcipt` 引入需要的外部依赖；一般地你只能见到用 Standalone Script Plugin 写一写简单的自定义 Task，复制个文件等。
- Precompiled Script Plugins 顾名思义会先经过一轮编译，再将这个脚本插件加入到当前 setting.gradle.kts 下引入的所有项目编译环境中；这个插件自身的项目也是一个完整的 Gradle 项目，一般我们会在它的编译环境中使用 `kotlin-dsl`，用来支持 Kotlin 语言主体以及 DSL 的 Type-Safe Model Accessor.

如下的项目对比了 Groovy 和 Kotlin 的两种 Standalone Script Plugin 写法，Kotlin 的版本有所限制。

- [gradle-docker-modularity](https://github.com/abendt/gradle-docker-modularity)

推荐的做法是使用 Precompiled Script Plugins，一个简单的例子如下方的工程：

- [project-with-buildSrc](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/project-with-buildSrc)

我们会在 buildSrc 的部分看到更多案例。

## buildSrc

`buildSrc` 是 Gradle 约定的一个内置的“自定义构建逻辑”模块，它本质上是一种 included build 模块，只不过 Gradle 发现其实很多逻辑也没必要独立成一个外部的模块再 `includeBuild` 进来，所以约定一个 `buildSrc` 用来存放当前工程（相对于一个 `settings.gradle.kts` 来说）构建的一些自定义逻辑。你可以查看下方文档了解详细的定义：

- [Use buildSrc to abstract imperative logic](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html#sec:build_sources)

我们通过几个例子了解下 buildSrc 常见的用处：其中 1 和 2 是 Stack Overflow 的两个问答，详细说明了怎么使用 BuildSrc，包括 Precompiled Script Plugins 或者一些共享的 Kotlin 类；3 和 4 是 Gradle 官方的两个极简用例；5 是 Android 官方的 Variant API 结合 buildSrc 使用的多个案例；6 是我自己实战中在 buildSrc 中编写的一些脚本和工具。

1. [Reuse gradle.kts function](https://stackoverflow.com/questions/65513944/reuse-gradle-kts-function)
2. [Include scripts with Gradle Kotlin DSL](https://stackoverflow.com/questions/55335866/include-scripts-with-gradle-kotlin-dsl)
3. [project-with-buildSrc](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/project-with-buildSrc)
4. [buildSrc-plugin](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/buildSrc-plugin)
5. [android/gradle-recipes/BuildSrc](https://github.com/android/gradle-recipes/tree/agp-7.1/BuildSrc)
6. [2BAB/Polyfill/buildSrc](https://github.com/2BAB/Polyfill/tree/master/buildSrc)

我们再看一些利用 buildSrc 提高构建工程化水平的实践：



## init.gradle(.kts)

事实上你可以把 init.gradle(.kts) 当成一种特殊的脚本插件，只不过：它不是在某个  `build.gradle(.kts)` `settings.gradle(.kts)` 当中被引入的，而是在 Gradle 的配置中直接加载的；加载的时机也优先于所有的其他脚本。


 `init.gradle(.kts)` 同样受上述的外部脚本限制，也不应在一个初始化脚本内做过于复杂的操作：越好用越通吃的配置，则越应该简洁，避免有些项目本不需要这么多，还要添加一些 properties 去控制它的行为。没有强制加载时机的一些逻辑可以独立成插件或者脚本，方便具体的项目选择、配置。

[Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html)