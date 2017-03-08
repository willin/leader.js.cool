# 混合Web应用实践

本项目实例代码： <https://github.com/js-cool/up.js.cool>

## 设计

### 项目诉求

输出：

* 图表按时间展示在线状况及效率
* 接口、图片输出当前在线状态

输入：

* WRescueTime 插件获取在线行为数据

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
const {redis, mysql, cdn} = require(`./server.${ENV}`);

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
const { pool, format } = require('wulian-mysql');
const { mysql: mysqlOptions } = require('../config');
const { isEmpty } = require('../lib');

const DB = mysqlOptions.database;
const TABLENAME = `${DB}.data`;

exports.dataAdd = async (user, [date, active, , , efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('INSERT INTO ?? (user,active,efficiency,date) VALUES (?,?,?,?)',
    [TABLENAME, user, active, efficiency, parseInt(new Date(date) / 1000, 10)]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};

exports.dataUpdate = async (user, [date, active,,, efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('UPDATE ?? SET active = ?, efficiency = ? WHERE user = ? AND date = ?',
    [TABLENAME, active, efficiency, user, parseInt(new Date(date) / 1000, 10)]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};
```

这里主要用的是结构赋值新特性。


## 测试

练手项目，测试阶段暂时忽略。有时间了再来补上。

## 部署

```bash
pm2 start up.config.js
```

注意 PM2 版本使用大于 2.4，Node 版本大于 7.6.0。
