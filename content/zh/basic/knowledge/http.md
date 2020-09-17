---
title: HTTP
description: ''
position: 1201
category: '知识篇-基础知识'
---

![Image](/basic/http.jpg)

Web服务中，默认HTTP的端口号为80，HTTPS的端口号为443。

假设服务端应用内部侦听的端口为：`8888`，可以通过Apache、Nginx、HaProxy等反向代理工具将外部端口开放到`80`或`443`端口，***禁止*** 使用其他端口。

另外，不要将应用服务的端口直接暴露到外网。

## 常见 Header

### Host

必须参数，如：`api.xxx.com`

### Referer

访问来源，如： `https://api.xxx.com/`

### User-Agent

客户端标识，如：`app/1.0.0 android/6.0.1`

### 时间相关

#### Cache

如： `Cache-control: max-age=5`

表示缓存`5s`，单位为秒。

### Keep-alive

如： `Keep-Alive: timeout=5, max=100`

表示会话保持`5s`，最多尝试`100次`，时间单位为秒。
