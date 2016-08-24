# 行为驱动开发实践

本实践项目源码： <https://coding.net/u/willin/p/bdd-practice/git>

## 配置数据库

开启MySQL和Redis服务。

创建数据库 `bdd`。根据`数据库设计`章节创建`user`、`usermeta`两张表。

## 初始化项目

```bash
git init
npm init
```

### 安装ESLint和Babel环境

```bash
cnpm i --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react
cnpm i --save babel-register babel-runtime babel-plugin-transform-runtime babel-preset-es2015 babel-preset-es2015-loose babel-preset-stage-1
```

Tree：

```
├── .babelrc
├── .eslintignore
├── .eslintrc.json
├── .git
├── .gitignore
├── README.md
├── node_modules
└── package.json

2 directories, 6 files
```

参考： <https://github.com/w2fs/best-practice>

创建配置文件。

### 配置ava、nyc

```
npm install ava nyc --save-dev
./node_modules/.bin/ava --init
```

Package.json修改：

```js
"scripts": {
  "test": "./node_modules/.bin/nyc ./node_modules/.bin/ava"
},
"nyc": {
  "lines": 95,
  "functions": 90,
  "branches": 90,
  "check-coverage": true,
  "report-dir": "./.nyc_output",
  "exclude": [
    "node_modules",
    "test",
    "test{,-*}.js",
    "**/*.test.js",
    "**/__tests__/**"
  ]
},
"ava": {
  "files": [
    "test/*.js",
    "test/**/*.js",
    "!**/_*/*.js",
    "!**/_*.js"
  ],
  "require": [
    "babel-register"
  ],
  "babel": "inherit"
}
```

参考项目init代码：  <https://coding.net/u/willin/p/bdd-practice/git/commit/7d97a6cc763049bba38d3c711e0047b73deb42b8>
