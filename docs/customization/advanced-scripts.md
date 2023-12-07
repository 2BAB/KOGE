# Advanced Scripting

## Exploring More Script APIs

When writing scripts, beyond configuring Plugin extensions, sometimes it's necessary to interact with Gradle's own APIs, like the `Project` and `Settings` objects, and various shortcuts associated with them:

1. ["The Project API"@Gradle](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:project_api)
2. ["The script API"@Gradle](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:the_script_api)

## Script Plugins

Apart from the typical `build.gradle(.kts)` and `settings.gradle(.kts)` scripts and plugins used in projects, there's another type known as "Script Plugin" (Script Plugin). Strictly speaking, these are scripts that are defined outside the aforementioned scripts and do not follow a specific module. They can be referenced like plugins within module scripts. Gradle officially categorizes them under plugins, and their definition and usage can be found in the following articles:

- ["Types of plugins"@Gradle](https://docs.gradle.org/current/userguide/plugins.html#sec:types_of_plugins)
- ["Script plugins"@Gradle](https://docs.gradle.org/current/userguide/plugins.html#sec:script_plugins)

Script plugins, like regular binary plugins, can be applied using `apply(...)` or `id(...)`. However, scripts defined externally (like those stored with `build.gradle(.kts)` or loaded from the web) can typically only be referenced with `apply(...)`. `id(...)` is used for script plugins placed in `buildSrc` or other included build modules, known as Precompiled Script Plugins.

["Precompiled script plugins"@Gradle](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:precompiled_plugins)

Familiarity with Gradle Groovy DSL may include standalone script plugins like `maven.gradle` or `bintray.gradle`. For instance:

- ["bintray.gradle"@2BAB](https://github.com/2BAB/Seal/blob/2.0.0/bintray.gradle)

Switching to Gradle Kotlin DSL might raise questions about the usage of Standalone Script Plugins and the purpose of Precompiled Script Plugins. In the context of Gradle Kotlin DSL, the distinction between these two types of scripts is clear:

- Standalone Script Plugins have a limitation: you can't directly use externally defined dependencies, limiting their use for configuration plugins and similar tasks. A workaround is to re-declare `buildscript` within the script. These plugins are generally used for simpler tasks like custom tasks or file copying.
- Precompiled Script Plugins, as the name suggests, are compiled before being added to the build environment of all projects included in the current `settings.gradle.kts`. They are complete Gradle projects themselves, often using `kotlin-dsl` to support Kotlin language and DSL's Type-Safe Model Accessor.

For comparison between Groovy and Kotlin versions of Standalone Script Plugins, see:

- ["gradle-docker-modularity"@AlphonseBendt](https://github.com/abendt/gradle-docker-modularity)

The recommended practice is to use Precompiled Script Plugins. A simple example project is:

- ["project-with-buildSrc"@Kotlin](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/project-with-buildSrc)

More examples in `buildSrc` will be discussed later.

## buildSrc

`buildSrc` is a built-in module for "custom build logic" in Gradle, essentially an included build module. Gradle created `buildSrc` for logic that didn't necessitate being in an external module, simplifying the cost of customizing scripts and plugins for a project. Detailed information can be found in the documentation:

- ["Use buildSrc to abstract imperative logic"@Gradle](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html#sec:build_sources)

Examples of common uses for `buildSrc` include shared Kotlin classes and precompiled script plugins. Official Gradle samples and Android's Variant API usage in conjunction with `buildSrc` provide further insight:

1. ["Reuse gradle.kts function"](https://stackoverflow.com/questions/65513944/reuse-gradle-kts-function)
2. ["Include scripts with Gradle Kotlin DSL"](https://stackoverflow.com/questions/55335866/include-scripts-with-gradle-kotlin-dsl)
3. ["project-with-buildSrc"@Gradle](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/project-with-buildSrc)
4. ["buildSrc-plugin"@Gradle](https://github.com/gradle/kotlin-dsl-samples/tree/master/samples/buildSrc-plugin)
5. ["android/gradle-recipes/BuildSrc"@Android](https://github.com/android/gradle-recipes/tree/agp-7.1/BuildSrc)
6. ["2BAB/Polyfill

/buildSrc"@2BAB](https://github.com/2BAB/Polyfill/tree/master/buildSrc)

For enhancing engineering standards with `buildSrc`, consider these practices:

- ["Better Dependency Management Using buildSrc + Kotlin DSL"@SatyaPavanKantamani](https://proandroiddev.com/better-dependencies-management-using-buildsrc-kotlin-dsl-eda31cdb81bf): A common use for sharing dependencies.
- ["Gradle Goodness: Shared Configuration With Conventions Plugin"@Mr.Haki](https://blog.mrhaki.com/2021/02/gradle-goodness-shared-configuration.html): Sharing part of plugin configurations.

Lastly, let's discuss the "Included Build" concept in Gradle as mentioned earlier. ["Included build"](https://docs.gradle.org/current/userguide/composite_builds.html#composite_build_intro) primarily aims to fulfill two requirements:

1. The modules being included are independently developed projects.
2. The project that includes these modules wants to debug them.

Gradle adheres to a clear principle: "Convention over Configuration." Indeed, an included build combined with a Gradle Plugin can address the above requirements. However, the more universal a solution is, the higher its cost tends to be, often involving complex and tedious configurations and maintenance. `buildSrc` simplifies the process of customizing simple scripts and plugins, standardizing the module name and automatically compiling it into a JAR to be included in the build environment's classpath. The newer [version catalog](https://docs.gradle.org/current/userguide/platforms.html#sub:version-catalog) further refines this "convention," eliminating the need for `buildSrc` plus a custom `Dependencies` class, with a combination of DSL and TOML solving the problem.

The flexibility of the included build approach is significant, and over the years, best practices in the community have evolved into simpler and more straightforward solutions. Why not delve into the content of included build? Because KOGE, aimed at beginners, doesn't intend to explore deep into Plugin development. Most people won't encounter projects with over a million lines of code that require splitting, and these are the scenarios where included build is **directly used**.

## init.gradle(.kts)

- ["Initialization Scripts"@Gradle](https://docs.gradle.org/current/userguide/init_scripts.html)

In fact, `init.gradle(.kts)` can be considered a special type of script plugin. However, it differs in that it's not introduced within a specific `build.gradle(.kts)` or `settings.gradle(.kts)` but is loaded directly in Gradle's configuration, with a loading priority over all other scripts.

`init.gradle(.kts)` is subject to the same limitations as external scripts and should not perform overly complex operations within an initialization script. More versatile configurations should be kept simple to avoid overburdening some projects with unnecessary complexity or requiring additional properties to control their behavior. Logics without a mandatory loading time can be independently developed as plugins or scripts, allowing specific projects to choose and configure them conveniently.

## Summary

- For many common engineering needs, such as sharing configurations or copying files, script plugins are sufficient. There's no need to package everything into binary plugins, especially when they are used only within your own projects.
- Understanding "Convention over Configuration" helps in comprehending the relationship between various Gradle features.