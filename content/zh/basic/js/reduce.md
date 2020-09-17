---
title: Reduce
description: ''
position: 1305
category: 知识篇-Vanilla JS
---

## Reduce 介绍

### 语法

```js
arr.reduce(callback,[initialValue]);
```

### 参数

#### callback

执行数组中每个值的函数，包含四个参数：

> accumulator

上一次调用回调返回的值，或者是提供的初始值（initialValue）

> currentValue

数组中正在处理的元素

> currentIndex

数据中正在处理的元素索引，如果没有提供initialValues，默认从0开始

> array

调用 reduce 的数组

#### initialValue

作为第一次调用 callback 的第一个参数。

### 返回值

函数累计处理的结果。

## 例题

<https://www.codewars.com/kata/beginner-reduce-but-grow>

Given and array of integers (x), return the result of multiplying the values together in order. Example:

```
[1, 2, 3] --> 6
```

For the beginner, try to use the reduce method - it comes in very handy quite a lot so is a good one to know.

Array will not be empty.

答案：

```js
const grow = x => x.reduce((r, i) => r * i, 1);
```
