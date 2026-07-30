pluginManagement {
    val flutterSdkPath =
        run {
            val properties = java.util.Properties()
            file("local.properties").inputStream().use { properties.load(it) }
            val flutterSdkPath = properties.getProperty("flutter.sdk")
            require(flutterSdkPath != null) { "flutter.sdk not set in local.properties" }
            flutterSdkPath
        }

    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")

    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "9.0.1" apply false
    id("org.jetbrains.kotlin.android") version "2.3.20" apply false
}

include(":app")

gradle.afterProject {
    if (plugins.hasPlugin("com.android.library") || plugins.hasPlugin("com.android.application")) {
        extensions.findByType(com.android.build.gradle.LibraryExtension::class.java)?.apply {
            compileSdkVersion(36)
        }
        extensions.findByType(com.android.build.gradle.AppExtension::class.java)?.apply {
            compileSdkVersion(36)
        }
    }
}
