---
title: Azure Node.js WebApp
menuTitle: WebApp
description: ''
position: 2304
category: '经验篇-Azure(Node.js)'
---

!> 对官方文档一些需要额外注意的细节整理

[在 Azure App Service 中创建 Node.js Web 应用](https://www.azure.cn/documentation/articles/web-sites-nodejs-develop-deploy-mac/)

## 注意事项

### 1. 启动项 npm start

必须以`node`命令执行,且必须以`node`命令打头,如:

```js
"scripts": {
  "start": "node PATH/app.js"
}
```

不能以`cli`工具执行,像这样的是无法执行的:

```js
"scripts": {
  "start": "gitbook serve"
}
```

还有这样:

```js
"scripts": {
  "start": "NODE_ENV=production node PATH/app.js"
}
```

<adsbygoogle></adsbygoogle>

### 2. 不能指定端口号

```js
app.listen(3000); // 抱歉,发布后无法访问
```

必须引用`process.env.PORT`,像这样写:

```js
app.listen(process.env.PORT || 3000);
// 部署后传入绑定的PORT类似: \\.\pipe\69b6d648-e61e-4da2-9de5-fb797348d3fa
```

## 环境变量配置

`NODE_ENV` 或者其他环境变量的配置位于:

> WebApp -> 应用程序设置 -> 应用设置

![](https://cloud.githubusercontent.com/assets/1890238/26770714/ac0ede34-49eb-11e7-8850-9c9740dc48d2.png)

## 指定 node/npm 版本

`package.json`中添加:

```js
"engines": {
  "node": ">= 8.0.0",
  "npm": ">= 5.0.0"
}
```
