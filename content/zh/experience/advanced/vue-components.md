---
title: 手把手教你发布一个Vue组件
menuTitle: 发布一个Vue组件
description: ''
position: 2408
category: '经验篇-进阶'
---

## 0. 初始化项目

项目位于: <https://github.com/willin/vchart>

```bash
yarn init -y
```

```js
{
  "name": "vchart",
  "version": "0.0.0",
  "main": "index.js",
  "repository": "git@github.com:willin/vchart.git",
  "author": "Willin Wang <willin@willin.org>",
  "license": "MIT"
}
```

### 初始化 NPM 包

```bash
npm publish
```

NPM 包位于: https://www.npmjs.com/package/vchart

## 1. 配置 eslint, babel, webpack

注意: `eslint-plugin-vue` 目前仅支持到 `eslint@4.3.0` 版本

代码提交: https://github.com/willin/vchart/commit/69b3e923ef565b975585872fb0438b304cbdb7d4

## 2. 配置 dev 开发环境

用简单的`http-server` 运行并调试.

```js
"scripts": {
  "start": "npm run prepare && http-server -c0 .",
  "prepare": "webpack --progress --hide-modules"
}
```

代码提交: https://github.com/willin/vchart/commit/0b875fcea03e2afed9955887e0b79097d2111adb

<adsbygoogle></adsbygoogle>

## 3. 完成组件功能并测试

## 4. 完善文档, 并提供演示

演示地址: https://vchart.js.cool

3/4 两步合并提交的代码: https://github.com/willin/vchart/commit/58b46ece2f19f7f5e07009dc46a71da3855c5bbf

## 参考资源

- https://github.com/gionkunz/chartist-js
- https://github.com/Yopadd/vue-chartist (注入式)
- https://github.com/lakb248/vue-chartist (组件式)
