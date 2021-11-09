# 常规任务


以 `buildSrc` 的构建环境为例，一个 `build.gradle(.kts)` 中的内容和可执行的 Task 并不都来源于 Gradle Java Plugin 自身，往往是多个插件的组合。

![](/media/regular-tasks-buildsrc.png)


## Base Plugin

Base Plugin 是 Gradle 中最基础的一个插件（没有之一），它最重要的一个部分是定义了 Gradle 中最常见的多个 Lifecycle Task。

- [The Base Plugin](https://docs.gradle.org/current/userguide/base_plugin.html)
- [Lifecycle tasks](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:lifecycle_tasks)

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

- [The Java Plugin](https://docs.gradle.org/current/userguide/java_plugin.html)

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

![](/media/regular-tasks-java-plugin-tasks.png)

## Android Gradle Plugin

![](/media/regular-tasks-app.png)

和之前一样，一个普通的 Android Application 模块其实也包含了多个 Plugin 和 Task

- [Build Workflow](http://tools.android.com/tech-docs/new-build-system/build-workflow)

![](/media/regular-tasks-android-build-flow.png)