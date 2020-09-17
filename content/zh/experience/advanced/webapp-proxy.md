---
title: 基于 API 快速搭建前后分离的项目
menuTitle: API 快速搭建
description: ''
position: 2406
category: '经验篇-进阶'
---

以我们目前的开放平台为例。

Sandbox（沙盒）的在线文档可以在: <https://stagingdoc.airdwing.com/> 找到。

Node.js版本SDK：<https://github.com/AirDwing/node-airx-sdk>

## SDK 使用

后端接口采用`@airx/sdk`来完成`AirX Open API`的反向代理.

```js
const SDK = require('@airx/sdk');

const sdk = new SDK({
  SecretId: 'xxxx',
  SecretKey: 'xxxx',
  // 访问的域名:
  Domain: 'staging.airdwing.com',
  // 是否启用HTTPS:
  Secure: true
});

(async () => {
  const result = await sdk.get('/user/check', {
    username: '13212341234'
  });
  console.log(result);
})();
```

## 前端请求参数

### 签名相关参数

签名相关参数不用通过前端传递,防止AK/SK的泄露,签名交给`Node.js`后端反代应用程序处理,所以以下几个签名相关参数不用传递:

- Nonce
- SecretId
- Signature
- SignatureMethod
- Timestamp

### 登录Auth Token

由于反代应用程序支持 Cookie Session, 所以前端不用存储 Auth Token,也免去了 Auth Token被截获的风险.所以如果接口需要以下参数,不用传递:

- auth

### 登录设备相关参数

每个会话都会生成一个随机唯一的模拟登录设备id, 如果接口需要以下参数, 不用传递:

- guid
- device

但需要注意的是, 你需要调用 `/guid` 接口来查询本次会话的 `guid` 并进行登录设备绑定.

返回结果如下:

```js
{
  status: 1,
  data: {
    guid: 'xxxx'
  }
}
```

## 项目目录结构

- server/ 服务器后端源码目录
- app/ 前端应用源码目录
- dist/ 前端应用通过`webpack`等工具进行打包压缩, 将静态文件存放的目录

建议的 `dist` 目录结构

- index.html
- 404.html 和 403,500... 等其他相关错误的html
- static/ 文件目录,或分类目录存放 css/js/图片等静态资源

## 核心代码

### 实现前后端分离

位于：`server/server.js`

```js
app.use(async (ctx, next) => {
  ctx.api = await swagger();
  const path = ctx.api.paths[ctx.path];
  // ! 仅供开发测试, 允许跨域操作很危险
  if (ENV === 'development') {
    ctx.set('Access-Control-Allow-Origin', '*');
  }
  if (path === undefined) {
    // 前后端分离, 处理前端相关静态文件
    try {
      await send(ctx, ctx.path, { root: `${__dirname}/../dist` });
    } catch (err) {
      ctx.status = 404;
      // 注意要添加 404.html 到 dist 目录
      // await send(ctx, '/404.html', { root: `${__dirname}/../dist` });
    }
    return;
  }
  await next();
});
```

### 处理接口反向代理

位于：`server/server.js`


```js
app.use(async (ctx) => {
  // 提供 guid 查询接口
  if (ctx.path === '/guid') {
    let guid = ctx.session.guid;
    if (isEmpty(guid)) {
      guid = uuid();
      ctx.session.guid = guid;
    }
    ctx.status = 200;
    ctx.body = { status: 1, data: { guid } };
    return;
  }
  // 处理后端接口
  // 封装sdk请求
  if (ctx.path === '/upload') {
    // 处理上传
    await upload(ctx);
  } else {
    // 处理其他接口
    await others(ctx);
  }
});
```

### 从远程 Swagger 取得参数信息

位于：`server/lib/swagger.js`

```js
const getSwagger = async () => {
  const result = await request({
    method: 'GET',
    url: apiOptions.doc,
    timeout: 5000
  });
  const paths = result.paths;
  const app = {
    host: result.host,
    paths: Object.keys(paths).reduce((p, x) => {
      /* eslint no-param-reassign:0 */
      const method = Object.keys(paths[x])[0];
      p[x] = paths[x][method].parameters.map(t => t.name);
      return p;
    }, {})
  };
  return app;
};

module.exports = async () => {
  let app = await redis.get('app');
  if (isEmpty(app)) {
    app = await getSwagger();
    await redis.set('app', app);
  }
  return app;
};
```

通过 `Swagger` 配置文件可以将接口列表，及各个接口需要的参数，以便于后边再接口调用的时候有针对性的处理参数。

### 处理普通接口请求

位于：`server/handler/others.js`

```js
module.exports = async (ctx) => {
  const method = ctx.request.method.toLowerCase();
  const receivedParams = method === 'get' ? ctx.query : await parse(ctx.req);

  const sdk = new SDK({
    SecretId: apiOptions.ak,
    SecretKey: apiOptions.sk,
    Domain: ctx.api.host,
    Secure: apiOptions.scheme === 'https'
  });

  // 处理请求参数
  const params = ctx.api.paths[ctx.path];
  if (params.indexOf('auth') !== -1) {
    // 处理需要 登录 的接口
    const auth = ctx.session.auth;
    if (isEmpty(auth)) {
      ctx.status = 200;
      ctx.body = { status: 0, code: 401 };
      return;
    }
    const ttl = ~~ctx.session.ttl;
    // 处理登录超时(1小时),提前10分钟重新获取auth
    if (ttl - getTimestamp() < 600) {
      const tmpParams = JSON.parse(ctx.session.params);
      const login = await sdk.post('/user/login', tmpParams);
      const loginResult = doLogin(ctx, login, tmpParams);
      // 密码被修改等无法登录
      if (loginResult === -1) {
        ctx.status = 200;
        ctx.body = { status: 0, code: 401 };
        return;
      }
    }

    receivedParams.auth = auth;
  }

  if (params.indexOf('guid') !== -1) {
    // 处理需要 guid 的接口
    let guid = ctx.session.guid;
    if (isEmpty(guid)) {
      guid = uuid();
      ctx.session.guid = guid;
    }
    receivedParams.guid = guid;
  }

  if (params.indexOf('device') !== -1) {
    // 处理需要登录设备名称的接口
    receivedParams.device = 'AirX网页版';
  }

  if (params.indexOf('password') !== -1) {
    // 处理需要 authcode加密 的接口
    receivedParams.key = randStr(6);
    receivedParams.passwod = encode(receivedParams.passwod, receivedParams.key);
  }

  const result = await sdk[method](ctx.path, receivedParams);
  // 记录登录信息
  if (ctx.path === '/user/login') {
    doLogin(ctx, result, receivedParams);
  }
  ctx.status = 200;
  ctx.body = result;
};
```

该实例代码可以在： <https://github.com/AirDwing/node-airx-webapp> 找到。
