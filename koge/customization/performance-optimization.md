# Performance Optimization

In this section, we will explore some common, easily implementable, and effective performance optimization strategies.

## General Optimization Strategies

When considering universal strategies, it is best to start with fundamental methods. Aside from upgrading external hardware conditions, the most basic strategies include:

- **Reducing Load**: Minimize unnecessary Configurations and Tasks.
- **Caching & Incremental Builds**: Cache compilation results and support incremental compilation.
- **Concurrency**: Enable parallel execution of Projects and Tasks.

These strategies should be considered in two phases: **Configuration Phase** and **Execution Phase**.

Optimizations during the Configuration Phase:

1. Consider enabling Gradle features that are not turned on by default, such as `--configuration-cache`. These features might still be in development (not yet stable) or require script modifications to work effectively.
2. Consider upgrading your own scripts, plugins, and third-party plugins. For example, adopting a lazy approach to creating Tasks, and modifying scripts to be compatible with the Configuration Cache.

Optimizations during the Execution Phase:

1. Consider enabling Gradle features, like `--parallel`, which, although they have their limitations and imperfections, can sometimes cause compilation errors in extreme cases.
2. Some plugins could be disabled in Debug mode: Test-related plugins, like Jacoco, might only be needed in CI environments, and you can add a switch in the local.properties to turn it off by default; Resource optimization plugins, like my open-source ScratchPaper plugin, which modifies App icons and adds metadata to distinguish test versions, can be set to activate only when preparing test packages.
3. Consider upgrading your own scripts, plugins, and third-party plugins. For instance, using `WorkExecutor` to support parallel sub-tasks within a task, recent versions of AGP and Kotlin Plugin have also modified their implementations for sub-task parallelism based on this feature.

Most of the above content can be found in Gradle’s documentation:

1. ["Configuration cache"@Gradle](https://docs.gradle.org/current/userguide/configuration_cache.html)
2. ["Task Configuration Avoidance"@Gradle](https://docs.gradle.org/current/userguide/task_configuration_avoidance.html#task_configuration_avoidance)
3. ["Developing Parallel Tasks using the Worker API"@Gradle](https://docs.gradle.org/current/userguide/worker_api.html#header)
4. ["Parallel project execution"@Gradle](https://docs.gradle.org/current/userguide/multi_project_configuration_and_execution.html#sec:parallel_execution)

To delve deeper into each process's performance bottlenecks, you can use parameters like `--scan` and `--profile` or tools like `gradle-profile` to obtain detailed reports of the build process.

1. ["Improving the Performance of Gradle Builds"@Gradle](https://docs.gradle.org/current/userguide/performance.html): This introduces methods and tools for in-depth analysis, but the ratio of investment to return may not be significant for beginners.
2. ["Gradle Enterprise Gradle Plugin User Manual"@Gradle](https://docs.gradle.com/enterprise/gradle-plugin/?_ga=2.127298381.1900135053.1636116790-1881714751.1634284859#getting_set_up)
3. ["DIY Gradle build optimization"Alex Saveau](https://alexsaveau.dev/blog/gradle/performance/diy-gradle-build-optimization): This uses practical cases to show how to optimize based on results from tools like `--scan`.
4. ["Hello, my Gradle builds are slow!"@Android](https://medium.com/@liutikas/hello-my-gradle-builds-are-slow-483427e6eb4): A simple case study by the AndroidX team using `--scan` to analyze dependency download times (though it's a Gradle Enterprise commercial version example, the features used in this article are available in the free version).

## Android Build Optimization Strategies

For this part, I recommend referring to the AGP official documentation "[Optimize Your Build](https://developer.android.com/studio/build/optimize-your-build)". It is regularly updated with beneficial tips, but note that it leans more towards optimization strategies for Debug builds.

1. Ensure tools are up to date.
2. Create build variants for development.
3. Sync single-variant projects.
4. Avoid compiling unnecessary resources.
5. Disable Crashlytics for debug builds.
6. Use static build configuration values for debug builds.
7. Use static dependency versions.
8. Create library modules.
9. Create tasks for custom build logic.
10. Convert images to WebP format.
11. Disable PNG crunching.
12. Use incremental annotation processors.
13. Configure the JVM garbage collector.

## Summary

- Upgrading Gradle and related plugins including AGP is the simplest and most beneficial optimization strategy, followed by optimizing your own scripts and plugins.
- Although consistently updating Gradle and AGP requires a certain maintenance cost, not updating often proves to be more costly.
- There's no need to chase after "optimization tricks" articles, as they quickly become outdated; understanding the principles allows for more direct and effective optimization approaches.