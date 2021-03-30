---
title: GraphQL
description: ''
position: 1604
category: 知识篇-DB
---

# 安装

准备工作:

- 数据库环境(MySQL, MongoDB)
- Node.js (版本大于 v7.6.0)

本章节示例项目源码位于: <https://github.com/willin/start-grahql-server>

安装各类依赖,养成良好习惯,第一步从`eslint`起.

!> 另外, 不建议安装`Babel`来转译服务器端的代码,因为最新的 Node.js 版本已经支持了很多 ES7 的新特性.

# 定义结构(Schema)

graphql-tools 定义结构(Schema): <http://dev.apollodata.com/tools/graphql-tools/generate-schema.html>

使用 graphql-tools 自动生成结构:

```js
const typeDefs = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
type Query {
 author(firstName: String, lastName: String): Author
 post(title: String): Post
 getFortuneCookie: String
}
schema {
 query: Query
}
`;
```

## Schema 扩展阅读

如果不使用该工具自动生成, 而是想要自己定义完整的数据结构, 可以参考: <https://graphql.js.cool/learn/schema/>

也可以在后面进阶的章节中了解: [MySQL 向 GraphQL 迁移](/#/experience/advanced/mysql-graphql)

# 快速搭建原型服务器(Mocked Server)

graphql-serve: <https://github.com/apollographql/graphql-server>

本文中分别使用 `express` 和 `koa` 做了两个服务器.

```js
// express
const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const schema = require('./schema');

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`));
```

<adsbygoogle></adsbygoogle>

```js
// koa
const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');
const schema = require('./schema');

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

router.all('/graphql', graphqlKoa({ schema }));
router.all('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
```

# 连接 SQL 数据库

使用 `sequelize`

```js
const db = new Sequelize('blog', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () =>
    AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    }).then((author) =>
      author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3)
      })
    )
  );
});

const Author = db.models.author;
const Post = db.models.post;
```

# 连接 MongoDB

使用 `mongoose`

```js
// somewhere in the middle:
Mongoose.connect('mongodb://localhost/views');

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number
});

const View = Mongoose.model('views', ViewSchema);
```

# 从 GraphQL 中使用 REST 服务

```js
const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then((res) => res.json())
      .then((res) => res[0].fortune.message);
  }
};
```

# 编写解决器(Resolver)

![graphql](https://user-images.githubusercontent.com/1890238/28000944-9c4c3f32-64ee-11e7-902e-cbf3a01d90e2.png)

GraphQL 后边可以连接各种持久化存储,甚至 RESTful 远程资源.

```js
const { Author, View, FortuneCookie } = require('./connectors');

const resolvers = {
  Query: {
    author(_, args) {
      // MySQL
      return Author.find({ where: args });
    },
    getFortuneCookie() {
      // 远程REST服务
      return FortuneCookie.getOne();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      // MongoDB
      return View.findOne({ postId: post.id }).then((view) => view.views);
    }
  }
};

module.exports = resolvers;
```
