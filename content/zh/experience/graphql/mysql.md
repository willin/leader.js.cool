---
title: MySQL 向 GraphQL 迁移
description: ''
position: 2501
category: '经验篇-GraphQL'
---

GraphQL 是一个开源的图形数据库(基于 Node.js 实现), 中文文档: <https://graphql.js.cool/>

## `sequelize-auto` 将 MySQL 数据库转变成模型

```
[node] sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName] -C

参数:
  -h, --host        主机地址 [必须]
  -d, --database    数据名 [必须]
  -u, --user        用户名
  -x, --pass        密码
  -p, --port        端口号
  -c, --config      配置文件,参考: https://sequelize.readthedocs.org/en/latest/api/sequelize/
  -o, --output      输出目录
  -e, --dialect     数据库引擎: postgres, mysql, sqlite
  -t, --tables      需要导入的表
  -T, --skip-tables 需要排除的表
  -C, --camel       使用用驼峰命名法
  -n, --no-write    不需要写入文件
  -s, --schema      数据库结构
```

<adsbygoogle></adsbygoogle>

## 使用数据模型

这里是生成的一个示例模型:

```js
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'd_user',
    {
      uid: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: ''
      },
      mobile: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: ''
      },
      salt: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: ''
      },
      updatedAt: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'user'
    }
  );
};
```

创建数据库模型:

```js
const Sequelize = require('sequelize');

const Db = new Sequelize('数据库名', '用户名', '密码', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = Db.define(
  'user',
  {
    uid: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    mobile: {
      type: Sequelize.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    salt: {
      type: Sequelize.STRING(8),
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    tableName: 'user',
    // 取消默认的时间戳, 否则会报 createdAt 不存在错误
    timestamps: false
  }
);

Db.sync();

module.exports = {
  Db,
  User
};
```

## `graphql-sequelize` 转换 MySQL -> GraphQL 结构

```js
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const { attributeFields, resolver } = require('graphql-sequelize');
const { Db, User } = require('./db');

userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: attributeFields(User)
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(userType),
        args: {
          uid: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.user.findAll({ where: args });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
```

## 启动服务器

```js
const Express = require('express');
const GraphHTTP = require('express-graphql');
const Schema = require('./schema');

// Config
const APP_PORT = 3000;

// Start
const app = Express();

// GraphQL
app.use(
  '/graphql',
  GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
```
