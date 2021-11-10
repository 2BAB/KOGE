# 常规任务


本节我们将了解常规的 Gradle Task 都来自于哪里，它们背后有怎么样的依赖关系。


## Base Plugin

以常见的 `buildSrc` 的构建环境为例，一个 `build.gradle(.kts)` 中的内容和可执行的 Task 并不都来源于 Gradle Java Plugin 自身，往往是多个插件的组合。

<ImageZoom 
  src="/media/regular-tasks-buildsrc.png" 
  :border="false" 
  width="100%"/>

其中 Base Plugin 是 Gradle 中最基础的插件之一，它最重要的一个部分是定义了 Gradle 中最常见的多个 Lifecycle Task。

- [The Base Plugin](https://docs.gradle.org/current/userguide/base_plugin.html)：了解 Base Plugin 的全貌，包括后面提到的基础 tasks。
- [Lifecycle tasks](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:lifecycle_tasks)：了解什么是 Lifecycle tasks。

在 Android 开发中经常使用到的 CLI 任务就是基于这些节点进行拓展：

- `clean`
- `check`
- `assemble`
- `build`
- `buildConfiguration`
- `cleanTask`

剩余的配置不太常用，`BasePluginExtension` 中的 `archiveBaseName` `archiveVersion` 等参数在其他中插件常常被用来当作兜底的产物名称。

``` Kotlin
base {
    archivesName.set("gradle")
}
```


## Java Plugin

如上所述，Java Plugin 内部其实也使用到了 Base Plugin：

``` Java
public class JavaPlugin implements Plugin<Project> {
    @Override
    public void apply(final Project project) {
        ...
        final ProjectInternal projectInternal = (ProjectInternal) project;
        project.getPluginManager().apply(JavaBasePlugin.class);
        ...
    }
}
public class JavaBasePlugin implements Plugin<Project> {
    @Override
    public void apply(final Project project) {
        ProjectInternal projectInternal = (ProjectInternal) project;
        project.getPluginManager().apply(BasePlugin.class);
        project.getPluginManager().apply(JvmEcosystemPlugin.class);
        project.getPluginManager().apply(ReportingBasePlugin.class);
        ...
    }
}    
```

同时，它扩展了我们再 Android 开发中也经常见到的 Task、SourceSet、Dependency Configurations：

- [The Java Plugin](https://docs.gradle.org/current/userguide/java_plugin.html)：了解 Java Plugin 的全貌，熟悉它的配置和任务对 Android Gradle Plugin 的理解也会有很多帮助。

<ImageZoom 
  src="/media/regular-tasks-java-plugin-tasks.png" 
  :border="false" 
  width="100%"/>


## Android Gradle Plugin

<ImageZoom 
  src="/media/regular-tasks-app.png" 
  :border="false" 
  width="100%"/>

如上所述，一个普通的 Android Application 模块其实也包含了多个 Plugin。由于有大量资源文件，以及 BuildTypes 和 Variant 的加入，使得 Task 的数量又翻了几倍。在了解具体的 Task 前，最好先了解下面这张 Android Build WorkFlow 流程图：

- [Build Workflow](http://tools.android.com/tech-docs/new-build-system/build-workflow)

<ImageZoom 
  src="/media/regular-tasks-android-build-flow.png" 
  :border="false" 
  width="100%"/>

我们最常用的命令莫过于 `assembleDebug` `clean` `testDebug` 等，以 `clean assembleDebug` 的组合为例，执行下方命令你会看到一个新建的纯净 Android Application 工程需要哪些 Task 以及他们的执行顺序：

``` Shell
$ ./gradlew clean :app:assembleDebug --dry-run

:clean SKIPPED
:app:clean SKIPPED
:app:preBuild SKIPPED
:app:preDebugBuild SKIPPED
:app:compileDebugAidl SKIPPED
:app:compileDebugRenderscript SKIPPED
:app:generateDebugBuildConfig SKIPPED
:app:checkDebugAarMetadata SKIPPED
:app:generateDebugResValues SKIPPED
:app:generateDebugResources SKIPPED
:app:mergeDebugResources SKIPPED
:app:packageDebugResources SKIPPED
:app:parseDebugLocalResources SKIPPED
:app:createDebugCompatibleScreenManifests SKIPPED
:app:extractDeepLinksDebug SKIPPED
:app:processDebugMainManifest SKIPPED
:app:processDebugManifest SKIPPED
:app:processDebugManifestForPackage SKIPPED
:app:processDebugResources SKIPPED
:app:compileDebugKotlin SKIPPED
:app:javaPreCompileDebug SKIPPED
:app:compileDebugJavaWithJavac SKIPPED
:app:mergeDebugShaders SKIPPED
:app:compileDebugShaders SKIPPED
:app:generateDebugAssets SKIPPED
:app:mergeDebugAssets SKIPPED
:app:compressDebugAssets SKIPPED
:app:processDebugJavaRes SKIPPED
:app:mergeDebugJavaResource SKIPPED
:app:checkDebugDuplicateClasses SKIPPED
:app:desugarDebugFileDependencies SKIPPED
:app:mergeExtDexDebug SKIPPED
:app:mergeLibDexDebug SKIPPED
:app:dexBuilderDebug SKIPPED
:app:mergeProjectDexDebug SKIPPED
:app:mergeDebugJniLibFolders SKIPPED
:app:mergeDebugNativeLibs SKIPPED
:app:stripDebugDebugSymbols SKIPPED
:app:validateSigningDebug SKIPPED
:app:writeDebugAppMetadata SKIPPED
:app:writeDebugSigningConfigVersions SKIPPED
:app:packageDebug SKIPPED
:app:createDebugApkListingFileRedirect SKIPPED
:app:mergeDebugNativeDebugMetadata SKIPPED
:app:assembleDebug SKIPPED
```

可惜我们并没有简单的办法在此处展示所有 Task 的依赖关系，不过有两种常见的办法可以自行查看依赖树：

1. 第一种，使用 `--scan` 的 Timeline 功能，对于每个执行的 Task 你可以查看其前置和后置的 Task：

``` Shell
$ ./gradlew clean :app:assembleDebug --scan
```

<ImageZoom 
  src="/media/regular-tasks-predecessors.png" 
  :border="false" 
  width="100%"/>

2. 第二种，使用现成的依赖树分析插件，可以导出文字版或者可视化的依赖关系，例如 [gradle-taskinfo](https://gitlab.com/barfuin/gradle-taskinfo#gradle-taskinfo)：

``` Shell
$ ./gradlew tiTree assemble

:assemble                             (org.gradle.api.DefaultTask)
+--- :jar                             (org.gradle.api.tasks.bundling.Jar)
|    `--- :classes                    (org.gradle.api.DefaultTask)
|         +--- :compileJava           (org.gradle.api.tasks.compile.JavaCompile)
|         `--- :processResources      (org.gradle.language.jvm.tasks.ProcessResources)
+--- :javadocJar                      (org.gradle.api.tasks.bundling.Jar)
|    `--- :javadoc                    (org.gradle.api.tasks.javadoc.Javadoc)
|         `--- :classes               (org.gradle.api.DefaultTask)
|              +--- :compileJava      (org.gradle.api.tasks.compile.JavaCompile)
|              `--- :processResources (org.gradle.language.jvm.tasks.ProcessResources)
`--- :sourcesJar                      (org.gradle.api.tasks.bundling.Jar)
```

对于每个 Task 执行的操作，通过 Task Name 已经可以了解个大概。（如果想快速过一遍 Task 的实现内容，可以参考这篇基于 AGP 3.0.1 版本的[分析](https://juejin.cn/post/6844903854190886925)）

## 小结

- 初学者可以从简单的模型开始理解，否则一上来就看这么多 AGP 的相关 Task 很难消化。
- Lifecycle Task 的概念很简单也很有用，自定义 Task 时也可以灵活运用扩展更多的 Lifecycle Task。