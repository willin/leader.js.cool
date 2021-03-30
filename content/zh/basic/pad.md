---
title: 优雅地使用平板进行远程OS X编码开发
menuTitle: 优雅地使用iPad开发
description: ''
position: 102
category: '知识篇'
---

!> 没有 OS X 平板(iPad 是 ios 系统)这个问题一直困扰着我.

?> 正所谓,工欲善其事必先利其器.

## 准备

- 一台平板(iPad/Surface 或者其他)
- 一台苹果(Mac Mini/Macbook Pro 或者其他)
- 一台路由器(需支持动态域名解析,如花生壳),后续我会完善动态域名解析功能

## 配置电源选项

![power](https://user-images.githubusercontent.com/1890238/27117064-6ca0b32a-509a-11e7-98fb-db4fa50eeb04.png)

根据上图开启 `唤醒`, 关闭 `睡眠`

```bash
sudo pmset -a autopoweroff 0
sudo pmset -a standby 0
```

<adsbygoogle></adsbygoogle>

## 配置路由器

### IP 地址分配

通过 mac 地址进行绑定,分配固定 ip.

一般是在:

> 路由设置 -> 上网设置 -> 静态 IP

![ip](https://cloud.githubusercontent.com/assets/1890238/26823551/99485ffa-4ae0-11e7-8212-e22896fd8adf.jpg)

### 端口转发或 DMZ

如果路由支持 DMZ 主机功能,则不需要进行端口转发.直接将本机设置 DMZ 主机即可.

![port-forward](https://cloud.githubusercontent.com/assets/1890238/26823706/2e63f1bc-4ae1-11e7-896e-df145d8b4400.jpg)

端口转发的话,设置 `1234` 端口(参考下文 js 代码).

## 配置动态域名解析

### 路由器+花生壳

注册花生壳域名

![oray](https://cloud.githubusercontent.com/assets/1890238/26823557/a37f3f5c-4ae0-11e7-8d53-14a591190348.png)

路由器配置花生壳

很简单,填入用户名密码和域名.

注意下面的两个时间我填的都是 10 分钟.

![router-oray](https://cloud.githubusercontent.com/assets/1890238/26823629/de357cc4-4ae0-11e7-9e23-5652f2a6aa48.jpg)

## 设置唤醒应用

```js
const http = require('http');
const { execSync } = require('child_process');
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' });
    try {
      execSync('caffeinate -u -t 1');
      res.end('{status:1}');
    } catch (e) {
      res.end('{status:0}');
    }
  })
  .listen(1234);
```

假如你的动态解析域名是 `willin.wang`

如果电脑进入睡眠了,用手机访问下面的地址,即可进行唤醒.

```
http://willin.wang:1234/
```

## 祭出神器

TeamViewer, 配置无人值守和轻松访问.

![teamviewer](https://user-images.githubusercontent.com/1890238/27117314-adf4255e-509b-11e7-904b-b751ec392b32.png)

享受吧.
