---
title: 服务器端代码打包
description: ''
position: 2409
category: '经验篇-进阶'
---

## 环境变量

之前,我们在项目里会经常使用 `process.env.NODE_ENV`, 但这个变量对于 `webpack`打包是有影响的, 在 `production` 的时候是有优化的.

所以, 我们将改用其他的环境变量来区别:

```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
  'process.env.API_ENV': `"${process.env.API_ENV || 'development'}"`
});
```

像这样, `NODE_ENV` 始终为 `production`.

而我们实际开发/产品环境, 用 `process.env.API_ENV` 变量来使用(由于该项目是一个 koa 接口服务项目, 所以这样进行命名, 可以改成任意的, 你开心就好).

<adsbygoogle></adsbygoogle>

<adsbygoogle></adsbygoogle>

## 动态配置打包

### 注意

我们以前在 node.js 后端项目中, 动态配置加载一般是这样写:

```js
const ENV = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const options = require(`./_${ENV}`);

module.exports = options;
```

为了提高阅读性, 和可能存在`ENV`的复用, 我们会单独定义一个变量.

在 webpack 打包的项目中直接这样做的话, 会产生一个问题. 比如我现在有多个配置:

- \_develpment.js
- \_test.js
- \_production.js
- \_staging.js

即便我传入的当前环境为 `development`, 依然所有的配置文件会被全部打包进来(只是永远不会被执行). 那么这样的话, 就存在敏感信息泄露的风险.

正确的姿势应该是这样的:

### config/index.js

```js
// eslint-disable-next-line import/no-dynamic-require
const options = require(`./_${process.env.API_ENV || 'development'}`);

module.exports = options;
```

## 模块化打包

比如, 我在项目中有很多个模块, 处于负载均衡的需求, 或者是对于客户定制模块化产品的需求, 我们需要分模块进行打包, 避免其他模块(永远不会被执行的)被打包进 webpack bundle.

```js
// config/_development.js
exports.enabledModules = ['user', 'demo'];
// 可能 src 目录下 还有其他模块目录, 如 'manage' 等
```

在服务端加载的时候, 是这样子的:

```js
// src/server.js
// 动态加载启用的模块
enabledModules.forEach((mod) => {
  /* eslint-disable global-require,import/no-dynamic-require */
  const routes = require(`./${mod}/route`);
  routes.middleware() |> app.use;
});
```

那么就需要 `ContextReplacementPlugin` 插件来支持了.

```js
new webpack.ContextReplacementPlugin(/src/, new RegExp(`^./(${enabledModules.join('|')})/.*$`));
```

### 进阶使用

比如,`src`目录下除了各个模块的目录, 还有一些通用方法类,钩子的目录, 如: `lib` 和 `hook`. 这两个目录是可能被其他子模块共同引用的. 在插件正则中修改:

```js
new webpack.ContextReplacementPlugin(/src/, new RegExp(`^./(lib|hook|${enabledModules.join('|')})/.*$`));
```

## 压缩代码, 并添加 source-map 支持

`Uglifyjs` 或 `Uglify-es` 其实对于服务器端代码打包并不友好, 可能会导致打包的失败, 用 `babel-minify-webpack-plugin` 插件来替代.

配合 `source-map-support` 插件来支持源码的问题定位.

---

示例项目源码: <https://github.com/AirDwing/webpack-server-bundle>
