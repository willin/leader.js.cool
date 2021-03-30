---
title: Docker 加速
description: ''
position: 1205
category: '知识篇-基础知识'
---

## 阿里云

<https://cr.console.aliyun.com/>

## DaoCloud

<https://www.daocloud.io/mirror#accelerator-doc>

## 使用

**_注：_** 上面的两家服务是免费的。

以阿里云在 Mac 下使用为例：

登陆控制台，获取专属下载地址，如 `https://xxxx.mirror.aliyuncs.com`

使用 Docker-Machine 安装虚拟机：

```bash
docker-machine create --engine-registry-mirror=https://xxxx.mirror.aliyuncs.com -d virtualbox default
```

查看机器的环境配置，并配置到本地，并通过 Docker 客户端访问 Docker 服务。

```bash
docker-machine env default
eval "$(docker-machine env default)"
docker info
```

阿里云 9 折推荐码：

> 0kbwsn

注册地址： <http://t.cn/zjxZrUk>

<adsbygoogle></adsbygoogle>
