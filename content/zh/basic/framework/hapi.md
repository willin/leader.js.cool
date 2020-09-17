---
title: Hapi
description: ''
position: 1701
category: 知识篇-常用框架
---

## Server

```js
import hapi from 'hapi';

// Static File Server
import inert from 'inert';
// Render Views
import vision from 'vision';

const server = new hapi.Server();

server.connection({
  host: '127.0.0.1',
  port: 4000,
  router: {
    stripTrailingSlash: true
  }
}, { timeout: { server: 5000, socket: 5000 } });

// 根据需要注册插件
server.register([inert, vision], () => {
  server.start(() => {
    console.log(`Server started at:  ${server.info.uri}`);
  });
});

// Load Routes
server.route(require('./routes'));

// Error Response Handler
server.ext('onPreResponse', (request, reply) => {
  const response = request.response;
  if (!response.isBoom) {
    return reply.continue();
  }
  // return custom err result
});

// Add Templates Support with handlebars
server.views({
  path: `${__dirname}/lib/views`,
  engines: { html: require('handlebars') },
  partialsPath: `${__dirname}/lib/views/partials`,
  isCached: false
});

module.exports = server;
```

## Plugins

* 自动文档： <https://github.com/WulianCC/hapi-swagger>
* 用户鉴权： <http://hapijs.com/api#serverauthapi>
* 表单校验： <https://github.com/hapijs/joi>
* HTTP错误： <https://github.com/hapijs/boom>
* 渲染模板页面： <https://github.com/hapijs/vision>
* 打印错误： <https://github.com/hapijs/good>
* 静态文件引用： <https://github.com/hapijs/inert>

