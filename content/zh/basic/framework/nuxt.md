---
title: Nuxt.js
description: ''
position: 1712
category: 知识篇-常用框架
---

这是类似于 Next.js（React）的一个渐进式框架。虽然支持 SSR（服务器端渲染），但我们依然可以只将其作为前端框架来实现前后端分离的中、小型项目。

文档不建议查看中文版本，因为比较老旧（更新本文时目前英文版本`1.4.0`而中文版本还停留在`0.10.7`）

## 配置关闭 SSR

`nuxt.config.js`：

```js
module.exports = {
  mode: 'spa',
  build: {
    ssr: false
  }
  // 其他配置项
};
```

下面从几个简单的实讲解各个核心功能的使用。

## 插件 Plugins

实现 `router.beforeEach` 钩子：

```js
// /plugins/router.js
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    app.store.dispatch('set', { key: '$page', data: `${to.name}` });
    return next();
  });
};
```

其他示例：

- 插入谷歌统计： <https://nuxtjs.org/faq/google-analytics>
- 注入i18n组件：<https://nuxtjs.org/examples/i18n>

## Store（Vuex）

子模块状态管理： <https://nuxtjs.org/guide/vuex-store#modules-mode>

```js
// /store/todos.js
export const state = () => ({
  list: []
});

export const mutations = {
  add(store, text) {
    store.list.push({
      text,
      done: false
    });
  },
  remove(store, { todo }) {
    store.list.splice(store.list.indexOf(todo), 1);
  },
  toggle(store, todo) {
    // eslint-disable-next-line no-param-reassign
    todo.done = !todo.done;
  }
};
```

需要注意的是：

`/store/index.js` 需要以类似的结构抛出，即：


```js
// /store/index.js
export const state = () => ({

});

export const mutations = {

};

// export const ...
```

## 中间件 Middlewares


```js
// middleware/authenticate.js
export default ({ store, redirect }) => {
  const user = store.getters['user/user'];
  if (user === null || (parseInt(new Date() / 1000, 10) - user.expires > 0)) {
    return redirect('/login');
  }
};
```

使用（layout、pages或components中）：

```js
// 以 layouts/dashboard.vue 为例
export default {
  name: 'Layout',
  middleware: 'authenticate',
  // ...
};
```

可以是访问特定路由或者组件时触发。类似于 `beforeRouterEnter` 之类的钩子。

- 文档： <https://nuxtjs.org/guide/routing#middleware>
- 官方示例： <https://nuxtjs.org/examples/middleware>
