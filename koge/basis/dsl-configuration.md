# DSL Configuration

This section provides an overview of common DSL configurations.

## The Java/Kotlin Plugin

For beginners in Android development, it's recommended to start with the Java Plugin's DSL configuration, which has relatively fewer configurations to manage:

- ["The Java Plugin"@Gradle](https://docs.gradle.org/current/userguide/java_plugin.html#tab:configurations)
- ["Gradle | Kotlin"@Kotlin](https://kotlinlang.org/docs/gradle.html)

A quick review will reveal that the basic configurations for Android and Java/Kotlin are largely similar, such as source sets and dependency configurations.

Then, to gain a comprehensive understanding, explore these examples:

- ["kotlin-dsl-samples/samples/hello-kotlin"@Gradle](https://github.com/gradle/kotlin-dsl-samples/blob/master/samples/hello-kotlin/build.gradle.kts)
- ["google/iosched/model"@Google](https://github.com/google/iosched/blob/main/model/build.gradle.kts)

## Android Gradle Plugin

For the Android Gradle Plugin (AGP), the official “[Configure your build](https://developer.android.com/studio/build)” documentation thoroughly organizes all DSL build configurations. It's advisable to consult the standard glossary for specific details:

1. Build Types
2. Product Flavors
3. Build Variants
4. Manifest Entries
5. Dependencies
6. Signing
7. Code and Resource Shrinking
8. Multiple APK support

For specific AGP DSL parameters, refer to the new documentation center migrated to developer.android.com:

- ["Android Gradle plugin API reference"@Android](https://developer.android.com/reference/tools/gradle-api)

Further, comprehend the complete picture of a configuration file through these examples:

- ["google/iosched/mobile"@Google](https://github.com/google/iosched/blob/main/mobile/build.gradle.kts)