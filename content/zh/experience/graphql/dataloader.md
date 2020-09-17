---
title: DataLoader
description: ''
position: 2503
category: '经验篇-GraphQL'
---

- 源码： <https://github.com/facebook/dataloader>
- 文档翻译：<https://dataloader.js.cool>

Dataloader 是由 Facebook 推出，能大幅降低数据库的访问频次，经常在Graphql场景中使用。

## Dataloader机制

主要通过2个机制来降低数据库的访问频次：`批处理` 和 `缓存`。

### 批处理

![dataloader](/experience/graphql/dataloader.png)

配合 MySQL 批量查询用户（User 表）的示例代码：

```js
const DataLoader = require('dataloader');
// 自行封装
const { query, format } = require('./mysql');

/*
用户信息 存储在 User 表 和 UserMeta 表中， 通过 uid 字段进行关联
*/
const UserLoader = new DataLoader((uids) => {
  const sql = format('SELECT t1.*,t2.* FROM USERTABLE t1 LEFT JOIN USERMETATABLE t2 ON t1.uid = t2.uid WHERE t1.uid in (?)', [uids]);
  return query(sql).then(rows => uids.map(uid => rows.find(row => row.uid === uid) || new Error(`Row not found: ${uid}`)));
}, { cache: false });

// Usage:
const user1 = UserLoader.load(1);
const user2 = UserLoader.load(2);
const user3 = UserLoader.load(3);
Promise.all([user1, user2, user3]).then(users => {

});
// Or
UserLoader.loadMany([1, 2, 3]).then(users => {

});
```
以上代码就仅会产生以下一条数据库查询语句：

```bash
 Executing (default): SELECT t1.*,t2.* FROM USERTABLE t1 LEFT JOIN USERMETATABLE t2 ON t1.uid = t2.uid WHERE t1.uid in (1, 2, 3);
```

### 缓存

Load一次，DataLoader就会把数据缓存在内存，下一次再load时，就不会再去访问后台。

DataLoader缓存的是promise，而不是具体数据。则意味着：

```js
let user1, user2;
await user1 = UserLoader.load(1);
await user2 = UserLoader.load(1);
assert(user1 !== user2)
// true，这个容易理解

assert(UserLoader.load(1) === userLoader.load(1))
// 还是true，因为是缓存promise
```

基础使用参考： <https://www.jianshu.com/p/fbd1257116b0>

## 进阶使用

以一个稍微复杂一点的嵌套分页查询为例（可以参考 Github API v4 进行研究学习）。

```graphql
{
  repository(owner: "octocat", name: "Hello-World") {
    pullRequest(number: 1) {
      commits(first: 10) {
        totalCount
        edges {
          node {
            commit {
              oid
              message
            }
          }
        }
      }
      comments(first: 10) {
        totalCount
        edges {
          cursor
          node {
            body
            author {
              login
            }
          }
        }
      }
      reviews(first: 10, before: "Y3Vyc29yOnYyOpHOABRzYg==", after: "Y3Vyc29yOnYyOpHOANFzxQ==") {
        totalCount
        edges {
          node {
            state
          }
        }
      }
    }
  }
}
```

该查询中包含多个分页（Connection）。

### MySQL 分页查询

常规查询：

```sql
SELECT count(1) as count FROM TABLE WHERE ?;
SELECT * FROM TABLE WHERE ? LIMIT ? OFFSET ?;
```

需要两条查询完成一次分页，嵌套分页则根据条目（N)再进行 2*N 次查询。

### CountLoader

```js
const CountLoader = new DataLoader((args) => {
  const arr = args.map(([TABLE, WHERE]) => [md5(TABLE + JSON.stringify(WHERE)), TABLE, parseArgs(WHERE)]);
  return query(arr.map(([CODE, TABLE, WHERE]) =>
    format(`SELECT ? as code, COUNT(1) as count FROM ??${WHERE ? ' WHERE ? ' : ''}`, [CODE, TABLE, WHERE]))
    .join(' UNION '))
    .then(rows => arr.map(([CODE]) => {
      const { count = 0 } = rows.find(row => row.code === CODE) || {};
      return count;
    }));
});

CountLoader.loadMany([
  ['TABLE1',{uid: 1}],
  ['TABLE2',{oid: 2}],
  // ...
]);
```

最终会拼成：

```sql
SELECT xxx as code, COUNT(1) as count FROM TABLE1 WHERE xxx
UNION SELECT xxx as code, COUNT(1) as count FROM TABLE2 WHERE xxx
-- ...
```

一条 SQL 查询，然后再分别根据 code 参数进行回填。

### ComplexLoader

复杂数据的 DataLoader 示例：

```js
/**
 * TicketsLoader
 * Each arg:
 * {  time: {before, after}, // Int, Int
 *    where, // obj: {1:1, type:'xxx'}
 *    order, // 'DESC' / 'ASC'
 *    limit // Int
 * }
 */
exports.TicketsLoader = new DataLoader((args) => {
  const result = args.map(({
    time: { before, after }, where, order, limit
  }) => {
    let time = [];
    if (before) {
      time.push(format('createdAt < ?', [before]));
    }
    if (after) {
      time.push(format('createdAt > ?', [after]));
    }
    if (time.length > 0) {
      time = `AND ${time.join(' AND ')}`;
    } else {
      time = '';
    }
    let sql;
    if (where) {
      sql = format(`SELECT * from ?? WHERE ?${time} ORDER BY createdAt ${order} LIMIT ?`, [TICKETTABLE, where, limit]);
    } else {
      sql = format(`SELECT * from ?? WHERE 1=1${time} ORDER BY createdAt ${order} LIMIT ?`, [TICKETTABLE, limit]);
    }
    return query(sql);
  });
  return Promise.all(result);
}, { cache: false });
```

