---
title: Electron
description: ''
position: 1710
category: 知识篇-常用框架
---

目前支持：Mac、Win、Linux三个平台。

快速示例： <https://github.com/electron/electron-quick-start>

## 打包工具

electron-packager: <https://github.com/electron-userland/electron-packager>

## Client

### 目录结构

```bash
.
├── app
│   ├── app.js
│   └── index.html
├── main.js
├── package.json
└── src
    ├── app.js
    ├── components
    │   ├── delete.js
    │   ├── login.js
    │   └── main.js
    ├── index.less
    ├── routes
    │   └── index.js
    ├── webpack.config.js
    └── webpack.config.prod.js
```

### 运行脚本

```json
"scripts": {
  "start": "./node_modules/.bin/webpack --config src/webpack.config.js && ./node_modules/.bin/electron main.js",
  "test": "./node_modules/.bin/webpack --config src/webpack.config.js",
  "pack-win": "./node_modules/.bin/electron-packager . --asar  --overwrite --platform=win32 --arch=ia32 --prune=true --out=out --version-string.CompanyName='GitHub, Inc.'  --ignore=node_modules",
  "pack-mac": "./node_modules/.bin/electron-packager . --asar --overwrite --platform=darwin --arch=x64 --prune=true --out=out  --ignore=node_modules",
  "pack-all": "./node_modules/.bin/electron-packager . --out=dist --prune --asar --overwrite --all"
}
```
