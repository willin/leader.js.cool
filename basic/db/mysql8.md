# MySQL 8

MySQL 8.0 挖坑指南。

最近项目中尝试使用 MySQL 8.0 的新特性 Document Store，但没有什么现成的项目案例，所以会持续踩一些坑。

## 参考文档

- 官方提供的 npm 包：`@mysql/xdevapi`
  - <https://github.com/mysql/mysql-connector-nodejs>
- TS 封装： `mysqlx`
  - <https://github.com/danang-id/mysqlx>

官方文档：

- <https://dev.mysql.com/doc/dev/connector-nodejs/8.0/>
- <https://dev.mysql.com/doc/refman/8.0/en/document-store.html>
- <https://dev.mysql.com/doc/x-devapi-userguide/en/>



## 创建索引

```js
await db.getCollection(TABLE).createIndex('card_id', {
  fields: [
    {
      field: '$.card_id',
      type: 'TEXT(40)',
      required: true
    }
  ]
});
```

创建索引后会生成一个类似于 `$ix_t40_r_83B1B843CAF9C969DC1795BB1891E21C1BC12246` 的虚拟字段（VIRTUAL COLUMN）。

```js
[
  '$ix_t40_r_83B1B843CAF9C969DC1795BB1891E21C1BC12246',
  'text',
  'NO',
  'MUL',
  null,
  'VIRTUAL GENERATED'
]
```

## 文档数据操作

示例代码：

```js
// 两个库提供的接口相同，下一个是 TS 封装（可能会定义不全）
import mysqlx from '@mysql/xdevapi';
// import mysqlx from 'mysqlx';

const client = mysqlx.getClient(
  {
    host: 'localhost',
    port: 33060,
    user: 'root',
    password: 'root'
  },
  {
    pooling: {
      enabled: true,
      // maxIdleTime: 30000,
      maxSize: 25
      // queueTimeout: 10000
    }
  }
);

async function main(): Promise<void> {
  const session = await client.getSession();

  const db = session.getSchema('world_x');

  const collection = db.getCollection('demo');
  const result = await collection
    .add({ test: 'demo02' })
    .add({ test: 'demo03' })
    .execute();

  console.log(result);
  // OperationResult {
  //   xResult: {
  //     getWarnings: [Function: getWarnings],
  //     getWarningsCount: [Function: getWarningsCount],
  //     getAffectedItemsCount: [Function: getAffectedItemsCount],
  //     getAffectedRowsCount: [Function: deprecated],
  //     getAutoIncrementValue: [Function: getAutoIncrementValue],
  //     getGeneratedIds: [Function: getGeneratedIds]
  //   }
  // }
}

main();
```

其他示例可以参考项目： <https://github.com/shiwangme/mysql8-x-devapi-demo>

## Tips

### Count / 记录总数

Collection 总记录数：

```js
const session = await mysqlx.getSession().then((session) => session.getSchema('SCHEMA_NAME').getCollection('COLLECTION_NAME'));
const total = await session.count();
```

根据条件查询的结果条数：

```js
const counter = await session.find().fields(['COUNT(1) as count']).execute();
const total = counter.fetchOne().count;
```

### Pagination / 分页

以 `Koa` 分页请求为例：

```js
const { page, size } = ctx.query;
const session = await Card.getSession();

// 计算页数
// const counter = await session.find().fields(['COUNT(1) as count']).execute();
// const total = counter.fetchOne().count;
const total = await session.count();

const pages = Math.ceil(total / size);

// 执行 Select
const query = session
  .find()
  .sort(['$.created_at DESC'])
  .limit(size)
  .offset((page - 1) * size);

const result = await query.execute();
const list = result.fetchAll();

ctx.success({ page, size, total, pages, list });
```

## Model 封装

封装 `Add`、`Modify`、`Remove`、`FindOne`和`getSession`，不包含 `Find `。


### Utils.js

```js
/**
 * 获取UNIX标准时间戳
 * @return {int} UNIX标准时间戳
 */
const getTimestamp = (t = new Date()) => parseInt(new Date(t).getTime() / 1000, 10);

exports.createObj = (obj) => ({
  ...obj,
  created_at: getTimestamp(),
  updated_at: getTimestamp()
});

exports.updateObj = (obj) => ({
  ...obj,
  updated_at: getTimestamp()
});
```

### Model.js

```js
const mysqlx = require('@mysql/xdevapi');

// 创建连接池
const client = mysqlx.getClient({
  host: 'localhost',
  port: 33060,
  user: 'root',
  password: 'root'
}, {
  pooling: {
    enabled: true,
    maxIdleTime: 30000,
    maxSize: 25,
    queueTimeout: 10000
  }
});

const { createObj, updateObj } = require('./_utils');

const DB_NAME = 'DATABASE_TEST';


const models = [];

class Model {
  constructor(TABLE) {
    this.TABLE = TABLE;
  }

  getSession() {
    return mysqlx.getSession().then((session) => session.getSchema(DB_NAME).getCollection(this.TABLE));
  }

  async add(item) {
    const session = await mysqlx.getSession();
    const db = session.getSchema(DB_NAME).getCollection(this.TABLE);
    return db.add(createObj(item)).execute();
    // {
    //   getWarnings: [Function: getWarnings],
    //   getWarningsCount: [Function: getWarningsCount],
    //   getAffectedItemsCount: [Function: getAffectedItemsCount],
    //   getAutoIncrementValue: [Function: getAutoIncrementValue],
    //   getGeneratedIds: [Function: getGeneratedIds]
    // }
  }

  async findOne(key, val) {
    const session = await mysqlx.getSession();
    const db = session.getSchema(DB_NAME).getCollection(this.TABLE);
    return db
      .find(`${key} = :${key}`)
      .bind(key, val)
      .limit(1)
      .execute()
      .then((x) => x.fetchOne());
  }

  async modify(id, item) {
    const session = await mysqlx.getSession();
    const db = session.getSchema(DB_NAME).getCollection(this.TABLE);
    return db.modify('_id = :id').bind('id', id).patch(updateObj(item)).execute();
  }

  async remove(id) {
    const session = await mysqlx.getSession();
    const db = session.getSchema(DB_NAME).getCollection(this.TABLE);
    return db.remove('_id = :id').bind('id', id).limit(1).execute();
  }
}

module.exports = new Proxy(
  {},
  {
    get(_, property = '') {
      const TABLE = property.toLowerCase();
      if (!models[TABLE]) {
        models[TABLE] = new Model(TABLE);
      }
      return models[TABLE];
    }
  }
);
```

### 示例代码

```js
const model = require('.@model');

model.collection1
  .add({
    key: 'key',
    value: 'test'
  })
  .then((x) => {
    console.log('Warnings:', x.getWarningsCount());
    console.log('AffectedItems', x.getAffectedItemsCount());
    console.log('getAutoIncrementValue', x.getAutoIncrementValue());
    console.log('getGeneratedIds', x.getGeneratedIds());
  });

model.collection1.modify('_id_xxx', { value: 'test22222' }).then((x) => {
  console.log('Warnings:', x.getWarningsCount());
  console.log('AffectedItems', x.getAffectedItemsCount());
  console.log('getAutoIncrementValue', x.getAutoIncrementValue());
  console.log('getGeneratedIds', x.getGeneratedIds());
});
```
