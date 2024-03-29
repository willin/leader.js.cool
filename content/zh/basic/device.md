---
title: 笔记本、台式机、平板二合一？Mac、Win、Linux？
menuTitle: 电脑/系统的选择
description: ''
position: 100
category: '知识篇'
---

## 电脑选型

根据日常使用的需求进行选择，笔记本、台式机、平板和二合一电脑我都有尝试过，目前而言，最适合我个人的是笔记本。

### 笔记本

如果你犹豫笔记本和台式机，选择笔记本；如果你犹豫笔记本和二合一电脑，选择笔记本。笔记本电脑比较中规中矩，是绝大多数场景下都可以作为第一或者备选方案的选择。

在选择笔记本的时候，需要重点考虑如下几个因素：

- 性能（如 CPU、内存、显卡是否能满足需求）
- 散热（大部分的轻薄本都是热水袋，需要重点关注）
- 续航（如果有移动办公的需求）
- 屏幕尺寸（不再推荐 16:9 比例及 2k 以下分辨率的屏幕，看着很难受）
- 重量（Mac Mini 的重量为 1.2Kg）

其他非关键的因素也可以作为参考：

- 键盘（手感、键程等）
- 触控板（是否支持多指手势）
- 色域、亮度（设计领域需要重点关注）

大部分纠结选择苹果或者其他的，其实只需要关注预算就好了。

### 台式机

#### 苹果

推荐 iMac 5k，正所谓买显示器送电脑，苹果台式机的显示器是真的好。当然如果 ￥ 不是问题，也可以采用 Mac Pro + Pro Display XDR 的方案。

我使用 iMac 5k 2019 两三年的时间，配合飞利浦的 4k 显示器双屏办公。定制了 i9 的处理器，自行安装了 64G （32\*2） 内存条，整体下来 3 万左右的价格，并没有笔记本的顶配贵，但是真心性能强悍，也不用担心散热的问题，两个大屏看着很爽，开发效率真的很高。

劣势：

- 不方便携带（我搬过两次，还要额外打包一台显示器，简直要了老命）
- 不方便共享，别人开会抱着笔记本就进会议室了，我拿着笔记本（和笔）进会议室
- 断电问题，虽然不常见，而且大部分有自动保存。但有一段时间在公司电力不稳定关机了几次，还是很吐血的

除去以上我在使用过程中的问题，其他剩下的都是优点了。

#### 组装机

我也有过一段时间攒了一台台式机，配了一个带鱼曲面屏。游戏体验还不错，如果愿意折腾，不怕麻烦的话，Win、Linux、黑苹果三种系统也是可以通吃的。

劣势与 iMac 基本相同，除此之外：

- 兼容性（需要折腾，比如想要完美黑苹果，或者安装其他发行版本的 Linux）

优势：

- 性价比高，自己攒更便宜
- 可定制性强，如果你喜欢 RGB 彩灯什么的，酷炫机箱外观啥的，虽然实用性不强，但装起来贼拉风

如果是为了娱乐游戏，攒一台高配性价比很高；如果是为了公司成本考虑，也算挺不错；但是作为个人生产力而言，并不推荐，需要关注的因素太多了，而且这些因素毫无生产力和效率可言。

### 笔记本平板二合一

我个人的理解，或许是适合有一些偏设计或者产品的人士。之前我用的是台电的二合一，性能虽然比较低，但是玩 LOL 什么的还是挺流畅的。给我留下最大的印象就是充电慢、耗电快。有的时候插着电边充边用还能整没电了。

优势：

- 方便携带
- 支持触控（或手写笔）

缺点：

- 性能低
- 接口（如 USB、HDMI、Type-C 等）少

如果有手写笔记、画画绘制灵感之类的，可以考虑一下。当然，其实如果没有特殊的需求，平板已经能够满足这部分的需求了。另外，真正可以选择的并不多，有华为 Matebook E 2022， 微软 Surface 系列，联想 Yoga 之类的。像戴尔 XPS 二合一虽然有触屏，但键盘不可拆卸。国产千元机形形色色，垃垃圾圾。

### 平板

顺带着提一下平板， Linux 平板（如 JingPad）还没有尝试过，不知道会不会有惊艳的体验。

平板可能更适合作为设计工具，但不太适合作为开发工具。我用过 iPad Pro 去尝试搭建各种开发环境，与 macOS 体验相差甚远。

目前有两种解决方案，一种是远程桌面控制家里的闲置电脑（或者云桌面）。该方案就涉及到了频率分辨率显示、网络延迟、屏幕键盘操作等问题。另外一种是远程服务器配置好开发环境，如 VS Code Web 版。都挺折腾的。

华为平板电脑模式（手机也有），配合外接大屏也是一种方案，但是分辨率只能是 1080P，而且虽然可以跑类似于 Termux 之类的 Linux 模拟器，但实践中问题还是挺多的。

目前的阶段，还没有达到可以通过移动设备进行完美开发。偶尔带着玩玩倒是可以。

## 设备

