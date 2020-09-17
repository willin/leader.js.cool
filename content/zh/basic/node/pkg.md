---
title: Node.js 包管理
menuTitle: 包管理
description: ''
position: 1401
category: '知识篇-Node.js'
---

## NPM

### 初始化项目

```bash
npm init
```

### 安装依赖

```bash
# 产品环境依赖
npm install -S package-name
# 开发环境依赖，如Webpack及插件，不需要在产品环境中引用的
npm install -D package-name
# 选择依赖，如Demo中使用的
npm install -O package-name
```

### 命令

Package.json里：

```js
"scripts": {
  "start": "sh deploy.sh",
  "test": "node_modules/.bin/gitbook serve",
  "pack-win": "./node_modules/.bin/electron-packager . --asar  --overwrite --platform=win32 --arch=ia32 --prune=true --out=out --version-string.CompanyName='GitHub, Inc.'  --ignore=node_modules",
  "pack-mac": "./node_modules/.bin/electron-packager . --asar --overwrite --platform=darwin --arch=x64 --prune=true --out=out  --ignore=node_modules",
  "pack-all": "./node_modules/.bin/electron-packager . --out=dist --prune --asar --overwrite --all"
}
```

其中，`start`、`test`可以直接使用这样的命令运行：

```bash
npm start
npm test
```

其他，可以这样运行：

```bash
npm run pack-win
npm run pack-mac
npm run pack-all

npm run start
npm run test
```

避免使用`npm install -g`安装的`CLI`工具，推荐：

* 通过`npm install --save-dev CLI`安装
* 使用`./node_modules/.bin/CLI`

## Yarn

<https://yarnpkg.com/>

### 安装 Yarn

```bash
# 前置条件Brew（Mac OS X）
brew update
brew install yarn
# 或 直接使用npm
npm i -g yarn
```

完成后用 `Sublime Text` 或其他编辑工具根据你使用的环境打开 `.zshrc` / `.bashrc` / `.profile`，添加一行：

```bash
export PATH="$PATH:`yarn global bin`"
```

### 使用

#### 新建项目

```bash
yarn init
```

#### 安装依赖

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

#### 更新依赖

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

#### 删除依赖

```bash
yarn remove [package]
```

#### 安装项目所有依赖

```bash
yarn
```

前提项目目录下存在 `yarn.lock` 文件，npm添加的项目无法直接安装，需要通过yarn安装生成该lock文件。
