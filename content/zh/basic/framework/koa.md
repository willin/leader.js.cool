---
title: Koa
description: ''
position: 1702
category: 知识篇-常用框架
---

## 前置条件

koa 2.0 以上版本

```
npm install koa
```

(更新本文时的最新版本为 2.0 alpha, 最新版本: <https://github.com/koajs/koa> )

<adsbygoogle></adsbygoogle>

## 带 async 的示例

app.js:

```js
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response

app.use((ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
