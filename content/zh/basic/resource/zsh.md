---
title: OhMyZsh
description: ''
position: 1102
category: '知识篇-必备神器'
---

## 安装 OhMyZsh

安装：

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 为所有用户安装 OhMyZsh

首先要确认 zsh 已经安装（Ubuntu）：

```
sudo apt-get install zsh
```

1.以`Root`用户安装

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

2.修改`/etc/adduser.conf`

```bash
DSHELL=/bin/bash #也可能是 sh
```

为:

```bash
DSHELL=/bin/zsh
```

3.修改`/etc/default/useradd`

```bash
SHELL=/bin/sh
```

为:

```bash
SHELL=/bin/zsh
```

4.复制配置到新用户目录

```
cp -r .oh-my-zsh /etc/skel/
cp .zshrc /etc/skel
```

5.新建用户后，修改用户目录下的 `/home/username/.zshrc`

```
export ZSH=/root/.oh-my-zsh
```

为:

```
export ZSH=/home/username/.oh-my-zsh
```

## 配置 OhMyZsh 主题和插件

配置文件路径:

```
~/.zshrc
```

搜索 `ZSH_THEME=` 修改主题,默认主题为 `robbyrussell`, 想要折腾的话,可以试试`agnoster`, 需要安装 `PowerLine` 字体

可用主题列表: <https://github.com/robbyrussell/oh-my-zsh/wiki/Themes>

搜索 `plugins=` 增改弃用的插件

可用插件列表: <https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins>


## 配置 iTerm 主题

![iterm](/basic/source/iterm.png)

下载安装： <https://www.iterm2.com/>

推荐使用`Solarized`, 下载地址: <http://ethanschoonover.com/solarized/files/solarized.zip>

解压后`iterm2-colors-solarized`目录下,双击即可安装

安装完成后 在iTerm的 `Preference (左上角苹果按钮旁边点Sublime Text) -> Profiles 顶部大选项卡 -> Colors 偏右小选项卡 -> Load Presets 底部下拉菜单` 启用主题

## 配置 Hyper 主题和插件

直接修改 `~/.hyper.js` 即可.

推荐插件:

```js
plugins: [
  'hyperpower',
  'hyper-blink'
]
```
