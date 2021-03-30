---
title: 数据库表结构设计
description: ''
position: 2112
category: '经验篇-项目'
---

ER 图，略。

<adsbygoogle></adsbygoogle>

## 用户基本信息表

示例：

```sql
CREATE TABLE `user` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户ID',
  `username` char(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `salt` char(8) NOT NULL DEFAULT '' COMMENT '加盐加密',
  `mobile` char(16) NOT NULL DEFAULT '' COMMENT '手机号',
  `createdat` int(10) unsigned NOT NULL COMMENT '注册时间',
  `updatedat` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

说明：

1. `uid` 主键没有设置自增 id，可以随机分配，但需要在不同数据库上分号段注册，以及需要判断是否已注册
2. `password` 密码不能直接`MD5`或`SHA1`加密存储，需要加盐加密
3. `createdat`表示注册时间，`updatedat`表示密码修改、手机绑定等更新时间
4. 用户名和手机号均为唯一字段
5. 养成加注释的习惯

## 用户附加信息表

将非基本信息，如开发者资料、用户详细资料、认证、等级等存入用户附加信息表（也可建多个附加信息表，如用户认证表、用户配置表等）。

示例：

```sql
CREATE TABLE `usermeta` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户ID',
  `truename` char(16) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `gender` enum('male','famale') NOT NULL DEFAULT 'male' COMMENT '性别',
  `verified` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '实名认证',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

说明：

1. 如果需要按姓名或性别查找，将 `truename`或`gender` 字段加索引
2. 查找一个用户是否已经完成实名认证，可以用 `SELECT t2.verified FROM user t1 LEFT JOIN usermeta t2 ON t1.uid=t2.uid WHERE t1.username = ? LIMIT 1`方式查询

## 其他表

部分信息不需要存入数据库，如日志，可以存在 log 文件中；登录信息，可以用 Redis 等缓存存储。综合考虑性能、成本及服务器配置决定。

再讲解一种，针对`开发者`的表设计。

举例，开发者一般有两种类型，企业开发者、个人开发者。

那么，可以在`usermeta`表里加一个开发者类型字段，`dev_type`：

```sql
`dev_type` enum('personal','enterprise') NOT NULL DEFAULT 'personal' COMMENT '开发者类型'
```

另外建两张表，为 `developer_personal` 和 `developer_enterprise` 分别存放个人开发者和企业开发者的相关信息字段。

可以在系统的业务逻辑里加入一些限制，如个人开发者可以升级为企业开发者，企业开发者不能再改为个人开发者之类的。

**_Tips_**：JavaScript 中命名法则最好使用`驼峰法`，如`userActions`。而 MySQL 中不区分大小写，所以可以采用下划线命名法，如`user_actions`，在`SELECT`查询时使用`AS aliasName`设置别名即可。
