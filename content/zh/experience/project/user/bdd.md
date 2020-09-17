---
title: 行为驱动开发实践
description: ''
position: 2114
category: '经验篇-项目'
---

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
  "test": "NODE_ENV=test ./node_modules/.bin/nyc --reporter=text --reporter=html ./node_modules/.bin/ava -v --fail-fast"
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

参考项目init代码：  <https://coding.net/u/willin/p/bdd-practice/git/tree/5c42541a2985b54619d09372ef05fc999b108f9a>

## 用户登陆接口实现

### 设计

Route： `/user/login`

Payload：

```js
{
  username: joi.alternatives().try(
    joi.string().email().max(32),
    joi.number().integer().min(10000000000).max(19999999999),
    joi.string().min(3).max(16)
  ).required().description('手机号，邮箱，或用户名'),
  password: joi.string().min(6).max(255).required().description('密码，密文'),
  guid: joi.string().required().default('').description('设备唯一识别码')
}
```

Result：

登陆成功：

```js
{
  status: 1,
  data: {
    token: 'Access Token',
    expires: 3600 // Access Token有效期
  }
}
```

### 通用错误

```js
{
  status: 0,
  err_code: 500,
  error_msg: 'Server Error'
}
```

### 编码

首先编写测试用例， `test/user/login.js`。注意测试的顺序：

1. 200 登录成功
2. 400 参数错误
3. 401 用户名或密码错误，连续三次
4. 403 超出限制，正确用户密码登录

并且需要注意：

1. 测试前需要添加测试数据（测试用户），且信息不能与其他测试用例冲突（并行执行测试）
2. 测试后要删除测试数据，不要使用清空数据库之类的操作，以免对其他测试用例产生影响
3. 测试前也需要删除测试数据（以免前一次测试失败数据未删除而产生数据污染）

检查测试用例是否覆盖完整，以及测试用例是否写错。

这时候直接开始跑测试用例的话会报错。

测试用例参考： <https://coding.net/u/willin/p/bdd-practice/git/blob/master/test/user/login.js>

根据测试用例，开始编写功能模块代码。

另外，有一种情况是测试无法覆盖的，就是登录半小时的限制，我们也没有必要让测试用例一直运行等待半个小时再测。可以直接检查Redis里的缓存是否正常，以及TTL超时是否在合理范围内。

示例：

```js
test('Login trial redis ttl', async(t) => {
  const value = await client.get('trial:guid-xxx');
  // 循环错误3次，加上已经限制还再继续尝试的1次
  t.is(value, 4);
  const ttl = await client.ttl('trial:guid-xxx');
  // 限制超时应当小于半小时
  t.true(ttl <= 1800);
});
```

剩下的编码部分就没什么可讲的了。 注意逻辑判断，测试代码覆盖率，没必要的判断不要加。

注意点：

* 数据库连接，使用连接池，并在所有查询完成后释放；
* 数据库查询禁止  `select field1, (select xxx) as field2` 嵌套查询；
* 慢SQL，如多张表`JOIN`的查询，根据业务逻辑，考虑加Redis缓存；
* 代码覆盖率要求`95%`以上，分支覆盖`90%`以上，只有异常捕获的代码和测试环境下的分支可以ignore；
* 不要用 `[].forEach()` 方法做轮询，直接用`for`；
* 算法、逻辑细节。
