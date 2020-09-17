---
title: Dnsmasq
description: ''
position: 1103
category: '知识篇-必备神器'
---

OS X 进行泛域名解析的开发环境搭建。

前置要求：`Brew`。


```bash
# 安装
brew install dnsmasq

# 按需创建必要目录
mkdir -p /usr/local/etc
sudo mkdir -p /etc/resolver

# 创建一个简单配置文件
# 强制 .dev 域名到本地  127.0.0.1
# 你可以从参考配置文件里获得更多信息，文件位置:
#   /usr/local/opt/dnsmasq/dnsmasq.conf.example
echo "address=/.dev/127.0.0.1" > /usr/local/etc/dnsmasq.conf
sudo sh -c 'echo "nameserver 127.0.0.1" > /etc/resolver/dev'

# 安装启动文件
sudo cp -fv /usr/local/opt/dnsmasq/*.plist \
  /Library/LaunchDaemons

# 启动服务
sudo launchctl load \
  /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
```
