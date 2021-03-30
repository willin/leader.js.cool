---
title: Azure IoT Hub开发指南
menuTitle: IoT Hub
description: ''
position: 2301
category: '经验篇-Azure(Node.js)'
---

!> IOT Hub 应用实际开发过程中的一些注意细节

资源:

- 创建设备: <https://www.npmjs.com/package/azure-iothub>
- IoT Hub(基于 Event Hubs)消息管理: <https://www.npmjs.com/package/azure-event-hubs>
- 开发调试工具: <https://www.npmjs.com/package/iothub-explorer>

## 简单发送接收示例

### 1. 注册设备

```js
const iothub = require('azure-iothub');

const registry = iothub.Registry.fromConnectionString('[connectionString]');

const device = new iothub.Device(null);
device.deviceId = '[deviceId]';

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log(JSON.stringify(deviceInfo, null, 2));
    console.log(`Device id: ${deviceInfo.deviceId}`);
    console.log(`Device key: ${deviceInfo.authentication.symmetricKey.primaryKey}`);
  }
}

// 删除设备 registry.delete(deviceId, (err, deviceInfo, res) => {});
registry.create(device, (err, deviceInfo, res) => {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res);
  }
});
```

<adsbygoogle></adsbygoogle>

### 2. 模拟设备发送消息

```js
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

const connectionString = 'HostName=[修改连接主机];DeviceId=[deviceID];SharedAccessKey=[连接密钥]';

const client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(`${op} error: ${err.toString()}`);
    if (res) console.log(`${op} status: ${res.constructor.name}`);
  };
}

const connectCallback = function (err) {
  if (err) {
    console.log(`Could not connect: ${err}`);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(() => {
      const windSpeed = 10 + Math.random() * 4;
      const data = JSON.stringify({ deviceId: 'myFirstNodeDevice', windSpeed });
      const message = new Message(data);
      console.log(`Sending message: ${message.getData()}`);
      client.sendEvent(message, printResultFor('send'));
    }, 1000);
  }
};

client.open(connectCallback);
```

### 3. 服务器端接收消息

```js
const EventHubClient = require('azure-event-hubs').Client;

const connectionString = 'HostName=[修改连接主机];SharedAccessKeyName=iothubowner;SharedAccessKey=[修改连接密钥]';

const printError = function (err) {
  console.log(err.message);
};

const printMessage = function (message) {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  Object.getOwnPropertyNames(message).forEach((x) => {
    console.log(x, message[x]);
  });
  console.log('');
};

const client = EventHubClient.fromConnectionString(connectionString);

client
  .open()
  .then(client.getPartitionIds.bind(client))
  .then((partitionIds) =>
    partitionIds.map((partitionId) =>
      client.createReceiver('$Default', partitionId, { startAfterTime: Date.now() }).then((receiver) => {
        console.log(`Created partition receiver: ${partitionId}`);
        receiver.on('errorReceived', printError);
        receiver.on('message', printMessage);
      })
    )
  )
  .catch(printError);
```

注意:

- 客户端传的`properties`,在消息体中是`message.applicationProperties`
- `startAfterTime`或`startAfterOffset`参数来决定启动时间, 可用记录上一次消息的`offset`/`enqueued-time`来保证中断重启能够继续从未处理的消息开始读取
- `message`包含的属性如下:

```js
['partitionKey', 'body', 'enqueuedTimeUtc', 'offset', 'properties', 'applicationProperties', 'sequenceNumber', 'annotations', 'systemProperties'];
```

消息体示例:

```bash
Message received:
partitionKey undefined
body { deviceId: 'myFirstNodeDevice', windSpeed: 10.51685587945142 }
enqueuedTimeUtc 2017-06-13T01:21:02.519Z
offset 73240
properties undefined
applicationProperties { asdf: 'asdfz' }
sequenceNumber 182
annotations { 'x-opt-sequence-number': 182,
  'x-opt-offset': '73240',
  'x-opt-enqueued-time': 2017-06-13T01:21:02.519Z,
  'iothub-connection-device-id': 'myFirstNodeDevice',
  'iothub-connection-auth-method': '{ "scope": "device", "type": "sas", "issuer": "iothub" }',
  'iothub-connection-auth-generation-id': 'xxxxxxx',
  'iothub-enqueuedtime': 2017-06-13T01:21:02.786Z,
  'iothub-message-source': 'Telemetry' }
systemProperties undefined
```