### 单设备还是多设备

有一段时间，我在家里用台式机，在公司用笔记本。两台主力开发电脑还是比较麻烦的，因为我并不会把所有的代码都提交到 Git 上。有一些本地写的临时 Demo 是忽略掉的。另外就是配置参数（环境变量）之类的，还需要同步。聊天信息不同步，本地素材资源需要额外的同步等等。

工具应当是用来提升生产力而不是降低生产力，所以对于我个人而言，麻烦比方便更多。我目前的理想状态是，在家里有一台 Macbook 配合一个大屏显示器，在外面带一个 iPad 随航充当一个副屏临时使用，就足矣。

### 显示器

选择显示器一般会纠结高分屏还是高刷新率，或者是大屏还是带鱼屏。

对于没有娱乐游戏需求的我而言，高分辨率会比刷新率更适合办公。高分屏我更倾向于 16:10 （暂未找到合适的 4k 显示器产品） 或者 3:2 （目前也仅有华为的 Mateview）的比例，退而求其次，我推荐带有 90w type-c 反向充电的显示器。当下飞利浦的显示器，还提供了 RJ45 千兆网口，非常不错的选择。

带鱼屏的话，32:9 比例，一个屏当两个用，更加适合分屏。但使用了带鱼屏，尤其是曲面带鱼屏（如三星玄龙骑士 G9 1000R 曲率），就决定了只能拥有一块工作屏幕。并且对于作为笔记本外接屏幕来说就比较不友好了。

台式机的话，可以用两台大屏的组合，或者 iMac 5k 自带显示器再带一块大屏。笔记本的话原则上来说另外接一个大屏够用（针对 Macbook 屏幕显示质量而言）。

<adsbygoogle></adsbygoogle>

## 操作系统

仅代表我个人开发使用的心得与经验。纯粹个人好恶，仅供参考。

### Windows

我是从 11 年正式加入 Mac OS X 阵营，在此之前折腾过一段时间黑苹果。后来 Windows 仅在公司配备的办公电脑及平板二合一电脑中使用过一些，所以对于一些新鲜效率工具方面可能了解欠缺一些。

从我自己的使用观感来看， Windows 开发需要配合 Linux 子系统 （WSL），所以系统里会存在多个 Shell 环境（如 Powershell、安装的 Git Shell、子系统的 Bash/Zsh 等等），使用起来非常不友好。并且在终端工具下复制、粘贴快捷键，选中状态等，都会让我头痛。这就极大程度上影响了我的开发效率。

优势：

- 软件丰富（尤其是包含 GUI 图形界面的软件）且操作简单
- 兼顾办公与娱乐

劣势：

- 软件多也面临着垃圾软件更多的风险
- 脚本/命令行处理
- 文件管理/权限（比如删除文件遍历所有目录及文件，比如与 Linux 服务器上的文件权限策略不一致等）

不喜欢 Windows 的主要原因，是我觉得 GUI 是不可靠的，而且 GUI 很难去完成完整且复杂的功能操作。相较于图形界面，我更喜欢通过命令行来完成我的操作。

### Linux 发行版

我也尝试过很多 Linux 发行版本，大部分使用的时间都不会超过半年，用着用着的过程中，会遇到一些不重装都解决不了的问题。而且很多软件，并不提供 Linux 的版本，即便提供了，也可能不适配我当前使用的发行版本。小到输入法，办公聊天软件等，普遍存在，还无解。

现在在公司里，我装的是 Manjaro （一个基于 Arch Linux 的发行版本），支持了滚动升级，一般情况下不会出现问题，但还是有一些非常影响体验的，我这里列举几个：

- 虚拟机（已成开机必须打开的，用钉钉之类的聊天沟通）内外双向的复制粘贴，经常会失灵，导致整个系统卡住
- Docker（不是容器服务那个 Docker） 和状态栏，需要手动配置，而且在每个屏幕下都需要单独配置，还经常会失灵（比如出现透明度问题、时间停止、应用程序菜单不显示等等）
- 睡眠不能唤醒，偶尔无法关机，极少数情况下也会莫名其妙突然自动重启，可能跟驱动不全有关

虽然问题很多，但依然勉强能用。毕竟该方案的体验接近 macOS，环境接近服务器，性价比极高。

值得一提的是，可玩性更强一些，整个系统界面 UI 都可以灵活地配置，可以像 macOS 有全局的顶部状态栏和 Docker，也可以像 Windows 一样只有一个底部的状态栏。愿意折腾的话，是比 macOS 更个性的。

### macOS

用了十余年，最大的感受就是：省心，也省事。虽然这几年更新下来感觉变化不太大，小问题越来越多，但目前依然是最适合开发的系统，没有之一。我这里指的是白苹果，黑苹果会有更多兼容性的问题，喜欢折腾的话可以试试。毕竟苹果一直性价比不太高，但能接受。

对于苹果的系统，这里就不过多阐述了，毕竟后续文章中的资源和示例，大多都是在 mac os 下完成的。
