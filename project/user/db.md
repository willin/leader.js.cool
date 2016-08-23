# 数据库表结构设计

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

1. `uid` 主键没有设置自增id，可以随机分配，但需要在不同数据库上分号段注册，以及需要判断是否已注册
2. `password` 密码不能直接`MD5`或`SHA1`加密存储，需要加盐加密
3. `createdat`表示注册时间，`updatedat`表示密码修改、手机绑定等更新时间
4. 用户名和手机号均为唯一字段
5. 养成加注释的习惯

## 用户附加信息表

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

将非基本信息，如开发者资料、用户详细资料、认证、等级等存入用户附加信息表（也可建多个附加信息表，如用户认证表、用户配置表等）。

## 其他表

部分信息不需要存入数据库，如日志，可以存在log文件中；登录信息，可以用Redis等缓存存储。综合考虑性能、成本及服务器配置决定。
