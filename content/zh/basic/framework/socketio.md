---
title: Socket.IO
description: ''
position: 1703
category: 知识篇-常用框架
---

<http://socket.io/>

## Server

应用场景：服务器间通信。

```js
const io = require('socket.io')().listen(6666);

io.on('connection', (socket) => {
  socket.on('client', async(data) => {
    // Codes Here
  });
});

exports.io = io;
```

## Client

```js
import io from 'socket.io-client';

const socket = io('ws://127.0.0.1:6666/');

// 上线汇报
socket.emit('client', ()=>{
  return 'Hello World'
});
socket.on('server', async(data) => {
  // 处理服务器消息
});
```
