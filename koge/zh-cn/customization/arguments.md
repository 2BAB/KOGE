# 参数传递

Gradle 的构建环境中有着各种各样的 Options / Arguments / Properties / Variables，这节我们讨论下几种参数之间的区别、覆盖关系、使用姿势等等。


## CLI Options

最直接的参数传递入口、同时也是官方介绍地最全面的参数集便是命令行的参数，可以按照下方的五个维度参阅官方的 CLI Options 相关介绍。

1. Debugging options
2. Performance options
3. Logging options
5. Execution options
6. Environment options


["CLI Options"@Gradle](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)

快速浏览一遍有个印象后，可结合几个案例加深理解：

1. ["Troubleshooting builds"@Stefan M.](https://medium.com/grandcentrix/how-to-debug-gradle-plugins-with-intellij-eef2ef681a7b)
2. ["How to debug Gradle Plugins with IntelliJ"@StefanM.](https://medium.com/grandcentrix/how-to-debug-gradle-plugins-with-intellij-eef2ef681a7b)
3. ["构建指北 #9 Gradle 脚本调试"@2BAB](https://2bab.me/zh/blog/2021-02-14-android-build-script-debug-support/)

这三篇文章主要是调试、性能监控服务相关的文章，注意 Plugin 的调试和 Scripts 的调试虽然步骤一致，但是 Scripts 的调试能力现在还不完善（详见第三个链接）。其他像 `--dry-run` `--refresh-dependencies` `-Dorg.gradle.jvmargs` 也是常用配合调试的利器。

## gradle.properties

部分和性能相关的开关，除了 CLI 的写法，也有对应 `gradle.properties` 的 key。`gradle.properties` 是 Gradle 默认放置一些环境参数的文件，一些常用的参数可以固化在这个文件内从而避免每次都在 CLI 编写大量的参数。它的定义以及和 CLI 参数的覆盖关系如下文档：

1. ["Gradle properties"@Gradle](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_configuration_properties)
2. ["Build Environment"@Gradle](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_system_properties)


`gradle.properties` 包含了各类 System properties, Env variables, Project properties，还有各种插件的 properties，可以对照上述的文档和 CLI 的参数进行整理。额外对于 AGP 和 Kotlin 的 Properties，可以参考如下的文章：

1. ["Configuring Gradle with gradle.properties"@Jean-Michel Fayard](https://dev.to/jmfayard/configuring-gradle-with-gradle-properties-211k)
2. ["How to Store Credentials in Android Projects Using gradle.properties"@Clint Paul](https://medium.com/swlh/how-to-safely-store-credentials-in-android-projects-using-gradle-properties-8cf500561095)
3. ["Dependencies versions in Gradle Kotlin DSL"@Kamil Seweryn](https://proandroiddev.com/dependencies-versions-in-gradle-kotlin-dsl-a8db15cedee2): 共享依赖的变种；



## 读取和使用

其实在上个部分的最后一篇文章中，我们已经看到了如何使用 `gradle.properties` 进行依赖版本的管理。这里我们列出一些更通用的自定义的参数输入和读取，重点理解通过 `extra` 和 `by project` 代理的两种读取方式。：

1. ["Declaring variables"@Gradle](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:declaring_variables)
2. ["ext-in-buildscript-can-not-be-recognised-by-gradle-kotlin-dsl"](https://stackoverflow.com/questions/45753733/ext-in-buildscript-can-not-be-recognised-by-gradle-kotlin-dsl)：Gradle Groovy DSL 中我们熟悉的 `ext` 去哪里了？Gradle Kotlin DSL 中的 `extra` 又是什么？
3. ["ExtraPropertiesExtension"@Gradle](https://docs.gradle.org/4.7/dsl/org.gradle.api.plugins.ExtraPropertiesExtension.html)
4. ["Set gradle.ext in settings.gradle.kts with Gradle Kotlin DSL"@Tura](https://stackoverflow.com/questions/57603795/set-gradle-ext-in-settings-gradle-kts-with-gradle-kotlin-dsl)：Kotlin 的插件中如何访问 `extra` 字段
5. ["Reference property in Gradle Properties"@Zsolt Boldizsár](https://stackoverflow.com/questions/56363135/reference-property-in-gradle-properties)
6. ["kotlin-dsl-samples/samples/extra-properties"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/extra-properties/build.gradle.kts)
7. ["kotlin-dsl-samples/samples/project-properties/"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/project-properties/build.gradle.kts)

另外，`buildscript{}` 配合 `ext` 或者 `extra` 时还有一个常见问题：

- ["构建指北 #5 含 buildscript 的脚本执行顺序"@2BAB](https://2bab.me/zh/blog/2017-06-21-daily-of-agp-buildscript-block-execute-order/)


## 小结

- Gradle 自带的一些参数多数还是和监控、调试相关的，平时发现编译问题的时候可以有意识地练习下这些调试方法、工具（比如 `--scan`）；
- 自定义的参数读取可以多结合 Kotlin 代理特性来使用，另外跨模块的 `extra` 的运用其实并不那么方便，因为 Key 作为 String 是比较松散的依赖关系，不少情况下可尝试使用 `buildSrc` 配合一些脚本来实现数据的共享；