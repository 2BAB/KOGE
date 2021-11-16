# DSL 配置

本节我们将对常见的 DSL 配置进行梳理。

## The Java/Kotlin Plugin

刚开始入门的 Android 开发者其实建议先看看 Java Plugin 的 DSL 配置，需要配置的内容相对较少：

- ["The Java Plugin"@Gradle](https://docs.gradle.org/current/userguide/java_plugin.html#tab:configurations)
- ["Gradle | Kotlin"@Kotlin](https://kotlinlang.org/docs/gradle.html)

快速浏览一遍后你会发现：就基础的配置来说 Android 和 Java/Kotlin 基本都是一致的，比如 source sets / dependency configuration。

之后再结合一些案例来理解一份配置文件的全貌：

- ["kotlin-dsl-samples/samples/hello-kotlin"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/hello-kotlin/build.gradle.kts)
- ["google/iosched/model"@Google](https://github.com/google/iosched/blob/main/model/build.gradle.kts)

## Android Gradle Plugin

对于 AGP，官方的“[配置 build](https://developer.android.com/studio/build)”文档已经把所有的 DSL 构建配置都梳理完整了，大家可以按照标准的术语表顺序去参阅具体的内容：

1. 构建类型
2. 产品变种
3. 构建变体
4. 清单条目
5. 依赖项
6. 签名
7. 代码和资源缩减
8. 多 APK 支持

具体到某个 AGP 的 DSL 参数，可以参考已迁移至 developer.android.com 的新文档中心：

- ["Android Gradle plugin API reference"@Android](https://developer.android.com/reference/tools/gradle-api)

之后再结合一些案例来理解一份配置文件的全貌：

- ["google/iosched/mobile"@Google](https://github.com/google/iosched/blob/main/mobile/build.gradle.kts)