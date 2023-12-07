# Additional Information

## Why Doesn't KOGE Include Content on Custom Plugins?

As mentioned in the [introduction](./README.md), KOGE's primary goal is to "**help everyone understand scripts, write scripts, and familiarize themselves with common Gradle engineering practices**". This material represents the broadest audience interest and is where beginners often have the most questions. KOGE will continue to expand within this scope, adding valuable material and perfecting the overall outline.


## Advanced Gradle Learning Resources

For advanced content on Gradle itself:

1. ["Gradle Goodness"@Mr.Haki](https://blog.mrhaki.com/search/label/Gradle%3AGoodness): If you've ever searched for Gradle-related information, you've likely come across his blog. "Gradle Goodness" covers a wide range of Gradle-related issues, solutions, and practices. However, as Gradle evolves rapidly, solutions from three to five years ago might not be applicable today. Focus on the content published in recent years.
2. ["Understanding Gradle"@Jendrik Johannes](https://www.youtube.com/channel/UCxACdAdoVVimgPoFwbdHUkQ/videos): Highly recommended video tutorials by a former Gradle employee (who also offers professional consulting services).
3. ["Gradle Courses / Tutorials"@Tom Gregory](https://tomgregory.com/wp-content/uploads/2021/06/Gradle-task-inputs-outputs-1.png): Offers a range of tutorials, courses, and articles, with even the free content being very well-organized.
4. ["Gradle Plugin Tutorial for Android: Getting Started"@Bhavesh Misri](https://www.raywenderlich.com/22198417-gradle-plugin-tutorial-for-android-getting-started#toc-anchor-001): If script plugins don't fully meet your needs (especially when you want to share your work with other teams), consider writing binary plugins. This tutorial comprehensively explains how to start with a Task, progress to script plugins, then to binary plugins within buildSrc, and finally to publishing an independent binary plugin.

## Advanced AGP Learning Resources

Advanced content focused on AGP:

1. "Gradle and AGP Build APIs"@Android: A series of official Android articles and videos briefly introducing how to customize a Gradle Plugin that interacts with the Android build system, utilizing the latest Variant&Artifact API:
    1. [Configure your build](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-configure-your-build-9a10db5b2262)
    2. [How to write a plugin](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-how-to-write-a-plugin-1695b590e4ec)
    3. [Taking your plugin to the next step!](https://medium.com/androiddevelopers/gradle-and-agp-build-apis-taking-your-plugin-to-the-next-step-95e7bd1cd4c9)
    4. [Gradle and AGP build APIs - MAD Skills - Playlists](https://youtube.com/playlist?list=PLWz5rJ2EKKc8fyNmwKXYvA2CqxMhXqKXX): The first session is a 1-minute introduction clip, with sessions 2, 3, and 4 corresponding to the above articles. Sessions 5 and 6 are live Q&A sessions with tips from community.
2. [From Gradle properties to AGP APIs (Android Dev Summit '19)](https://www.youtube.com/watch?v=OTANozHzgPc): Discusses the design intent behind the AGP 7.0 architecture update (based on the 3.x version at the time) and explains why Lazy Configuration is fundamental to the architecture. Understanding this video is crucial for comprehending the evolution of AGP in subsequent years.
3. [android/gradle-recipes](https://github.com/android/gradle-recipes): A repository of sample collections incubated from AGP 7.0+, now nearing completion.
4. [Document -> Android Gradle Plugin -> Write Gradle plugins](https://developer.android.com/build/extend-agp): An official document on extending AGP plugins, released nine years after AGP's inception, detailing interactions with AGP.
5. [Issue Tracker -> Android Public Tracker -> Android Development -> Android Studio](https://issuetracker.google.com/issues?q=status:open%20componentid:826777&s=created_time:desc): Please submit AGP bugs under the Android Studio category in the issue tracker mentioned above, and state that your issue is AGP-related in your post. It will then be assigned to a sub-category (Gradle) by Google staff. External accounts currently cannot directly submit to the Gradle/AGP category.

## Stay Updated

If you're interested in Gradle and AGP related content, consider following or subscribing to:

1. El's [blog](https://2bab.me/zh/)
2. El's [GitHub](https://github.com/2bab/)