## 配置路由(需要 Event Hubs)

### 1. 创建 Event Hubs

### 2. 从事件中心创建实体

![eventhubs-entities](https://user-images.githubusercontent.com/1890238/27019465-566b06d4-4efe-11e7-8a74-240c0c523ac4.png)

### 3. 获取连接字符串

点击进入已创建的实体

![eventhubs-key](https://user-images.githubusercontent.com/1890238/27019487-89f17e8e-4efe-11e7-815c-c3d62a3213ef.png)

不要从别处获得连接字符串,因为可能无法连接. 最终获得的连接字符串应当包含`EntityPath`字段,类似:

```
Endpoint=sb://xxxx.servicebus.chinacloudapi.cn/;SharedAccessKeyName=iothubroutes_xxxx;SharedAccessKey=xxxx;EntityPath=xxxx
```

### 4. 创建 Endpoint

![iothub-endpoints](https://user-images.githubusercontent.com/1890238/27019555-23edcb5a-4eff-11e7-89e6-57f88d241612.png)

将 Event Hubs 里的事件关联到 IoT Hub

### 5. 创建路由

![iothub-route](https://user-images.githubusercontent.com/1890238/27019570-5238cd52-4eff-11e7-932f-78a8a97d0246.png)

### 示例代码

#### 1. 修改刚才的发送示例

```js
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

const connectionString = 'HostName=[修改连接主机];DeviceId=[deviceID];SharedAccessKey=[连接密钥]';

const client = clientFromConnectionString(connectionString);

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(`${op} error: ${err.toString()}`);
    if (res) console.log(`${op} status: ${res.constructor.name}`);
  };
}

const connectCallback = function (err) {
  if (err) {
    console.log(`Could not connect: ${err}`);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(() => {
      const windSpeed = 10 + Math.random() * 4;
      const data = JSON.stringify({ deviceId: 'myFirstNodeDevice', windSpeed });
      const message = new Message(data);
      // 随机发送到路由或默认事件上
      if (Math.round(Math.random()) === 1) {
        message.properties.add('route', 'test');
      }
      console.log(`Sending message: ${message.getData()}`);
      client.sendEvent(message, printResultFor('send'));
    }, 1000);
  }
};

client.open(connectCallback);
```

#### 2. IoT Hub 侦听启动

无需修改,直接启动

#### 3. Event Hubs 侦听启动

复制 IoT Hub 侦听源码,修改连接字符串:

```js
const EventHubClient = require('azure-event-hubs').Client;

// const connectionString = 'HostName=[修改连接主机];SharedAccessKeyName=iothubowner;SharedAccessKey=[修改连接密钥]';
const connectionString =
  'Endpoint=[sb://修改连接主机.servicebus.chinacloudapi.cn/];SharedAccessKeyName=[修改连接策略];SharedAccessKey=[x修改连接密钥];EntityPath=[事件实体]';

const printError = function (err) {
  console.log(err.message);
};

const printMessage = function (message) {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  console.log(message);
  console.log('');
};

const client = EventHubClient.fromConnectionString(connectionString);

client
  .open()
  .then(client.getPartitionIds.bind(client))
  .then((partitionIds) =>
    partitionIds.map((partitionId) =>
      client.createReceiver('$Default', partitionId, { startAfterTime: Date.now() }).then((receiver) => {
        console.log(`Created partition receiver: ${partitionId}`);
        receiver.on('errorReceived', printError);
        receiver.on('message', printMessage);
      })
    )
  )
  .catch(printError);
```

#### 测试结果

- 发送到默认路由的,只能被 IoT Hub 侦听应用捕获.
- 发送到刚才配置的测试路由的,只能被 Event Hubs 侦听应用捕获.

至此,完成路由转发.
