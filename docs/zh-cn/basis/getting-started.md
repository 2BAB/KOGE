# 快速开始

## 什么是 Gradle

第一次接触 Gradle 的朋友可以快速浏览下其百科和官方文档的简介（1、2），另外 Gradle 和 Android Studio 的关系、为什么 Android 选择了 Gradle 作为构建工具等问题可以参考链接 3 和 4，这样你可以更好地理解为什么要从一开始就接触 CLI 的命令，以及 AGP 扮演的角色。

1. ["Gradle"@Wikipedia](https://en.wikipedia.org/wiki/Gradle)
2. ["What is Gradle?"@Gradle](https://docs.gradle.org/current/userguide/what_is_gradle.html)
3. ["What is Gradle in Android Studio?"@GagandeepSingh](https://stackoverflow.com/a/24828666/3614547)
4. ["Google IO 2013 The New Android SDK Build System"@Google](https://v.youku.com/v_show/id_XNTYwMzY0NDYw.html?spm=a2h1n.8251843.playList.5!4~1!2~3~A&f=19280821&o=1)

## 什么是 Android Gradle Plugin（AGP）

不少刚上手的朋友可能会对 Gradle 和 Android Gradle Plugin 之间的关系感到有些困惑，实际上 Gradle 作为一个平台，只负责一些基础设施的东西，像脚本能力、依赖管理能力、Task 机制等等，具体的编译功能还需要各个语言和框架自行实现。

1. ["difference between android gradle plugin and gradle"](https://stackoverflow.com/questions/49156528/difference-between-android-gradle-plugin-and-gradle)
2. ["Android Gradle 插件版本说明"@Google](https://developer.android.com/studio/releases/gradle-plugin)

你还将在[常规任务](./regular-tasks.md)小节看到其他的一些官方插件。

## Gradle 工程结构样例

最基础的 Gradle 工程可以从 Gradle 官方的 Sample 中找到

1. ["Sample Index"@Gradle](https://docs.gradle.org/current/samples/index.html)：Sample 首页，列出了所有官方的工程样例，且持续保持着更新。
2. ["Building Kotlin Applications Sample"@Gradle](https://docs.gradle.org/current/samples/sample_building_kotlin_applications.html)：Kotlin 的样例本身有详细的教程说明，每个文件、每个创建的步骤均一一列出。
3. ["Building Android Apps Sample"@Gradle](https://docs.gradle.org/current/samples/sample_building_android_apps.html)：Android 的样例是基于 Android 官方的[构建首个应用](https://developer.android.com/training/basics/firstapp)教程编写的，可参照教程内容进行代码阅读。


![](../media/getting-started-kotlin-sample.png)

另外，AndroidStudio 创建新项目的功能目前还仅支持 Gradle Groovy DSL 的项目，想了解如何迁移或者如何编写 Gradle Kotlin DSL 的内容，请参考 [Kotlin Script (KTS) 和 DSL](./kotlin-dsl.md) 小节。

另外，对于项目结构和 Gradle Files 的说明，你也可以查阅以下几篇内容：

1. ["Gradle 102: Gradle Basics"@Shivam](https://medium.com/@shivam.gosavi340_58315/gradle-102-gradle-basics-798db70a6c20)
2. ["Build Script Basics"@Gradle](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html)
3. ["Managing Dependencies of JVM Projects"@Gradle](https://docs.gradle.org/current/userguide/dependency_management_for_java_projects.html)


## 从命令行构建您的应用

事实上 Android Studio 的编译功能也是基于 Gradle Tasks 做的封装，从一开始就使用 CLI 进行编译工作有助于更好地理解构建系统的工作，例如任务名和 Variant 的关系、参数如何进行传递等等。一般地，我们推荐使用 **Gradlew Wrapper** 作为运行 Gradle 命令的脚本工具：

- [”Gradle Wrapper“@Gradle](https://docs.gradle.org/current/userguide/gradle_wrapper.html)

上述的几个样例工程中也都包含了该脚本工具，通过它可以运行起 Kotlin 或者 Android 的工程：

``` Shell
$ cat local.properties
sdk.dir=/Users/2bab/Library/Android/sdk
$ ./gradlew clean assembleDebug -q
...
```

注意 Android 的项目需要在项目根目录配置下 Android SDK 的目录（通常写在 `local.properties` 文件），详细的内容可以参考如下文档：

- ["配置 build"@Android](https://developer.android.com/studio/build)

而下方的 Android 文档则详细阐述了各种常见的 AGP 和 Android SDK 提供的命令，用来构建、安装编译的 APK/AAB 等：

- [”从命令行构建您的应用“@Google](https://developer.android.com/studio/build/building-cmdline)

## 小结

对于 Gradle，最快的上手方式还是下载官方的 Sample 工程，上手跑几个命令测试下，再参照几篇项目结构的说明理顺 `build.gradle(.kts)` `settings.gradle.kts` 等文件的作用，如何组织一个单模块的项目等。

