# Parameter Passing

This section explores the different types of options, arguments, properties, and variables in Gradle's build environment, discussing their differences, overriding relationships, and usage techniques.

## CLI Options

The most direct way to pass parameters in Gradle is through Command Line Interface (CLI) options. These options can be grouped into five categories, each extensively covered in the official Gradle documentation:

1. Debugging options
2. Performance options
3. Logging options
4. Execution options
5. Environment options

["CLI Options"@Gradle](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)

After getting a general idea, the following articles can deepen your understanding, focusing on debugging and performance monitoring:

1. ["Troubleshooting builds"@Stefan M.](https://medium.com/grandcentrix/how-to-debug-gradle-plugins-with-intellij-eef2ef681a7b)
2. ["How to debug Gradle Plugins with IntelliJ"@StefanM.](https://medium.com/grandcentrix/how-to-debug-gradle-plugins-with-intellij-eef2ef681a7b)

These articles emphasize debugging capabilities for plugins and scripts, noting that script debugging is still evolving.


## gradle.properties

Some performance-related switches, in addition to CLI syntax, also correspond to keys in `gradle.properties`. This file is Gradle's default location for various environment parameters. Regularly used parameters can be set here to avoid extensive CLI configurations. Its definition and the overriding relationship with CLI parameters are documented as follows:

1. ["Gradle properties"@Gradle](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_configuration_properties)
2. ["Build Environment"@Gradle](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_system_properties)

`gradle.properties` includes system properties, environment variables, project properties, and various plugin properties. AGP and Kotlin's properties can be further explored in these articles:

1. ["Configuring Gradle with gradle.properties"@Jean-Michel Fayard](https://dev.to/jmfayard/configuring-gradle-with-gradle-properties-211k)
2. ["How to Store Credentials in Android Projects Using gradle.properties"@Clint Paul](https://medium.com/swlh/how-to-safely-store-credentials-in-android-projects-using-gradle-properties-8cf500561095)
3. ["Dependencies versions in Gradle Kotlin DSL"@Kamil Seweryn](https://proandroiddev.com/dependencies-versions-in-gradle-kotlin-dsl-a8db15cedee2)

## Reading and Using Parameters

The last article from the previous section already shows how to manage dependency versions using `gradle.properties`. Here, we list some more generic custom parameter inputs and reading methods, focusing on understanding the `extra` and `by project` delegation reading methods:

1. ["Declaring variables"@Gradle](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:declaring_variables)
2. ["ext-in-buildscript-can-not-be-recognised-by-gradle-kotlin-dsl"](https://stackoverflow.com/questions/45753733/ext-in-buildscript-can-not-be-recognised-by-gradle-kotlin-dsl)
3. ["ExtraPropertiesExtension"@Gradle](https://docs.gradle.org/4.7/dsl/org.gradle.api.plugins.ExtraPropertiesExtension.html)
4. ["Set gradle.ext in settings.gradle.kts with Gradle Kotlin DSL"@Tura](https://stackoverflow.com/questions/57603795/set-gradle-ext-in-settings-gradle-kts-with-gradle-kotlin-dsl)
5. ["Reference property in Gradle Properties"@Zsolt Boldizsár](https://stackoverflow.com/questions/56363135/reference-property-in-gradle-properties)
6. ["kotlin-dsl-samples/samples/extra-properties"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/extra-properties/build.gradle.kts)
7. ["kotlin-dsl-samples/samples/project-properties/"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/project-properties/build.gradle.kts)

Additionally, a common issue arises when using `buildscript{}` with `ext` or `extra`:

- ["The execution order of scripts containing buildscript"@2BAB (in Simiplified Chinese)](https://2bab.me/zh/blog/2017-06-21-daily-of-agp-buildscript-block-execute-order/)

## Summary

- Many of the built-in parameters in Gradle are primarily related to monitoring and debugging. It's beneficial to practice these debugging methods and tools (like `--scan`) regularly, especially when encountering build issues. This proactive approach helps in quickly identifying and resolving problems.
- Custom paraeter reading can effectively leverage Kotlin's delegation features. However, using `extra` across modules is not always convenient due to the loose coupling nature of keys as strings. In many cases, it's advisable to utilize `buildSrc` combined with scripts for sharing data. This method provides a more structured and maintainable approach to managing shared configurations and dependencies across different modules in a Gradle project.
