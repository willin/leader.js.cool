# MySQL

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


## 多次JOIN

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

80条记录结果的查询约40s，拆分查询，t1-t3主要查询，t4、t5表的数据只在部分记录中需要，分别做两次查询，共计三次查询，优化后查询总耗时1s以内。

## 表结构优化

### 引擎

如果需要用事务用 `InnoDB`。

如果对查询效率要求高用`MyISAM`。

### 表结构优化

基于 `MyISAM` 引擎。

* 避免使用自增ID；
* 避免使用`varchar`，而用`char`；
* 避免使用`text`，而用`blob`；
* 避免使用`外键`；
* 不允许空 `null`；
* 如果查询的WHERE条件有多个字段，应该创建`联合索引`。
