# NPM

## 初始化项目

```bash
npm init
```

## 安装依赖

```bash
# 产品环境依赖
npm install -S package-name
# 开发环境依赖，如Wepack及插件，不需要在产品环境中引用的
npm install -D package-name
# 选择依赖，如Demo中使用的
npm install -O package-name
```

## 命令

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
