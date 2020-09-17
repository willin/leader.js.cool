---
title: 操作系统 OS X
description: ''
position: 101
category: '知识篇'
---

工欲善其事，必先利其器。

本章节将围绕以下几个话题依次展开：

* 操作系统（OS X）
* 效率工具
* 设计工具
* 开发工具
* 测试工具
* 技术相关基础常识

----

最适合设计开发的操作系统，无论是对于GUI依赖者还是命令行发烧友。

## 应用安装

大多数非App Store下载的应用在安装的时候都会提示未知开发者，所以需要将系统设置为允许任何来源，才可以安装这些应用

![2](/basic/osx/2.png)

设置步骤如下：

> 系统偏好设置 -> 安全性与隐私 -> 允许从以下位置下载的应用  -> 改为“任何来源”

![1](/basic/osx/1.png)

如果是`10.12`及以后版本，会没有“任何来源”这个选项，需要在`终端（Terminal）`中执行以下命令：

```bash
sudo spctl --master-disable
```

![3](/basic/osx/3.png)

输入密码，然后再重复上面的设置步骤。

## 安装Command Line Tools

大多数开发软件都会依赖这个工具。

### 方法一： 通过XCode安装

缺点就是速度慢，如果不是 OS X 或 iOS 开发可以通过命令行安装。

### 方法二： 命令行

终端命令：

```bash
xcode-select --install
```


## Parallels 全屏禁止触发角

![4](/basic/osx/4.png)

在 `配置` -> `安全` -> `退出windows全屏模式时候需要密码` 打勾即可



## 关闭SIP

重启Mac,按住CMD+R,进入recovery界面,在顶部工具栏选择“终端”:

```bash
csrutil disable
```

注意： 该项仅在需要安装 `xtraFinder` 之类应用时才需要。
