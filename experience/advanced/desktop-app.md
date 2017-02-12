# Electron 桌面应用

本章节以 Mac OS X下 Hosts 文件管理 App 为例。

技术栈包含：

* Electron （仅 OS X 平台）
* Webpack 2
* Vue 2
* Vuex
* Vue-Router
* Vue-Material （UI组件）
* Babel
* ESLint
* Yarn（包管理）

## 初始化项目

* 安装所需的各种 NPM 包。
* 引入 ESLint、Babel 配置文件。

## 配置 Vue2 + Webpack2

需要注意`Webpack` 2.x.x 版本与 1.x.x 版本发生了不少改动。可以参考迁移文档： <https://webpack.js.org/guides/migrating/> 进行学习。

### 坑1： extract-text-webpack-plugin

该插件 NPM 最新版本为1.0.1，不支持 Webpack2，所以需要通过安装 RC3 版本来获得对应支持。

```
yarn add --dev extract-text-webpack-plugin@2.0.0-rc3
或
npm i --save-dev extract-text-webpack-plugin@2.0.0-rc3
```

### 坑2：babel-plugin-transform-runtime 与 extract-text-webpack-plugin 插件有冲突

会导致 extract-text 插件报错崩溃。

解决方法，修改 `.babelrc`：

```json
{
  "presets": [
    "latest"
  ],
  "plugins": [
    [
      "transform-runtime",
      {
        "helpers": false,
        "polyfill": false,
        "regenerator": true
      }
    ]
  ],
  "compact": true
}
```

其中 设置`compact`属性还能阻止 500kb 限制的警告。

### 坑3：postcss-loader 与 extract-text-webpack-plugin 插件有冲突

目前无解，去掉了`postcss-loader`的使用。

下一阶段尝试。

### 坑4：在 Vue 中使用 Electron

首先，需要在 webpack config 中设置：

```yaml
target: 'electron'
```

向 Electron 注册插件：

```js
import Vue from 'vue';
import electron from 'electron';

Vue.use({
  install: (vue) => {
    vue.prototype.$electron = electron;
  }
});
```

前端向 IPC 发送消息：

```js
this.$electron.ipcRenderer.send('resizePreferencesWindow', { width: 400, height: 300 });
```

## Electron 配置

### 设置 App 开机自启

使用插件：<https://github.com/Teamwork/node-auto-launch>

```js
import AutoLaunch from 'auto-launch';

const hostsAutoLauncher = new AutoLaunch({
  name: 'Hosts.js',
  path: '/Applications/Hosts.js.app'
});

exports.isEnabled = async () => {
  const result = await hostsAutoLauncher.isEnabled();
  return result;
};

exports.enable = () => {
  hostsAutoLauncher.enable();
};

exports.disable = () => {
  hostsAutoLauncher.disable();
};
```

### 添加 Electron Vue DevTools

可以直接通过插件实现，地址：<https://github.com/MarshallOfSound/electron-devtools-installer>

devtools.js:

```js
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

module.exports = installExtension(VUEJS_DEVTOOLS);
```


窗口加载：

```js
if (process.env.NODE_ENV === 'development') {
  // 开发模式加载 devtools
  const devtools = require('../lib/devtools');
  devtools.then(() => { // 注意调用方式
    this.preferencesWindow.loadURL('http://localhost:3000/build/app.html');
  });
} else {
  this.preferencesWindow.loadURL(`file://${path.join(__dirname, '../../build/app.html')}`);
}
```

## 设计核心模块

### Hosts 分级列表

特点：

* 支持顶级项目
* 支持二级目录项目
* 目录不含有启动状态，目录下的子项目有
* 支持排序

```js
[
  {
    name: 'Default',
    order: 1,
    id: 'xxx',
    type: 'item',
    enabled: true
  },
  {
    namename: 'Folder',
    order: 2,
    id: 'xxx',
    type: 'folder',
    children: [
      {
        name: 'Sub Item 1',
        order: 1,
        id: 'xxx',
        type: 'item',
        enabled: false
      },
      {
        name: 'Sub Item 2',
        order: 2,
        id: 'xxx',
        type: 'item',
        enabled: true
      },
    ]
  }
]
```

排序算法：

1. 对顶级项目进行排序
2. 对子菜单项目进行排序

```js
const reorder = arr => arr.sort(x => x.order).map(x => {
  if (x.type === 'folder') {
    x.children = x.children.sort(y => y.order);
  }
  return x;
});
```

---

Hosts.js项目源码： <https://github.com/js-cool/Hosts.js>
