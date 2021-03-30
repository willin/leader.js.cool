---
title: MySQL 5
description: ''
position: 1601
category: 知识篇-DB
---

## 查询优化

### LIMIT 1

单条数据查询

```sql
SELECT uid FROM ?? WHERE email = ? LIMIT 1
```

或单条记录更改

```sql
UPDATE ?? SET lastonline = if(updatedat < ? , ? , lastonline), ? WHERE did =  ? LIMIT 1
```

或单条记录删除，加 `LIMIT 1`。

## SELECT 嵌套 SELECT

如：

```sql
SELECT did,type,
  (select username from ?? as t1 where t1.uid = fromuid LIMIT 1) username,
  (select email from  ?? as t1 where t1.uid = fromuid LIMIT 1) email,
FROM ?? WHERE --xxx
```

优化为：

```sql
SELECT t1.`type`,t1.did,t2.username,t2.email FROM ??
  LEFT JOIN ?? ON t1.touid=t2.uid
WHERE --xxx
```

<adsbygoogle></adsbygoogle>

## 多次 JOIN

```sql
SELECT
   `t1`.`xxx`,
   `t1`.`xxx`,
   `t2`.`xxx`,
   `t2`.`xxx`,
   `t3`.`xxxx`,
   `t3`.`xxx`,
   `t4`.`xxx`,
   `t5`.`xxxx`
FROM (((?? `t1`
  left join ?? `t2` on((`t1`.`did` = `t2`.`did`)))
  left join ?? `t3` on((`t1`.`did` = `t3`.`did`)))
  left join ?? `t4` on((`t4`.`username` = `t1`.`did`)))
  left join ?? `t5` on((`t1`.`did` = `t5`.`did`)))
WHERE --xxx;
```

80 条记录结果的查询约 40s，拆分查询，t1-t3 主要查询，t4、t5 表的数据只在部分记录中需要，分别做两次查询，共计三次查询，优化后查询总耗时 1s 以内。

## 表结构优化

### 引擎

如果需要用事务用 `InnoDB`。

如果对查询效率要求高用`MyISAM`。

### 表结构优化

基于 `MyISAM` 引擎。

- 避免使用自增 ID；
- 避免使用`datetime`，而用`int`(Unix Timestamp)；
- `char`与`varchar`的选择，追求极致查询性能用`char`，追求空间成本用`varchar`；
- 避免使用`text`，而用`blob`；
- 避免使用`外键`；
- 不允许空 `null`；
- 如果查询的 WHERE 条件有多个字段，应该创建`联合索引`。

## 百万量级性能比较

项目源码： <https://github.com/js-benchmark/mysql>

### GUID 插入性能损耗

毫无疑问，使用自增 ID 的查询性能更好。

但使用 GUID 后插入性能损耗是多少呢？

```
  insert with_id ................................. 131 op/s
  insert with_guid ............................... 75 op/s
```

结果来自于百万条数据，每千条为拆分进行的插入性能（下文的插入同）。

### 时间戳（Timestamp） vs 日期时间（DateTime）

```
  insert with_timestamp .......................... 123 op/s
  insert with_datetime ........................... 66 op/s
  select with_timestamp .......................... 538 op/s
  select with_datetime ........................... 430 op/s
```

插入和查询均为 `Timestamp` 更优。

```js
bench('insert with_timestamp', (next) => {
  let sql = 'INSERT INTO `with_timestamp`(timestamp) VALUES ';
  for (let i = 0; i < 1000; i += 1) {
    sql += `(${parseInt(new Date() / 1000 - i * 86400, 10)})`;
    if (i !== 999) {
      sql += ',';
    }
  }
  connection.query(sql, next);
});

bench('insert with_datetime', (next) => {
  let sql = 'INSERT INTO `with_datetime`(datetime) VALUES ';
  for (let i = 0; i < 1000; i += 1) {
    sql += `('${new Date(new Date() - i * 86400000).format('yyyy-MM-dd hh:mm:ss')}')`;
    if (i !== 999) {
      sql += ',';
    }
  }
  connection.query(sql, next);
});

bench('select with_timestamp', (next) => {
  const sql = `SELECT * FROM \`with_timestamp\` WHERE \`timestamp\` > ${parseInt(new Date() / 1000 - 2 * 86400, 10)} AND \`timestamp\` < ${parseInt(
    new Date() / 1000 - 86400,
    10
  )}`;
  connection.query(sql, next);
});

bench('select with_datetime', (next) => {
  const sql = `SELECT * FROM \`with_datetime\` WHERE \`datetime\` BETWEEN '${new Date(new Date() - 2 * 86400000).format(
    'yyyy-MM-dd hh:mm:ss'
  )}' AND '${new Date(new Date() - 86400000).format('yyyy-MM-dd hh:mm:ss')}'`;
  connection.query(sql, next);
});
```

### Char vs VarChar

```
  90 op/s » insert with_char
  97 op/s » insert with_varchar
  308 op/s » select with_char
  298 op/s » select with_varchar
```

查询性能平分秋色。多次测试发现`char`的查询性能略高于`varchar`。
而主要区别在于：

- VarChar 存储空间：27.5MB
- Varchar 索引空间：19.5MB
- Char 存储空间：34.6MB
- Char 索引空间：51.6MB

MyISAM 引擎查询性能结果：

```
  64 op/s » insert with_char
  43 op/s » insert with_varchar
  210 op/s » select with_char
  185 op/s » select with_varchar
```

MyISAM 下查询性能`char`更优。（实例代码中将`ENGINE`替换，并删除已有表跑测试即可）

### Blob vs Text

```
  101 op/s » insert with_text
  104 op/s » insert with_blob
  167 op/s » select with_text
  180 op/s » select with_blob
```

`Blob`略高一筹。存储方面两者基本使用相同。

## 其他

阿里云 RDS DMS 工具： <https://dms-rds.aliyun.com/>

阿里云 RDS 性能优化工具：

![Image](/basic/db/mysql.png)
