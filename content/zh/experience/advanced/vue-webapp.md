---
title: Vue + Koa 前后端分离实践
menuTitle: 前后端分离实践
description: ''
position: 2407
category: '经验篇-进阶'
---

# 配置

## Webpack

`vue-cli`及诸多脚手架生成的项目里, 配置项非常繁琐, 结构也非常混乱, 实际上 webpack 常规配置就需要两个, 分别给开发环境和产品环境使用.

而且像 `webpack-merge` 这样的插件, 可以通过简单的 `Object.assign` 或 `[].concat` 完成.

示例:

`base.js` 基础设置:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
};
```

dev 配置:

```js
const base = require('./base');

module.exports = Object.assign({}, base, {
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
});
```

<adsbygoogle></adsbygoogle>

prod 配置:

```js
const webpack = require('webpack');
const base = require('./base');

module.exports = Object.assign({}, base, {
  devtool: '#source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  plugins: (base.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
});
```

## Babel

`preset-latest` 或 `preset-2015` 之类的东西, 谨慎添加. 慢慢必要性也不会太大.

```js
module.exports = {
  presets: [['env', { modules: false }]],
  plugins: ['transform-runtime'],
  comments: false
};
```

## ESLint

这里是我用的配置:

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['dwing'],
  plugins: ['html', 'vue'],
  rules: {
    'no-new': 0,
    'no-bitwise': 0,
    'import/extensions': ['error', 'always', { js: 'never', vue: 'never' }],
    'import/no-extraneous-dependencies': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/base.js'
      }
    }
  }
};
```

在 vscode 下默认是无法对 `.vue` 文件进行 autofix 的.

需要注意其中的两个插件, 一个是`eslint-plugin-html`, 一个是`eslint-plugin-vue`, 同时要修改 vscode 的配置 `eslint.validate`, 参考:

```js
// 将设置放入此文件中以覆盖默认设置
{
  "editor.tabSize": 2,
  "[vue]": {
    "editor.formatOnSave": true
  },
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
     { "language": "vue", "autoFix": true },
     { "language": "html", "autoFix": true }
  ]
}
```

# 后端渲染

根据项目来权衡,是否需要进行服务器端渲染(SSR).

本项目中采用前后端完全分离的做法, 后端将直接透传前端相关的请求. 目前市面上大多数 devServer 都是用 express 框架做的,而实际项目中用到 express 的可能性小之又小. 找了很久 koa 相关的,都无法跑通,这里我就自己搞了一个能够在 koa 上进行开发运行的方法.

## 开发环境

使用 `Stream PassThrough` 将请求结果转发到前端 `webpack-dev-server`

```js
const { PassThrough } = require('stream');

router.get('/', (ctx) => {
  ctx.set('Content-Type', 'text/html');
  // webpack-dev-server 端口 9000
  ctx.body = request.get('http://localhost:9000/index.html').pipe(PassThrough());
});

router.get('/(.*)', async (ctx) => {
  const path = ctx.path.split('.').reverse();
  if (path.length > 0) {
    const type = path[0];
    switch (type) {
      case 'css': {
        ctx.set('Content-Type', 'text/css');
        break;
      }
      case 'js': {
        ctx.set('Content-Type', 'text/javascript');
        break;
      }
      case 'jpg': {
        ctx.set('Content-Type', 'image/jpeg');
        break;
      }
      case 'png': {
        ctx.set('Content-Type', 'image/png');
        break;
      }
      default: {
        ctx.set('Content-Type', 'text/plain');
      }
    }
  }
  ctx.body = request.get(`http://localhost:9000${ctx.path}`).pipe(PassThrough());
});
```

唯一的不足就是, `PassThough` 默认的 mime 是 `application/octet-stream` 需要手动替换头信息.

## 产品环境

`koa-send` 就可以满足:

```js
const send = require('koa-send');

router.get('/(.*)', async (ctx) => {
  try {
    await send(ctx, '/index.html', { root: path.resolve(__dirname, '../dist') });
  } catch (e) {}
});
router.get('/(.*)', async (ctx) => {
  try {
    await send(ctx, ctx.path, { root: path.resolve(__dirname, '../dist') });
  } catch (e) {}
});
```

---

项目源码: <https://github.com/willin/koa-api-logger-ui>
