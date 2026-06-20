# KOGE Introduction

<ImageZoom
  src="/media/koge-book-cover.png"
  :border="false"
  width="560"
/>

KOGE stands for Kotlin-oriented Gradle Essentials, a concise self-study handbook for Gradle. I don't intend to write a book that is only elaborated by me, nor a collection of "Awesome Gradle" projects. It lists a dozen of confusing points for newcomers, points out the learning sequence, and links to appropriate reference materials - from questions, source code, and samples already available on the Internet.

The handbook chooses Kotlin as the language for DSL script and plugin development. The Gradle Kotlin DSL gets excellent support of IDE code completion, active community, as an Android developer I prefer unified workflow on one language for both App and build tools development. The links and use cases in this handbook, while referred to the Android development, are intended to be easy to understand for Gradle users of other platforms as well.

In terms of the scope for "Essentials", it covers point 1 and a few of point 2 below. (They are mastering levels of Gradle and Android build-tools development.) You will not be afraid to read/modify scipts anymore with the help of KOGE, and get to know how to create a simple task/task action, and efficiently manage the project.

> 1. "Basic usage only": I'm able to modify `build.gradle(.kts)`, and  the understand concept of Gradle lifecycle and tasks.
> 2. "Automation Optimization": I'm able to add additional scripts/tasks to optimize the build flow, the CI/CD, the maintainability, etc.
> 3. "Extend build functionality": I'm able to add complex tasks or Gradle plugins to extend build functionality such as annotation processor, bytecode transformer, and anything that enhances Gradle or platform plugins(Java/Kotlin/Android).
> 4. ...

For advanced Gradle and Android Gradle Plugin (AGP) skills with Kotlin, please refer to another book authored by El: *[Extending Android Builds](https://eab.2bab.com)*. KOGE is served as a preparatory lesson for this book.

<ImageZoom
  src="/media/eab-intro.png"
  :border="false"
  width="560"
/>

## Copyright Statement

1. Content created *individually* adheres to the **[Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans)** license.
2. *Linked references* are embedded in the format of `"Title"@Author`, and any minimal *content references* are provided in the context with the aforementioned *linked reference* format, including the original text links.
3. Any form of reference does not involve modifications to the original text.
4. The primary sources of referenced content include official documentation and Github Repositories for Gradle, Android, and Kotlin. Other materials mostly consist of openly available blog articles on platforms like Medium/dev.to, as well as personal blog articles and Github code repositories.

## About

Manual is continuously being updated 🚧... Current version number↓

![GitHub tag](https://img.shields.io/github/tag/2BAB/KOGE.svg)

If you would like to contribute, please redirect to the [KOGE Github repo](https://github.com/2BAB/KOGE). Any other questions, please drop your message to [xx2bab@gmail.com](mailto:xx2bab@gmail.com).


## Contributors List

The main contributor - El, who is a seasoned software engineer residing in Singapore. With a wealth of experience in Android application infrastructure, he has spent years delving into technologies like Gradle, AGP, KSP, bytecode transformation, and modularity. His passion for Android development extends beyond coding—he finds immense joy in sharing insights through blog posts, podcasts, books, and conference presentations in both English and Mandarin. Since 2022, he has been recognized as a Google Developer Expert (GDE) for Android. During his downtime, he enjoys maintaining various open-source plugins and utilities that add value to the developer community. You can find him across platforms under the identity “2BAB”.

- 2BAB's Engineering Blog: [https://2bab.com/](https://2bab.com/)
- X(Twitter): [https://twitter.com/xx2bab/](https://twitter.com/xx2bab/)
- LinkedIn: [https://linkedin.com/in/2bab/](https://linkedin.com/in/2bab/)

Besides, you can find all contributors below:

<a href="https://github.com/2BAB/KOGE/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=2BAB/KOGE" />
</a>
