# 自定义任务

Task 是每个接触 Gradle 的人都绕不开、也是最难分解的一个话题。本节我们限定的范围是：仅讨论简单的 Task 创建，和基于 Gradle 默认 Task 或 AGP Variant API 的简单扩展，对于惰性参数、任务依赖图、复杂的插件和任务等不做扩展。在开始前，可以快速浏览 Gradle 官方的这篇文档，做好通识性铺垫：

- ["Authoring Tasks"@Gradle](https://docs.gradle.org/current/userguide/more_about_tasks.html)


## 创建 Task

经过了最近今年的发展，Gradle 的一系列惰性 API 已经十分成熟，其中就包括了 Task 的惰性创建 vs 直接创建。直接创建 `create()` API 会立即执行 Task 的创建和配置，而 `register()` API 则会延迟到该 Task 已确定会被执行的情况下才会创建并配置。没有特殊情况时，一般我们默认使用惰性创建 API，它减少了 Configuration 阶段不必要的性能损耗。我们可以通过一份官方的文档和一份 StackOverflow 的问答详细了解他们的区别：

1. ["Task Configuration Avoidance"@Gradle](https://docs.gradle.org/current/userguide/task_configuration_avoidance.html#task_configuration_avoidance)
2. ["What is the difference between registering and creating in Gradle Kotlin DSL"](https://stackoverflow.com/questions/53654190/what-is-the-difference-between-registering-and-creating-in-gradle-kotlin-dsl)

`create()` 直接得到的结果是 `Task` 而 `register()` 则是 `TaskProvider`，如果你想调用一些 `TaskProvider` 中没有的 `Task` 的 API，可以使用 `configure()` 方法进行周转（参见下方的配置第三方 `Task` 的例子）：

1. ["Interface TaskProvider<T extends Task>"@Gradle](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/TaskProvider.html)

熟悉了上述的原生 API 创建，你还需要了解代理 API 创建的办法，在 `build.gradle.kts` 脚本或其他脚本插件中，这种简洁的创建方式其实更加常见。代理的运用我们在之前的 Kotlin DSL 一节已经给过相关的资料，这里我们直接看一个 `by registering` 的用例：

1. ["by resgistering sample"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/task-dependencies/build.gradle.kts#L15)

一般地，我们会在扩展 Task 时，自定义一个 Task 类继承 `DefaultTask` (参考文初的文档），其中自定义最重要的部分便是输入输出的声明，它们影响了 Cache、Task Graph 等其他特性的实现：

1. ["Gradle task inputs and outputs"@Tom Gregory](https://tomgregory.com/gradle-task-inputs-and-outputs/)
2. ["Understanding Gradle #06 – Configuring Task Inputs and Outputs"@Jendrik Johannes](https://www.youtube.com/watch?v=Pj9hSRauiQM&list=PLWQK2ZdV4Yl2k2OmC_gsjDpdIBTN0qqkE&index=6&t=5s)

当然，一些简单的任务像 Copy 一个文件，你也可以直接创建一个 Gradle 内置的 Task，例如：

1. ["Working With Files"@Gradle](https://docs.gradle.org/current/userguide/working_with_files.html)
2. ["kotlin-dsl-samples/samples/copy"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/copy/build.gradle.kts)

其他上层的插件，我们亦可如法炮制。不过事实上与其他插件的互动更多是“获取其他插件内建的 Task 进行额外配置”，例如针对 `generateDocumentation` Task 进行配置修改，传入更多需要生成文档的源码进去：

``` Kotlin
tasks.named('generateDocumentation').configure {
	// expensive task configuration code ...
}
```

1. ["Stay Lazy — Use the Task Provider"@David Schreiber-Ranner](https://pspdfkit.com/blog/2019/gradle-task-configuration-avoidance-in-android-builds/)


## 创建 TaskAction

Task 并不是最小的执行单元，其逻辑具体实现的载体称之为 Task Action。一般地，我们有两种方式添加 Task Action。第一种是给 Task 内部的方法添加 `@TaskAction` 注解：

1. ["TaskAction"@Gradle](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/TaskAction.html)
2. ["Writing a simple task class"@Gradle](https://docs.gradle.org/current/userguide/custom_tasks.html#sec:writing_a_simple_task_class)
3. ["Gradle custom task action order"](https://stackoverflow.com/questions/44296863/gradle-custom-task-action-order)


Task Action 会在运行到该 Task 时自动检测和运行带有 `@TaskAction` 注解的方法，因此有多个，但是多个 `@TaskAction` 的执行顺序是“无序的”（见上述第三个链接）。

第二种有序的 API `doFirst()` / `doLast()` 并不是为了解决上述无序的问题，它主要的使用场景在于：

- 快速创建 Task 时的任务添加（你可以经常在 Gradle 官方的文档中看见）。
- 为已有的 Task(s) 扩展一个前置或者后置任务。


1. ["gradle custom task execution phase"@Peter Ledbrook](https://stackoverflow.com/questions/31390606/gradle-custom-task-execution-phase)
2. ["kotlin-dsl-samples/samples/extra-properties"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/3c977388f78bdcff1f7ed466e8d27feb5bf32275/samples/extra-properties/build.gradle.kts)
3. ["kotlin-dsl-samples/samples/multi-project-with-buildSrc"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/3c977388f78bdcff1f7ed466e8d27feb5bf32275/samples/multi-project-with-buildSrc/build.gradle.kts)

`doFirst()` / `doLast()` 应该是轻量的，特别作为已有 Task 的补充时；复杂的扩展则应该再创建一个新的 Task，方便维护其 input/output。

## 依赖关系

Gradle Project 的 Tasks 最终会构建成有向无环图，针对**手动梳理**的情况，他们的依赖关系：

- 主要是靠 `dependsOn(...)` API 进行调整，向前依赖、向后依赖（转换成向前依赖），插入第一个 Task、最后一个 Task 等等操作全依赖 `dependsOn(...)` 的小技巧去添加依赖；
- 另外，在调整无直接依赖关系的 Task 时偶尔会用到 `shouldRunAfter(...)` `mustRunAfter()` 等 API；
- 最后，请不要把 `finalizedBy` 当作向后依赖的一个 API 来使用，它的作用是针对有资源清理需求的 Task 添加一个“收尾”的 Finilazer Task，类似于 `try...catch...` 的场景。

1. ["Task dependencies"@Gradle](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html#sec:task_dependencies)
2. ["Adding dependencies to a task"@Gradle](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:adding_dependencies_to_tasks)
3. ["Task API"@Gradle](https://docs.gradle.org/current/dsl/org.gradle.api.Task.html)
4. ["kotlin-dsl-samples/samples/task-dependencies"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/task-dependencies/build.gradle.kts)

其中 1、2、3 是 Task 依赖关系以及 `dependsOn` 的介绍，4 是一个实际的使用案例。自动梳理 Task 依赖的的场景可以参考下方 AGP Variant API 的使用，基于 `Provider` 的机制。

## AGP Variant API

在 7.0 版本之前的 AGP，由于没有明确提供的 API 供第三方开发者使用，想要扩展 AGP 的功能必须查看其具体的 Task 源码实现，再从中获得某个时刻输入输出的拦截点进行操作。7.0 之后，Android 官方提供了标准的给第三方插件开发者的切入点：

1. ["Extend the Android Gradle plugin"@Android](https://developer.android.com/build/extend-agp)
2. ["android/gradle-recipes"@Android](https://github.com/android/gradle-recipes/tree/agp-7.0)
3. ["New APIs in the Android Gradle Plugin"@Android](https://medium.com/androiddevelopers/new-apis-in-the-android-gradle-plugin-f5325742e614)
4. ["新的 Variant API"@2BAB](https://2bab.me/zh/blog/2021-06-17-google-io-21-agp-recap/)


> AGP 包含插件扩展点，用于控制 build 输入并通过可与标准 build 任务集成的新步骤扩展其功能。旧版 AGP 没有与内部实现明确分开的官方 API。从 7.0 版本开始，AGP 将提供一组稳定的官方 API，值得您信赖。

上面这段话截取自官方在 2021 年 10 月底更新的文档（链接 1），首次介绍了 AGP 的 Variant API 来源和分离式的设计。文档还详细描述了 Variant API 的流程和扩展点、如何访问和修改 AGP 产出的 Artifacts 等等。想进一步了解该 API 的分类、背后的设计原理可以参考链接 4 中“新的 Variant API”部分，其整合了 2020 年 DevSubmit 和 2021 年 GoogleIO 中 Variant API 的相关内容。最后链接 2 的代码是由 AGP 官方维护的 Variant API Samples，方便大家参考（拷贝）具体的 API 调用，例如获取最终输出 APK 的流程现在是：

``` Kotlin
// https://github.com/android/gradle-recipes/blob/agp-7.0/Kotlin/getApksTest/app/build.gradle.kts#L26
abstract class DisplayApksTask: DefaultTask() {

    @get:InputFiles
    abstract val apkFolder: DirectoryProperty

    @get:Internal
    abstract val builtArtifactsLoader: Property<BuiltArtifactsLoader>

    @TaskAction
    fun taskAction() {

        val builtArtifacts = builtArtifactsLoader.get().load(apkFolder.get())
            ?: throw RuntimeException("Cannot load APKs")
        builtArtifacts.elements.forEach {
            println("Got an APK at ${it.outputFile}")
        }
    }
}
        
androidComponents {
    onVariants { variant ->
        project.tasks.register<DisplayApksTask>("${variant.name}DisplayApks") {
            apkFolder.set(variant.artifacts.get(SingleArtifact.APK))
            builtArtifactsLoader.set(variant.artifacts.getBuiltArtifactsLoader())
        }
    }
}
```


## 小结/扩展/思考

- 针对已有 Task 扩展的场景可以仅使用 `doLast(...)` `doFirst()` + Script Plugin 简单地进行包装；
- Android 的场景下，自定义 Task 扩展 AGP 的场景，优先考虑新 Variant/Artifact API 提供的方法，没有的情况再按传统的办法去 Hook（看源码，找对应的 Task，找对应的输入输出，写自定义 Task，通过各种手段插入到依赖图中）。
