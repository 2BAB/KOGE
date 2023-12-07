# Custom Tasks

Tasks are an essential and complex topic for anyone working with Gradle. This section focuses on simple task creation and straightforward extensions based on Gradle's default tasks or AGP Variant API. It does not cover advanced topics like lazy parameters, task dependency graphs, or complex plugins and tasks. Before diving in, it's helpful to review Gradle's official documentation for a foundational understanding:

- ["Authoring Tasks"@Gradle](https://docs.gradle.org/current/userguide/more_about_tasks.html)

## Creating Tasks

With the recent development of Gradle's lazy APIs, tasks can now be created lazily or immediately. The `create()` API immediately executes task creation and configuration, while `register()` defers it until the task is confirmed to be executed. Generally, the lazy creation API (`register()`) is preferred, reducing unnecessary performance overhead during the Configuration phase. Understand the differences between these two through the following resources:

1. ["Task Configuration Avoidance"@Gradle](https://docs.gradle.org/current/userguide/task_configuration_avoidance.html#task_configuration_avoidance)
2. ["What is the difference between registering and creating in Gradle Kotlin DSL"](https://stackoverflow.com/questions/53654190/what-is-the-difference-between-registering-and-creating-in-gradle-kotlin-dsl)

While `create()` returns a `Task`, `register()` yields a `TaskProvider`. If you need to access `Task` APIs not available in `TaskProvider`, you can use the `configure()` method:

1. ["Interface TaskProvider<T extends Task>"@Gradle](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/TaskProvider.html)

Apart from native API creation, it's also essential to know the delegating API creation method, which is more common in `build.gradle.kts` scripts and other script plugins:

1. ["by registering sample"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/task-dependencies/build.gradle.kts#L15)

Usually, when extending tasks, it's common to create a custom task class that extends `DefaultTask`. The most critical aspect of custom tasks is declaring inputs and outputs, as they influence cacheability and task graph computation:

1. ["Gradle task inputs and outputs"@Tom Gregory](https://tomgregory.com/gradle-task-inputs-and-outputs/)
2. ["Understanding Gradle #06 – Configuring Task Inputs and Outputs"@Jendrik Johannes](https://www.youtube.com/watch?v=Pj9hSRauiQM&list=PLWQK2ZdV4Yl2k2OmC_gsjDpdIBTN0qqkE&index=6&t=5s)

For simple tasks like copying a file, you can directly create a Gradle built-in task:

1. ["Working With Files"@Gradle](https://docs.gradle.org/current/userguide/working_with_files.html)
2. ["kotlin-dsl-samples/samples/copy"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/copy/build.gradle.kts)

For interaction with other plugins, it often involves configuring built-in tasks from these plugins:

``` Kotlin
tasks.named('generateDocumentation').configure {
	// configuration code ...
}
```

1. ["Stay Lazy — Use the Task Provider"@David Schreiber-Ranner](https://pspdfkit.com/blog/2019/gradle-task-configuration-avoidance-in-android-builds/)

## Creating Task Actions

Task actions are the actual carriers of task logic. There are two primary ways to add task actions. The first is by annotating methods within the task with `@TaskAction`:

1. ["TaskAction"@Gradle](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/TaskAction.html)
2. ["Writing a simple task class"@Gradle](https://docs.gradle.org/current/userguide/custom_tasks.html#sec:writing_a_simple_task_class)
3. ["Gradle custom task action order"](https://stackoverflow.com/questions/44296863/gradle-custom-task-action-order)

Task actions annotated with `@TaskAction` are automatically detected and executed, but their order is not guaranteed.

The second method, `doFirst()` / `doLast()`, is not for ordering but for quickly adding tasks or extending pre/post tasks for existing ones:

1. ["gradle custom task execution phase"@Peter Ledbrook](https://stackoverflow.com/questions/31390606/gradle-custom-task-execution-phase)
2. ["kotlin-dsl-samples/samples/extra-properties"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/3c977388f78bdcff1f7ed466e8d27feb5bf32275/samples/extra-properties/build.gradle.kts)
3. ["kotlin-dsl-samples/samples/multi-project-with-buildSrc"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/3c977388f78bdcff1f7ed466e8d27feb5bf32275/samples/multi-project-with-buildSrc/build.gradle.kts)

`doFirst()` / `doLast()` should be lightweight, especially as supplements to existing tasks; more complex extensions should be handled with new tasks.

## Task Dependencies

Task dependencies in a Gradle project form a Directed Acyclic Graph. To manually adjust task dependencies:

- The `dependsOn(...)` API is used to add forward dependencies, transform backward dependencies into forward ones, insert tasks at the beginning or end, etc.
- Occasionally, APIs like `shouldRunAfter(...)` and `mustRunAfter()` are used for tasks without direct dependencies.
- Avoid using `finalizedBy` as a backward dependency API; it's meant to add a finalizer task, similar to a `try...catch...` scenario.

Find more from below resources:

1. ["Task dependencies"@Gradle](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html#sec:task_dependencies)
2. ["Adding dependencies to a task"@Gradle](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:adding_dependencies_to_tasks)
3. ["Task API"@Gradle](https://docs.gradle.org/current/dsl/org.gradle.api.Task.html)
4. ["kotlin-dsl-samples/samples/task-dependencies"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/task-dependencies/build.gradle.kts)

1, 2, 3 are introductions to Task dependencies and `dependsOn`, 4 is a practical use case. Scenarios for automatically organizing Task dependencies can refer to the use of the AGP Variant API below, based on the `Provider` mechanism.


## AGP Variant API

Prior to version 7.0, the Android Gradle Plugin (AGP) lacked a defined API for third-party developers, necessitating direct examination of AGP's Task source code to extend its functionality. This involved identifying specific input and output interception points for manipulation. Post version 7.0, the Android team has provided standard entry points for third-party plugin developers:

1. ["Extend the Android Gradle plugin"@Android](https://developer.android.com/build/extend-agp)
2. ["android/gradle-recipes"@Android](https://github.com/android/gradle-recipes/tree/agp-7.0)
3. ["New APIs in the Android Gradle Plugin"@Android](https://medium.com/androiddevelopers/new-apis-in-the-android-gradle-plugin-f5325742e614)

> AGP includes plugin extension points to control build inputs and enhance its functionality through new steps that integrate with standard build tasks. Older AGP versions lacked an official API separate from its internal implementation. From version 7.0 onward, AGP will offer a set of stable official APIs that are reliable and trustworthy.

This excerpt, taken from the official documentation updated in late October 2021 (link 1), introduces the Variant API of AGP and its modular design for the first time. The document also details the Variant API's process, extension points, and how to access and modify AGP-produced Artifacts. To further understand this API's categorization and underlying design principles, refer to the "New Variant API" section in link 4, which consolidates content related to the Variant API from the 2020 DevSubmit and 2021 Google I/O. The code in link 2, maintained by the AGP official team, provides Variant API Samples for reference (and copying), such as the current process for obtaining the final output APK:

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

## Summary/Extension/Considerations

- For scenarios involving the extension of existing Tasks, consider using `doLast(...)` and `doFirst()` combined with a Script Plugin for simple wrapping.
- In Android contexts, when extending AGP with custom Tasks, prioritize methods offered by the new Variant/Artifact API. If unavailable, revert to traditional methods like hooking (reviewing source code, identifying corresponding Tasks, determining inputs and outputs, writing custom Tasks, and integrating them into the dependency graph through various means).