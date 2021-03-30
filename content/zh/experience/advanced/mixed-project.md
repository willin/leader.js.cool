---
title: 混合Web应用实践
description: ''
position: 2405
category: '经验篇-进阶'
---

本项目实例代码： <https://github.com/js-cool/up.js.cool>

## 设计

### 项目诉求

输出：

- 图表按时间展示在线状况及效率
- 接口、图片输出当前在线状态

输入：

- WRescueTime 插件获取在线行为数据

<adsbygoogle></adsbygoogle>

### 存储设计

数据库采用`MySQL`，缓存采用`Redis`。

#### 表结构

```sql
CREATE TABLE `data` (
  `user` char(16) NOT NULL DEFAULT '' COMMENT '用户',
  `active` int(3) unsigned NOT NULL COMMENT '活跃时间（秒）',
  `efficiency` decimal(5,2) NOT NULL COMMENT '效率（%）',
  `date` int(10) unsigned NOT NULL COMMENT '数据时间（转时间戳）',
  KEY `whereorder` (`user`,`date`),
  KEY `date` (`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

#### 缓存结构

```
up:data:username
up:latest:username
```

## 编码

### 初始化项目

```
yarn init
yarn add --dev eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import
```

配置`ESLint`

### 开发环境配置

`config/index.js`：

```js
const ENV = process.env.NODE_ENV || 'dev';

const users = require(`./users.${ENV}`);
const { redis, mysql, cdn } = require(`./server.${ENV}`);

module.exports = {
  cdn,
  users,
  redis,
  mysql
};
```

#### 优化

可以用`lazyload`方式动态加载：

```js
const ENV = process.env.NODE_ENV || 'dev';
module.exports = (config) => (() => require(`./${config}.${ENV}`))();
```

考虑到本项目已经在实施过程中，变更改动较大，未修改。

### Model

#### `crontab/crab.js`片段

业务中插入操作尽可能精简，参数最好统一，像这样的方式调用：

```js
data.rows.forEach(async (item) => {
  if (operator) {
    // 插入数据
    await dataAdd(user, item);
  } else if (item[0] === last[0]) {
    operator = true;
    if (item[1] !== last[1]) {
      // 更新最后一条数据
      await dataUpdate(user, item);
    }
  }
});
```

#### 对应 Model 实现代码

`model/data.js` 片段：

```js
const { pool, format } = require('@dwing/mysql');
const { mysql: mysqlOptions } = require('../config');
const { isEmpty } = require('../lib');

const DB = mysqlOptions.database;
const TABLENAME = `${DB}.data`;

exports.dataAdd = async (user, [date, active, , , efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('INSERT INTO ?? (user,active,efficiency,date) VALUES (?,?,?,?)', [
    TABLENAME,
    user,
    active,
    efficiency,
    parseInt(new Date(date) / 1000, 10)
  ]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};

exports.dataUpdate = async (user, [date, active, , , efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('UPDATE ?? SET active = ?, efficiency = ? WHERE user = ? AND date = ?', [
    TABLENAME,
    active,
    efficiency,
    user,
    parseInt(new Date(date) / 1000, 10)
  ]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};
```

这里主要用的是结构赋值新特性。

### 计划任务

采用 `Later.js`，类似于 `Crontab`。

```js
const later = require('later');
const { users } = require('../config');
const { random } = require('../lib');
const { lastClear, historyClear } = require('../model/data');
const crab = require('./crab');
const updateCertbot = require('./certbot');

users.forEach(async (x) => {
  // 每分钟抓取用户数据
  await crab(x);
  later.setInterval(async () => {
    await crab(x);
  }, later.parse.recur().every(random(50, 70)).second());
});

// 每天 0:00 清除计时器
later.setInterval(lastClear, later.parse.cron('0 0 */1 * * ?'));

// 每天 1:00 清除30天前历史数据
later.setInterval(historyClear, later.parse.cron('0 1 */1 * * ?'));

// 每周一 2:00 更新 certbot 证书
later.setInterval(updateCertbot, later.parse.cron('0 2 * * 1 ?'));
```

### 待填的坑

#### 数据采集

从上文计划任务中即可看出，每个用户都会随机产生一条任务，由于用户是写在配置文件中的固定的，所以一旦想要改为动态的（比如开放注册），这套体系就不能支持了。

所以需要一个更好的手段进行数据采集。

> 欢迎提 ISSUE 发表自己的看法和建议。

#### 服务器渲染

项目里写了一个简单的 HTML 模板引擎，可以替换一些简单参数：

```js
const path = require('path');
const { readFileSync } = require('fs');
const { cdn } = require('../../config');

module.exports = (view, params = {}) => {
  let html = readFileSync(path.join(__dirname, `${view}.html`), 'utf8').replace(/{{cdn}}/g, cdn);
  Object.keys(params).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  });
  return html;
};
```

其中用到了 `readFileSync`，该操作可能会在 I/O 密集发生阻塞。并且每个请求均会产生 IO 操作，可以从很多方面进行进一步优化。

部分优化建议：

1. 可以进行内存缓存（仅适用该项目，因为只有一个页面，根据实际项目情况考虑）
2. 可以通过反向代理直接访问静态 HTML 文件，参数通过异步请求带入

#### 路由配置

`koa-router` 还是 `koa-route`？ 这是个好问题。

该项目中使用的是`koa-route`，原因是当时并不知道有好多种路由中间件，这个是从官方仓库中发现的。

比较了一下源码，个人感觉 `koa-router` 更优美，使用起来也更方便。感兴趣的同学可以尝试一下： <https://github.com/alexmingoia/koa-router>

## 测试

练手项目，测试阶段暂时忽略。有时间了再来补上。

## 部署

```bash
pm2 start up.config.js
```

注意 PM2 版本使用大于 2.4，Node 版本大于 7.6.0。

### P.S.

SSL 证书由 `CertBot` 生成。
