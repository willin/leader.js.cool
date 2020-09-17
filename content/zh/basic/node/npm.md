---
title: 造轮子(NPM)篇
description: ''
position: 1407
category: '知识篇-Node.js'
---

注册npm账号，并登陆。

```bash
npm login
```

## 初始化项目

```bash
mkdir xxx-tool
cd xxx-tool
npm init
```

创建各类配置文件，如果使用`ES2015`及之后特性，需要用到`Babel.js`的，需要编译发布。

参考项目： <https://github.com/willin/waliyun>

package.json：

```js
"scripts": {
  "compile": "./node_modules/.bin/babel src --out-dir dist",
  "prepublish": "npm run compile"
}
```

## 发布至NPM

### 1.检查`.gitignore`和`.npmignore`文件是否配置好

通常两者内容相近。如：

```
node_modules/
*.log
.DS_Store
```

`.gitignore`中一般忽略生产环境编译输出的目录`dist/`，`.npmignore`中忽略源码目录`src/`。

### 2.检查`package.json`中的版本号

相同版本号不能反复发布。不能降级发布。每次需要更新并累加版本。

### 3.发布

```bash
npm publish
```

发布测试版本：

```bash
npm publish --tag beta
```

## 发布私有模块到NPM

初始化项目的时候可以加入参数：

```bash
npm init --scope=<your_scope>
```

或者直接修改`package.json`中的项目名称为：

```bash
@scope/project-name
# 或
@username/project-name
```

参考文档： <https://docs.npmjs.com/private-modules/intro>
