---
title: Webpack
description: ''
position: 1705
category: 知识篇-常用框架
---


遵循`MVP`原则, 即`最简化可实行产品`原则, 示例:

## 既有项目引入新的组件/库

假设现有项目用到了 `react`, `react-router` ,  `antd` 等库, 并且 `controller`, `router`, `model`, `view` 已基本成型.

此时如果要引入 `mobx`, 最佳实践步骤为:

1. 新建一个空项目, 将既有库 `react`, `antd` 等安装, 配置一个最简单的 `hello world` 路由
2. 安装 `mobx`, 引入并测试通过
3. 再在原有项目上进行功能扩充

## 既有项目打包优化

假设现有项目用到了 `react`, `react-router` ,  `antd`, `mobx` 等库, 并且 `controller`, `router`, `model`, `view` 已基本成型. webpack打包过大, 应用性能较差.

最佳实践步骤:

1. 新建一个空项目, 新建一个空的webpack配置
2. 安装 `react` (或 `antd`, 或 `mobx`等) 写一个简单示例引入项目
3. 针对单一库进行 `webpack` 打包优化, 一般情况下, 除了 loader rules / vendor 需要每个库单独优化, 其他配置都能保证通用
4. 一项优化完成后重复2,3步骤, 直到所有库优化完成
5. 对原有项目的 webpack 配置进行替换, 不动项目源码
6. 进一步优化, 比如 `react-router-loader` 之类的引入, 开始针对项目源码进行优化

## 示例: React/Antd 项目初始化

### 1. 配置 eslint

- 创建: `.eslintrc` 和 `.eslintignore`
- 安装: `yarn add --dev eslint eslint-config-dwing eslint-config-airbnb eslint-plugin-react eslint-plugin-jsx-a11y babel-eslint`

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint-config-dwing',
    'eslint-config-airbnb-base/rules/strict',
    'eslint-config-airbnb/rules/react'
  ].map(require.resolve),
  plugins: [
    'react'
  ],
  parser: 'babel-eslint',
  env: {
    browser: true
  }
};
```

### 2. 配置 babel

- 创建: `.babelrc`
- 安装: `yarn add --dev babel-preset-env babel-preset-react babel-plugin-transform-runtime babel-plugin-transform-decorators-legacy babel-plugin-import babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread babel-runtime babel-polyfill babel-core`

```js
// .babelrc
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    "react"
  ],
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }],
    "transform-decorators-legacy",
    ["import", { "libraryName": "antd", "style": true }],
    "transform-class-properties",
    "transform-object-rest-spread"
  ]
}
```

### 3. 安装 react/antd 等

- 安装: `yarn add react react-dom react-router antd mobx`
- webpack相关: `yarn add --dev babel-loader less less-loader css-loader postcss-loader autoprefixer`

### 4. 配置 webpack

- 创建: `webpack.config.js` (用作产品) `webpack.config.dev.js` (用作开发)
- 安装: `yarn add --dev webpack html-webpack-plugin extract-text-webpack-plugin`

该示例项目源码: <https://github.com/AirDwing/webpack-lab/tree/antd>

## 注意事项

### 1.最好不要用各类脚手架生成的 webpack 配置

原因有如下几点:

1. 臃肿,夹杂了一大堆没用的第三方npm包,结构混乱, 难维护!!
2. `webpack`更新速度较快, 现在已经到了 `3.x` 版本了, 很多脚手架还停留在 1.x 或 2.x的阶段
3. 知其然知其所以然, 不能仅做代码搬运的机器, 这样的话就失去了人的价值了. 只有在频繁地接触和使用过程中才能挖掘更优的配置

### 2.webpack配置最佳实践

个人推荐以一个配置为`base`(基准),其他进行微调.

如, 产品环境配置为:

```js
// webpack.config.js
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const theme = require('./antd.config');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.jsx'),
    vendor: ['react', 'react-dom', 'react-router', 'mobx']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          `${require.resolve('css-loader')}?sourceMap&-autoprefixer!` +
          `${require.resolve('less-loader')}?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // 或灵活配置
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    //   }
    // }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
};
```

开发环境配置可以是这样去写:

```js
// webpack.config.dev.js
const webpack = require('webpack');
// 引入 base
const config = require('./webpack.config');
// 对 base 进行扩展
module.exports = Object.assign({}, config, {
  entry: [
    // 重新完整定义一个 entry, 当然一般情况下是用不着这么做的
  ],
  output: Object.assign({}, config.output, {
    // 仅修改 output 的 publicPath
    publicPath: 'http://localhost/'
  }),
  // 比如, 在开发环境中需要多加一个 plugin
  plugins: [
    ...config.plugins,
    // 该插件仅用于示例
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  // 加一项新的配置
  devtools: ''
});
```

当然你可能觉得这么写性能很低, 但对于只在启动时执行一次的代码来说没有什么, 而且你如果仔细研究一下,比如`webpack-merge`或者其他的, 它们的底层实现也是这样, 还另外套了许多的封装.
