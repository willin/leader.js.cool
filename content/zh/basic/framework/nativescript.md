---
title: NativeScript
description: ''
position: 1708
category: 知识篇-常用框架
---

## 安装

**_注意_**：

MacOS 10.12 及之前版本 系统 ruby 的版本为 2.0.0，其中有一个依赖项的最新版本需要 2.2.2 以上。

先手动安装该依赖的旧版本：

```bash
gem install activesupport -v 4.2.7.1
```

然后参考文档进行安装：<http://docs.nativescript.org/start/ns-setup-os-x>

安装 cocoapods 之后，执行：

```bash
pod setup --verbose
```

进行 cocoapods 初始化。

最终执行 `tns doctor` 检查是否安装成功。

## Client

### 目录结构

```
.
├── app
│   ├── App_Resources
│   │   ├── Android
│   │   └── iOS
│   ├── app.css
│   ├── app.ts
│   └── package.json
├── hooks
├── package.json
├── references.d.ts
└── tsconfig.json
```

<adsbygoogle></adsbygoogle>

### 运行脚本

```bash
tns run android
tns livesync android
```

tns run 命令参数：

```
* --watch - If set, when you save changes to the project, changes are automatically synchronized to the connected device.
* --device - Specifies a connected device on which to run the app.
* --emulator - If set, runs the app in a native emulator for the target platform, if configured. When set, you can also set any other valid combination of emulator options as listed by $ tns help emulate android.
* --release - If set, produces a release build. Otherwise, produces a debug build. When set, you must also specify the --key-store-* options.
* --key-store-path - Specifies the file path to the keystore file (P12) which you want to use to code sign your APK. You can use the --key-store-* options along with --release to produce a signed release build. You need to specify all --key-store-* options.
* --key-store-password - Provides the password for the keystore file specified with --key-store-path. You can use the --key-store-* options along with --release to produce a signed release build. You need to specify all --key-store-* options.
* --key-store-alias - Provides the alias for the keystore file specified with --key-store-path. You can use the --key-store-* options along with --release to produce a signed release build. You need to specify all --key-store-* options.
* --key-store-alias-password - Provides the password for the alias specified with --key-store-alias-password. You can use the --key-store-* options along with --release to produce a signed release build. You need to specify all --key-store-* options.
* --justlaunch - If set, does not print the application output in the console.
```
