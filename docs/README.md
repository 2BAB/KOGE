# KOGE Introduction

<ImageZoom 
  src="https://raw.githubusercontent.com/2BAB/KOGE/main/koge-book-cover.png" 
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

## Copyright Statement

1. Content created *individually* adheres to the **[Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans)** license.
2. *Linked references* are embedded in the format of `"Title"@Author`, and any minimal *content references* are provided in the context with the aforementioned *linked reference* format, including the original text links.
3. Any form of reference does not involve modifications to the original text.
4. The primary sources of referenced content include official documentation and Github Repositories for Gradle, Android, and Kotlin. Other materials mostly consist of openly available blog articles on platforms like Medium/dev.to, as well as personal blog articles and Github code repositories.

## About

Manual is continuously being updated 🚧... Current version number↓

![GitHub tag](https://img.shields.io/github/tag/2BAB/KOGE.svg)

If you would like to contribute, please redirect to the [KOGE Github repo](https://github.com/2BAB/KOGE). Any other questions, please drop your message to [xx2bab@gmail.com](mailto:xx2bab@gmail.com).