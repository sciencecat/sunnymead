# Sunnymead - 9Types app

| Environment | Branch  | Url                                      |
|-------------|---------|------------------------------------------|
| Production  | master  | https://sunnymead.herokuapp.com/         |

### Dependencies

##### NodeJS 5.11.x >

```
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

##### Ionic 1.x + Cordova

```
$ npm install -g cordova ionic
```

##### Java JDK 8+

```
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
```

##### Android SDK API 21+

[See this page to install the Android SDK](https://developer.android.com/studio/index.html)

### Building

```
$ cd app
$ ionic platform add android
$ ionic build android
```

The apk file will be generated on ```app/platforms/android/build/outputs/apk/android-debug.apk```

### Data

All the questions / type description are stored on ```app/www/src/data``` folder.
The file format are in yaml, see the [documentation](https://github.com/nodeca/js-yaml).

### The Website

The website runs a copy of the app's code that is on branch **master**.
Deploy begins automatically when there is a new commit on branch master.
