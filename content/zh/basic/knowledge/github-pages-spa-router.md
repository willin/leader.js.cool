---
title: Github Pages 中部署 SPA（路由单页应用）
menuTitle: Github部署SPA应用
description: ''
position: 1207
category: '知识篇-基础知识'
---

Github Pages 特性的几点说明：

- 不支持 Rewrite，所以原则上来说，静态单页应用路由是无法实现的，因为刷新页面后就会报404错误
- 支持自定义404，那么我们就可以通过 404.html 来做点文章

参考该评论：[Github #408](https://github.com/isaacs/github/issues/408#issuecomment-216721113)

---

无论是 Vue、Angular、React，打包生成的静态单页应用，理论上来讲都是可以利用 404的特性 部署到 Github Pages 上的。

这里我做了一个示例： <https://js-cool.github.io/github-spa-demo/>

可以直接访问查看效果，即便刷新页面也是能够响应的。支持嵌套路由、泛（Wildcard）路由及未找到（NoMatch）渲染。

有几个需要注意的细节讲一下：

## 1. 路由的设定

如果用的是自定义域名，则没有太大关系。但如果是一个非 xxx.github.io 的项目， 而是类似这样的入口路径 `xxx.github.io/xxx` 就需要特别注意一下路由的命名，需要带上特定项目名称作为前缀。

## 2. 静态资源的路径

我在做尝试时候发现一个奇怪的现象

```
/home
/about
/topics
```
这样一级的路由是可以访问的，但如果是

```
/topics/routing
/topics/xxx
```

这样路由页面，在刷新之后会变成大白板，一开始我以为是需要在对应目录下分别都创建一个 404.html 后来发现并不是这样，而是我静态资源加载错误，后来发现是因为 404 页面中引用的静态资源（.js 文件）是类似这样的加载方式：

```html
<script src="./app.js">
```

从当前目录下寻找，所以 js 资源也404了，就自然加载不出来。把引用路径改为绝对路径后就 OK 了。

---

贴上源码，位于：<https://github.com/js-cool/github-spa-demo>

顺带着说明一波，该示例是用 HyperApp 实现，Parcel 打包。包含程序框架、路由、页面（JSX Templates）所有打包后，仅有10kb 大小。

- Hyperapp 是一个仅有 1kb 的双向数据绑定框架，有 State 管理和统一的 Actions 入口，支持路由插件（2kb）。
- Parcel 是一个 Webpack 的替代方案，免去了配置的烦恼，打包效率很高。

后面我会再抽时间分享一些这样的东西，适合进阶玩家写出更极致简洁和高效兼顾的代码。
