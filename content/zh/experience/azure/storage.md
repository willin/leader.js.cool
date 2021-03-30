---
title: Azure Blob文件上传
menuTitle: Storage
description: ''
position: 2303
category: '经验篇-Azure(Node.js)'
---

azure-storage 官方文档: <http://azure.github.io/azure-storage-node/>

## 建立连接

有 3 种方式(文档中未提及):

### 1. 通过环境变量

```bash
AZURE_STORAGE_CONNECTION_STRING="valid storage connection string" node app.js
```

应用程序内:

```js
const azure = require('azure-storage');
const blobService = azure.createBlobService();
// code here
```

<adsbygoogle></adsbygoogle>

### 2.连接字符串

```js
const azure = require('azure-storage');
const blobService = azure.createBlobService('connectionString'); // 类似: DefaultEndpointsProtocol=https;AccountName=*****;AccountKey=*****;EndpointSuffix=*****.core.chinacloudapi.cn
// code here
```

### 3.账号+密钥

```js
const azure = require('azure-storage');
const blobService = azure.createBlobService('storageAccount', 'storageAccessKey', 'storageHost');
// code here
```

## 上传示例

因为 POST 请求接收到的大部分是 Stream.所以采用 Sream 的方式上传.

```js
// azure.js
const azure = require('azure-storage');
const { getDefer } = require('@dwing/common');

const blobService = azure.createBlobService('accountName', 'accessKey', 'host');

exports.createBlockBlobFromStream = (container, filename, blob) => {
  const deferred = getDefer();
  blob.on('error', (err) => {
    deferred.reject(err);
  });
  blob.pipe(blobService.createWriteStreamToBlockBlob(container, filename));
  blob.on('end', () => {
    deferred.resolve(1);
  });
  return deferred.promise;
};
```

测试代码:

```js
// demo.js
const { createBlockBlobFromStream } = require('./azure');
const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, '/testfile'));

(async () => {
  const result = await createBlockBlobFromStream('container', 'filename', stream);
  console.log(result);
})();
```

在 AirX 项目中的实际使用:

<https://github.com/AirDwing/node-airx-sdk>

```js
const SDK = require('@airx/sdk');
const fs = require('fs');

const sdk = new SDK({
  SecretId: 'xxxx',
  SecretKey: 'xxxx'
});

(async () => {
  const result = await sdk.upload({
    auth: 'xxxx',
    type: 'orgverify',
    file: fs.createReadStream('PATH/TO/xxx.jpg') // 注意这里, 本地文件可以用 path.join 拼装地址,或者直接用Stream
  });
  console.log(result);
})();
```
