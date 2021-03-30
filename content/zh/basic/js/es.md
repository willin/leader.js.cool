---
title: ES Next
description: ''
position: 1303
category: 知识篇-Vanilla JS
---

## Pipeline Operator (Proposal)

目前处于草稿阶段: <https://github.com/tc39/proposal-pipeline-operator>

```js
function doubleSay(str) {
  return `${str}, ${str}`;
}
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}
function exclaim(str) {
  return `${str}!`;
}

let result = 'hello' |> doubleSay |> capitalize |> exclaim;

result |> console.log;
//=> "Hello, hello!"
```

项目模板: <https://github.com/willin/esnext-pipeline-biolerplate>

## Async (ES 7)

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
let foo = await getFoo();
let bar = await getBar();
```

上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。

<adsbygoogle></adsbygoogle>

## Proxy (ES 6)

经测试 Node v6.1.0 之后版本已集成。

示例代码：

```js
const proxy = new Proxy(
  {},
  {
    get: (target, property) => [target, property]
  }
);

console.log(proxy.func); // [ {}, 'func' ]
console.log(proxy.func('123')); // TypeError: proxy.func is not a function
```

```js
const proxy = new Proxy(
  {},
  {
    get: (target, property) => (test) => [target, property, test]
  }
);

console.log(proxy.func); // [Function]
console.log(proxy.func('123')); // [ {}, 'func', '123' ]
```

## ES 6 作用域

以 For 循环为例：

```js
var funcs = [];

for (var i = 0; i < 10; i += 1) {
  funcs.push(function () {
    console.log(i);
  });
}

funcs.forEach((func) => func());
// 输出 10 十次
```

闭包：

```js
var funcs = [];

for (var i = 0; i < 10; i += 1) {
  funcs.push((function(value){ console.log(value); }(i));
}

funcs.forEach(func => func());
// 0 到 9 依次输出
```

在 ES6 中可以简化为：

```js
const funcs = [];

for (let i = 0; i < 10; i += 1) {
  funcs.push(() => console.log(i));
}

funcs.forEach((func) => func());
// 0 到 9 依次输出
```

## Function 创建函数

```js
var add = new Function('first', 'second = first', 'return first + second');
console.log(add(1, 1)); // 2
console.log(add(1)); // 2
```

```js
var pickFirst = new Function('..args', 'return args[0]');
console.log(pickFirst(1, 2)); // 1
```

## ES6 中互换值

```js
let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a, b); // 2 1
```
