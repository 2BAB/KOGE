# 更多

## KOGE 怎么没有自定义 Plugin 的内容？

如[简介](./README.md)所述，KOGE 的初衷仅为“**帮助大家理解脚本、编写脚本，和常见 Gradle 工程化实践**”，这也是受众面最广、新手最疑惑的一些内容。KOGE 会不断在这个范围内扩充有价值的材料，完善整体大纲。

## 《Android 构建与架构实战》

若学完本手册意犹未尽，还想进一步提升构建知识储备，包括应用到 Android 开发的实战中，欢迎购买 AB 的[《Android 构建与架构实战》](https://2bab.me/zh/blog/2023-05-14-extend-android-build-zh-unevils/)，系统学习 Gradle 插件开发和 AGP 的内核设计。

## Gradle 进阶学习材料

针对 Gradle 本身的进阶内容：

1. ["Gradle Goodness"@Mr.Haki](https://blog.mrhaki.com/search/label/Gradle%3AGoodness)：只要你搜索过 Gradle 相关的资料，大概率都看过他的博客，其 "Gradle Goodness" 涵盖了形形色色、甚至犄角旮旯的 Gradle 相关问题、解法、实践，想要深入 Gradle 构建的内容，不拜读这里的文章那便是不全面的。不过 Gradle 发展迅速，一些三五年前或更早的解决方案可能现在已经不适用，可以重点关注最近几年发布的内容。
2. ["Understanding Gradle"@Jendrik Johannes](https://www.youtube.com/channel/UCxACdAdoVVimgPoFwbdHUkQ/videos)：一位 Gradle 的前员工离职后做的视频教学，十分推荐（他个人也提供专业的咨询服务）。
3. ["Gradle Hero"@Tom Gregory](https://gradlehero.com/)：教程/课程/文章都有，其中免费的内容也做的很有条理。
4. ["Gradle Plugin Tutorial for Android: Getting Started"@
Bhavesh Misri](https://www.raywenderlich.com/22198417-gradle-plugin-tutorial-for-android-getting-started#toc-anchor-001)：如果脚本插件不够满足你的需求（特别是需要把你的作品共享给其他团队时），那么你可以考虑编写二进制插件，这份教程完整地说明了怎么从一个 Task 开始，到脚本插件，到 buildSrc 内的二进制插件，到发布一个独立二进制插件。

## AGP 进阶学习材料

以 AGP 为主的进阶内容：

1. "Gradle and AGP Build APIs"@Android：一个 Android 官方的系列文章 + 视频，简单介绍了如何自定义一个和 Android 构建系统互动的 Gradle Plugin，运用了最新的 Variant&Artifact API：
    1. [Configure your build](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-configure-your-build-9a10db5b2262)
    2. [How to write a plugin](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-how-to-write-a-plugin-1695b590e4ec)
    3. [Taking your plugin to the next step!](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-taking-your-plugin-to-the-next-step-95e7bd1cd4c9)
    4. [Gradle and AGP build APIs - MAD Skills - Playlists](https://youtube.com/playlist?list=PLWz5rJ2EKKc8fyNmwKXYvA2CqxMhXqKXX)：其中第一节是 1 分钟的介绍短片，2、3、4 分别对应上述三篇文章，5、6 则为直播问答还有社区小贴士。
2. [From Gradle properties to AGP APIs (Android Dev Summit '19) ](https://www.youtube.com/watch?v=OTANozHzgPc): 讲述了 AGP 7.0 架构更新的设计初衷（本视频内容是基于还在 3.x 的时候），为什么 Lazy Configuration 是整个架构的基石。理解这个视频对于理解后续几年 AGP 的演进有极其重要的帮助。
3. [android/gradle-recipes](https://github.com/android/gradle-recipes)：AGP 7.0+ 开始孵化的一个 samples 集合的 repository，目前目录已经趋于完善。
4. [Document -> Android Gradle Plugin -> Write Gradle plugins](https://developer.android.com/build/extend-agp)：扩展 AGP 插件的文档，在 AGP 出现的九年后终于有了这样一篇正式文档介绍与 AGP 的交互方式。
5. [Issue Tracker -> Android Public Tracker -> Android Development -> Android Studio](https://issuetracker.google.com/issues?q=status:open%20componentid:826777&s=created_time:desc)：AGP 的 bug 请提交到上面这个 issue tracker 的路径，即 Android Studio 的类别下，然后在帖子里声明你的问题是 AGP 相关的，后续就会被 Google 的员工分配到一个子路径下（Gradle）。外部账户暂时无法直接提交到 Gradle/AGP 的类别。


## 持续关注

如果你感兴趣 Gradle 和 AGP 相关内容，可以关注或订阅 ：

1. 2BAB 的[博客](https://2bab.me/zh/)
2. AB 的 [Github](https://github.com/2bab/)
3. 微信公众号（扫码下图）。

![](https://2bab-images.lastmayday.com/blog/%E5%85%AC%E4%BC%97%E5%8F%B7.jpg?imageslim)