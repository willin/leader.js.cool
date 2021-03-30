---
title: Yarn 进阶使用
description: ''
position: 140 2
category: '知识篇-Node.js'
---

## 批量升级所有依赖项并更新 package.json

```js
const pack = require('./package.json');
const { execSync } = require('child_process');

const list = [...Object.keys(pack.devDependencies), ...Object.keys(pack.dependencies)];
// 忽略的项目 (不用升级)
const ignore = ['eslint', 'babel-cli'];

list.forEach((item) => {
  if (!ignore.includes(item)) {
    console.log(`yarn upgrade ${item}`);
    execSync(`yarn upgrade ${item}`);
  }
});
```

## 忽略 Node.js 要求

比如, 有一些包指定了 Node.js 版本的要求, 如:

```js
"engines": {
  "node": "^4.2.2"
}
```

```bash
yarn add PackageName --ignore-engines
```

<adsbygoogle></adsbygoogle>

## dependency 版本落后

以 `tim-event-processor-host` 包为例, 其中用到了一个子模块 `cerulean` 来处理 `azure-storage`

我们想要用最新版本的`azure-storage`,但如果要一级级向上去提交`Pull Request`并且去等 npm 包作者更新, 实在是太慢太傻了.

那么我们就可以利用 `postinstall` 特性来删除旧版本的 npm 包并使用新版本的.

### 原理讲解

#### 1.只安装 `tim-event-processor-host`

```bash
mkdir DIR && DIR
yarn add tim-event-processor-host --ignore-engines
cd node_modules
tree -L 1
```

结果显示如下:

```bash
.
├── ... # 把一些无关的目录都给忽略了
├── azure-storage
├── cerulean
└── tim-event-processor-host

113 directories, 0 files
```

`cerulean`, `azure-storage` 就都装在了 `node_modules` 目录下,

#### 2.同时安装`tim-event-processor-host`和`azure-storage`

```bash
mkdir DIR && DIR
yarn add tim-event-processor-host azure-storage --ignore-engines
cd node_modules
tree -L 1
```

```bash
.
├── azure-storage # 最新版本
├── cerulean
│   ├── LICENSE
│   ├── README.md
│   ├── examples
│   │   ├── README.md
│   │   ├── leader_followers.js
│   │   └── servicebus_send_receive.js
│   ├── lib
│   │   ├── blob_lease.js
│   │   ├── blob_lease_manager.js
│   │   └── index.js
│   ├── node_modules
│   │   ├── assert-plus
│   │   ├── azure-storage # 依赖项中的指定版本(旧)
│   │   ├── boom
│   │   ├── caseless
│   │   ├── cryptiles
│   │   ├── delayed-stream
│   │   ├── forever-agent
│   │   ├── form-data
│   │   ├── har-validator
│   │   ├── hawk
│   │   ├── hoek
│   │   ├── http-signature
│   │   ├── qs
│   │   ├── request
│   │   ├── sntp
│   │   └── validator
│   ├── package.json
│   ├── playground.js
│   └── test
│       └── integration
└── tim-azure-event-hubs

406 directories, 1571 files
```

所以只需要将 `node_modules/cerulean/node_modules/azure-storage` 目录给删除掉, 让引用的时候自动向上递归查找即可.

### 解决方案

```js
"dependencies": {
  "azure-storage": "^2.2.1",
  "tim-event-processor-host": "^0.0.3"
},
"scripts": {
  "postinstall": "rm -rf node_modules/cerulean/node_modules/azure-storage"
}
```

```bash
yarn --ignore-engines
```

完成.
