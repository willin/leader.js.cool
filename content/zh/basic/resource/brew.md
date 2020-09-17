---
title: Brew
description: ''
position: 1101
category: '知识篇-必备神器'
---

官方网址： <http://brew.sh/>

用于安装各类 *nix 依赖包和应用。

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 常用应用

安装示例：

```bash
brew install wget
```

常用命令：

* wget
* tree
* autojump 配合zsh使用
* thefuck

Node.js相关：

* node
* yarn
* pkg-config

代理：

* proxychains-ng

数据库、缓存：

* mysql
* redis

## Brew Cask

可以用于安装管理桌面应用。

### 安装 Brew Cask

```bash
brew tap caskroom/cask
```

### Brew Cask 常用应用

```
brew cask install google-chrome
```

* launchrocket 可以管理服务，如Redis、MySQL、Nginx等
* filezilla
* macdown

查找可用应用： <https://caskroom.github.io/search>

## 本地DNS配置

Localhost下的泛域名指定

```
brew install dnsmasq
mkdir -pv $(brew --prefix)/etc/
echo 'address=/.cxl/10.2.1.86' > $(brew --prefix)/etc/dnsmasq.conf
sudo cp -v $(brew --prefix dnsmasq)/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
sudo mkdir -v /etc/resolver
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/cxl'
```

## 百度网盘下载工具 Aria2

### 通过Brew安装Aria2

```bash
brew install aria2
```

### 浏览器插件

<https://github.com/acgotaku/BaiduExporter/releases>

### 运行

```bash
aria2c --conf-path=~/.aria2.conf -D
```

.aria2.conf:

```
#设置加密的密钥
#rpc-secret=token
#允许rpc
enable-rpc=true
#允许所有来源, web界面跨域权限需要
rpc-allow-origin-all=true
#允许外部访问，false的话只监听本地端口
rpc-listen-all=true
#RPC端口, 仅当默认端口被占用时修改
#rpc-listen-port=6800
#最大同时下载数(任务数), 路由建议值: 3
max-concurrent-downloads=5
#断点续传
continue=true
#同服务器连接数
max-connection-per-server=5
#最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
min-split-size=10M
#单文件最大线程数, 路由建议值: 5
split=10
#下载速度限制
max-overall-download-limit=0
#单文件速度限制
max-download-limit=0
#上传速度限制
max-overall-upload-limit=0
#单文件速度限制
max-upload-limit=0
#断开速度过慢的连接
#lowest-speed-limit=0
#验证用，需要1.16.1之后的release版本
#referer=*
#文件保存路径, 默认为当前启动位置
dir=~/Downloads
#文件缓存, 使用内置的文件缓存, 如果你不相信Linux内核文件缓存和磁盘内置缓存时使用, 需要1.16及以上版本
#disk-cache=0
#另一种Linux文件缓存方式, 使用前确保您使用的内核支持此选项, 需要1.15及以上版本(?)
#enable-mmap=true
#文件预分配, 能有效降低文件碎片, 提高磁盘性能. 缺点是预分配时间较长
#所需时间 none < falloc ? trunc << prealloc, falloc和trunc需要文件系统和内核支持
file-allocation=prealloc
```

### GUI界面

<http://binux.github.io/yaaw/demo/>

设置URL：

```
http://127.0.0.1:6800/jsonrpc
```
