---
title: Azure IoT Hub 路由开发指南
menuTitle: IoT Hub 路由
description: ''
position: 2302
category: '经验篇-Azure(Node.js)'
---

本章主要讲解:

- 如何使用 eventhub 创建路由
- 如何将一条设备消息同时传入两个路由进行不同的处理

## 概念讲解

- 事件中心(Event Hubs): 用于服务器端侦听并处理的 EventHub 终结点
- 终结点(IOT Hub): 关联到 Event Hubs 中的事件中心
- 路由(IOT Hub): 关联到 IOT Hub 中的终结点, 处理路由分发的主要配置环节

## 在 Azure 中创建并配置路由相关的基础服务

首先需要分别创建 IOT Hub 和 EventHubs.

<adsbygoogle></adsbygoogle>

### 1. 创建 EventHubs 事件中心

![eventhub](https://user-images.githubusercontent.com/1890238/29015275-06999aa8-7b13-11e7-893c-2f75ca58bb14.png)

### 2. 创建 IOT Hub 终结点

![endpoint](https://user-images.githubusercontent.com/1890238/29015320-334b5a00-7b13-11e7-8c12-dcc4d152e6e7.png)

注意这里, `状态` 初始不显示, 首次消息通讯成功后再来这里看应该会变.

系统可能会存在这样的 Bug, 怎么也收不到消息. 这里的状态就会一直不显示:

![err](https://user-images.githubusercontent.com/1890238/29015355-4a0427c2-7b13-11e7-8a9c-24e6bc87144b.png)

像这样的情况发生的时候, 删除路由,删除终结点,删除事件中心, 重头再来.

### 3. 配置路由

![route](https://user-images.githubusercontent.com/1890238/29015397-7cb355bc-7b13-11e7-8a65-957e76defadd.png)

仔细看上图, 两个路由的查询条件一样, 但分别放进 `test`/`test2` 两个不同的终结点.

## 示例代码

### 服务器端

```js
// eventhub.js
const EventHubClient = require('azure-event-hubs').Client;

const getPartitionIds = async (client) => {
  const partitionIds = await client.getPartitionIds();
  return partitionIds;
};

const defaultErrorHandler = async (err) => {
  console.error(err);
};

const defaultMessageHandler = (message) => {
  console.log(message.body);
  console.log(message.body.toString());
};

const createReceiver = async ({ connStr = '', messageHandler = defaultMessageHandler } = {}, errorHandler = defaultErrorHandler) => {
  const client = EventHubClient.fromConnectionString(connStr);
  await client.open();
  const partitionIds = await getPartitionIds(client);
  partitionIds.forEach(async (partitionId) => {
    const receiver = await client.createReceiver('$Default', partitionId, { startAfterTime: Date.now() });
    receiver.on('errorReceived', async (err) => {
      if (err.transport && err.transport.name === 'AmqpProtocolError') {
        console.log(`Restart #${partitionId}`);
        await createReceiver({ connStr, errorHandler, messageHandler });
      } else {
        await errorHandler(err);
      }
    });
    receiver.on('message', messageHandler);
  });
};

module.exports = createReceiver;
```

```js
// server.js
const receiver = require('./eventhub');

(async () => {
  await receiver({
    connStr: 'test事件中心的连接',
    messageHandler: (msg) => {
      console.log('test');
      console.log(msg.body);
    }
  });
  await receiver({
    connStr: 'test2事件中心的连接',
    messageHandler: (msg) => {
      console.log('test2');
      console.log(msg.body);
    }
  });
})();
```

### 客户端模拟消息发送

参考官方的示例: <https://github.com/azure/azure-iot-sdk-node/blob/master/device/samples/simple_sample_device.js#L44>

注意第 44 行位置, 下面添加一行, 加入路由属性

```js
message.properties.add('route', 'tt');
```
