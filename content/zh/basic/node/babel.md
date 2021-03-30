---
title: Babel
description: ''
position: 1403
category: '知识篇-Node.js'
---

<http://babeljs.io/>

`babel-node`和`babel-register`功能基本相近。

配置文件参考： <https://github.com/w2fs/best-practice>

## Babel-Register

项目内安装

```bash
npm install babel-register --save
```

使用：

创建`babel.js`

```js
require('babel-register');
module.exports = require('./server.js');
```

执行：

```bash
node babel.js
```

## Babel-Node

全局安装：

```bash
npm install babel-cli -g
```

使用：

```bash
babel-node xxx.js
```

<adsbygoogle></adsbygoogle>

### 编译 ES5 代码

```bash
babel src --out-dir dist
```

源目录`src`，目标目录`dist`。

p.s. 从 Node.js `7.6.0` 版本开始,再也没用过 `Babel` 执行后端代码.
