---
title: Map
description: ''
position: 1304
category: 知识篇-Vanilla JS
---

## Map 介绍

### 语法

```js
array.map(callback[, thisArg])
```

### 参数

#### callback

原数组中的元素经过该方法后返回一个新的元素。

> currentValue

callback 的第一个参数，数组中当前被传递的元素。

> index

callback 的第二个参数，数组中当前被传递的元素的索引。

> array

callback 的第三个参数，调用 map 方法的数组。

#### thisArg

执行 callback 函数时 this 指向的对象。

### 返回值

由回调函数的返回值组成的新数组。

<adsbygoogle></adsbygoogle>

## 例题

<https://www.codewars.com/kata/double-char>

Given a string, you have to return a string in which each character (case-sensitive) is repeated once.

```
doubleChar("String") ==> "SSttrriinngg"

doubleChar("Hello World") ==> "HHeelllloo  WWoorrlldd"

doubleChar("1234!_ ") ==> "11223344!!__  "
```

Good Luck!

答案：

```js
const doubleChar = (str) =>
  str
    .split('')
    .map((i) => i.repeat(2))
    .join('');
```
