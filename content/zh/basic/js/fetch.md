---
title: Fetch API AJAX
description: ''
position: 1302
category: 知识篇-Vanilla JS
---

## 浏览器兼容性

![caniuse](/basic/js/fetch.png)

## 支持检查

```js
if (typeof fetch === 'function' && typeof window.fetch === 'function') {
  // 支持
}

if (typeof fetch !== 'function' || typeof window.fetch !== 'function') {
  // 不支持
}
```

## 示例代码

```js
var req = new Request('/data.json', { method: 'POST', cache: 'reload' });
fetch(req)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });
```

<adsbygoogle></adsbygoogle>

## 跨域 Cookie 设置

`credentials` 凭证参数

```js
fetch('a.com/api', { credentials: 'include' }).then(function (res) {
  // ...
});
```

或

```js
var req = new Request('/data.json', { method: 'POST', cache: 'reload', credentials: 'include' });
fetch(req)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });
```

## 参考资料

- 接口文档： <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>
- 介绍： <https://github.com/camsong/blog/issues/2>
