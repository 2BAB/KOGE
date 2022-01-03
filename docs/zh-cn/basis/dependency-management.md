# 依赖管理

在[快速开始](/zh-cn/basis/getting-started)小节中我们以及了解过简单的项目结构和 `build.gradle(.kts)` 文件的作用。本节我们将讨论如何把一个单一的模块和其内部、外部模块进行联系，也即依赖的管理。

## 引用远程依赖（经典写法）

一般的项目，我们会使用两级结构的项目结构。其中，

- 根目录的 `build.gradle.kts` 为父 `Project`，其定义的 `buildscript{}` 块用于声明编译脚本自身的**依赖及仓库**（主要是 Gradle 插件），`allprojects{ repository{} }` 指定了运行时依赖搜索的**仓库**。下方代码来自 ["kotlin-dsl-samples/samples/hello-android"@Kotlin](https://github.com/2BAB/kotlin-dsl-samples/blob/master/samples/hello-android/build.gradle.kts) 的根目录 `build.gradle.kts`：

``` Kotlin
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.1.3")
        classpath(kotlin("gradle-plugin", version = "1.3.70"))

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle.kts files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}
```

- 具体模块下的 `build.gradle.kts` 为子 `Project`，其定义的依赖一般仅供自身运行时/测试时等场景使用：

``` Kotlin
dependencies {
    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
    implementation(kotlin("stdlib-jdk7", KotlinCompilerVersion.VERSION))
    implementation("com.android.support:appcompat-v7:27.1.1")
    debugImplementation("com.android.support.constraint:constraint-layout:1.1.0")
    testImplementation("junit:junit:4.12")
    androidTestImplementation("com.android.support.test:runner:1.0.2")
    androidTestImplementation("com.android.support.test.espresso:espresso-core:3.0.2")
}
```

我们简单解析下几个配置之间的区别：

1. `implementation` `compileOnly` `api` 等配置为 AGP 自身已提供的一些方法：[Dependency configurations"@Android](https://developer.android.com/studio/build/dependencies#dependency_configurations)。
2. `debugImplementation` 等配置称之为 variant aware configuration，也即只在该 variant 渠道打包时才会被添加的依赖：["Configure build variants"@Android](https://developer.android.com/studio/build/build-variants)。
3. `testImplementation` 针对本机单元测试（指代了环境和测试方法）。
4. `androidTestImplementation` 针对 Android 环境的 instrumentment test（指代环境，具体可以是单元或者集成测试等方法）。
5. `kotlin("stdlib-jdk7", ...)` 为一个便捷方法，其最终实现还是组合出 `org.jetbrains.kotlin:kotlin-stdlib-jdk7:xxx` 的完整坐标：["Kotlin-Gradle"@Kotlin](https://kotlinlang.org/docs/gradle.html#set-dependencies-at-the-top-level)。
6. `KotlinCompilerVersion.VERSION` 的声明来源于 `buildSrc` （当然也可能是一个独立的项目被 `includeBuild` 进来）请参阅 [buildSrc](/zh-cn/basis/advanced-scripts) 小节。


## 引用远程依赖（新版写法）

Gradle 在 6.x 和 7.x 中分别添加了几组新的 API 用以替换上述的依赖管理相关 API：

``` Kotlin
// https://github.com/2BAB/Seal/blob/3.1.0/settings.gradle.kts
pluginManagement {
    // The plugins block can be extracted to root's build.gradle.kts as well,
    // you can see that new Android Studio (2021+) already did these for you
    // when you created a new project using it.
    plugins {
        kotlin("android") version "1.5.31" apply false
        id("com.android.application") version "7.0.4" apply false
        id("com.android.library") version "7.0.4" apply false
    }
    resolutionStrategy {
        eachPlugin {
            if(requested.id.id == "me.2bab.seal") {
                useModule("me.2bab:seal:+")
            }
        }
    }
    repositories {
        mavenCentral()
        google()
        gradlePluginPortal()
        mavenLocal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        mavenLocal()
    }
    versionCatalogs {
        create("deps") {
            from(files("./deps.versions.toml"))
        }
    }
}
```

其中：

1. `buildscript` 被 `pluginManagement` 替换了，内部的 `dependencies` 被直接替换成了 `plugins`（基于 id 的查找）。
2. 由于没有了 `classpath` 的具体坐标，在有特别需要的时候可以使用 `resolutionStrategy` 进行坐标设置，当然 `resolutionStrategy` 一般主要是处理依赖冲突等情况使用；
3. `allprojects{ repositories{} }` 被 `dependencyResolutionManagement { repositories{} }` 取代，而 `versionCatalogs` 则是新的多模块/跨项目依赖共享 API，我们看下方的一个示例：

``` TOML
// https://github.com/2BAB/Seal/blob/3.1.0/deps.versions.toml
[versions]
kotlinVer = "1.5.31"
agpVer = "7.0.3"
polyfillVer = "0.4.0"
mockitoVer = "3.9.0"

[libraries]
android-gradle-plugin = { module = "com.android.tools.build:gradle", version.ref = "agpVer" }
kotlin-std = { module = "org.jetbrains.kotlin:kotlin-stdlib-jdk8", version.ref = "kotlinVer" }
kotlin-serialization = { module = "org.jetbrains.kotlinx:kotlinx-serialization-core-jvm", version = "1.3.1" }
polyfill-main = { module = "me.2bab:polyfill", version.ref = "polyfillVer" }
polyfill-manifest = { module = "me.2bab:polyfill-manifest", version.ref = "polyfillVer" }
fastJson = { module = "com.alibaba:fastjson", version = "1.2.73" }
zip4j = { module = "net.lingala.zip4j:zip4j", version = "2.6.2" }
junit = { module = "junit:junit", version = "4.12" }
mockito = { module = "org.mockito:mockito-core", version.ref = "mockitoVer" }
mockitoInline = { module = "org.mockito:mockito-inline", version.ref = "mockitoVer" }

[bundles]

[plugins]

```

如上的一个自定义 `.toml` 文件，可以被 `versionCatalogs { ... }` 所接收。Gradle 会在 Sync 阶段自动为我们生成文件同名的各类依赖声明，如下所示的 `deps.xxx`，方便我们在多个模块内快速添加：

``` Kotlin
// https://github.com/2BAB/Seal/blob/3.1.0/seal/plugin/build.gradle.kts
dependencies {
    implementation(deps.polyfill.main)
    implementation(deps.polyfill.manifest)

    implementation(gradleApi())
    implementation(deps.kotlin.std)
    implementation(deps.kotlin.serialization)

    compileOnly(deps.android.gradle.plugin)

    testImplementation(gradleTestKit())
    testImplementation(deps.junit)
    testImplementation(deps.mockito)
    testImplementation(deps.mockitoInline)
    testImplementation(deps.fastJson)
    testImplementation(deps.zip4j)
}
```

完整的介绍请参考如下几篇文档/文章：

1. ["Plugin Management"@Gradle](https://docs.gradle.org/current/userguide/plugins.html#sec:plugin_management)
2. ["Sharing dependency versions between projects"@Gradle](https://docs.gradle.org/current/userguide/platforms.html)
3. ["It’s time to ditch the buildscript block"@Stefan M.](https://stefma.medium.com/its-time-to-ditch-the-buildscript-block-a1ab12e0d9ce)

## 引用本地模块（经典写法）

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


## 引用本地 AAR（最佳写法）

最佳的办法其实是创建一个空的 Gradle 模块，在其 `build.gradle.kts` 中写入两行引用本地 `.aar` 的配置即可。

- ["Put your AAR into a separate module."@JRod](https://stackoverflow.com/a/70074787/3614547)

![](https://i.stack.imgur.com/VT3JX.png)

``` Kotlin
configurations.maybeCreate("default")
artifacts.add("default", file('spotify-app-remote-release-0.7.1.aar'))
```

## 小结

本节我们主要介绍了实用的几个依赖管理的 API，想深入理解 Dependency 的承载容器、自定义引用方式等，可参阅如下的官方文档：

- ["Declaring dependencies"@Gradle](https://docs.gradle.org/current/userguide/declaring_dependencies.html)