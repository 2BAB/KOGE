## 依赖管理

在[快速开始](/zh-cn/basis/getting-started)小节中我们以及了解过简单的项目结构和 `build.gradle(.kts)` 文件的作用。本节我们将讨论如何把一个单一的模块和其内部、外部模块进行联系，也即依赖的管理。

### 引用远程依赖（经典写法）


### 引用远程依赖（新版写法）


### 引用本地模块（经典写法）

当一个项目中有多个模块时，一般按照如下文档的方式组织模块结构：

- ["Structuring and Building a Software Component with Gradle"@Gradle](https://docs.gradle.org/current/userguide/multi_project_builds.html)

模块之间的互相依赖我们通常使用 `implementation(project(":$modulePath"))` 的语法进行引用。注意，Gradle 以 ":" 为文件路径分隔符，如果 a 模块引用的 b 模块放置在某个深层的文件（例如 "/commons/utils/b"）中，则需要完整的路径引用：`project(":commons:utils:b")`。


### 引用本地模块（新版写法）

除了标准的冒号引用 `project(":test-library")` 之外，Gradle 最近推出了一种新的模块引入写法——TypeSafe Project Accessor。目前该特性是一个处于预览孵化状态，需要在 `settings.gradle.kts` 中添加如下代码才可开启。

``` Kotlin
enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")
```

使用该功能可为同一个项目工程下的所有模块自动生成 accessor，例如我们可以在 `app` 模块中这样引用一个 library 模块（实际模块名为“test-library”）：

``` Kotlin
implementation(projects.testLibrary)
```

![dependency-management-usage](../media/dependency-management-usage.png)

查看其源码，发现 Gradle 帮我们生成了如下的一个辅助类：

![dependency-management-accessor](../media/dependency-management-accessor.png)

- ["TypeSafe Project Accessor 官方功能介绍"@Gradle](https://docs.gradle.org/7.0/release-notes.html)
- ["Using type-safe project dependencies on Gradle"@Igor Escodro](https://proandroiddev.com/using-type-safe-project-dependencies-on-gradle-493ab7337aa)


### 引用本地 AAR（最佳写法）

最佳的办法其实是创建一个空的 Gradle 模块，在其 `build.gradle.kts` 中写入两行引用本地 `.aar` 的配置即可。

- ["Put your AAR into a separate module."@JRod](https://stackoverflow.com/a/70074787/3614547)

![](https://i.stack.imgur.com/VT3JX.png)

``` Kotlin
configurations.maybeCreate("default")
artifacts.add("default", file('spotify-app-remote-release-0.7.1.aar'))
```

### 小结

本节我们主要介绍了实用的几个依赖管理的 API，想深入理解 Dependency 的承载容器、自定义引用方式等，可参阅如下的官方文档：

- ["Declaring dependencies"@Gradle](https://docs.gradle.org/current/userguide/declaring_dependencies.html)