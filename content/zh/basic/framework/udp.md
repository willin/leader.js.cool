---
title: UDP
description: ''
position: 1706
category: 知识篇-常用框架
---

官方文档： <https://nodejs.org/api/dgram.html>

中文翻译： <http://shouce.w3cfuns.com/nodejs/dgram.html>

## Server

应用场景： 心跳服务。

```js
import dgram from 'dgram';

const server = dgram.createSocket('udp4');
server.on('error', (err) => {
  // 处理错误
  server.close();
  server.bind(6666);
});

server.on('message', async(msg, info) => {
  // 处理消息
});

server.on('listening', () => {
  const address = server.address();
  console.log('Push Client Server listening at %s - %s', `${address.address}:${address.port}`, new Date());
});
server.bind(6666);
```
