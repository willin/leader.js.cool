---
title: 查找散杂数
description: ''
position: 1802
category: 知识篇-算法入门（使用ES 6/7）
---

## 题目

You are given an odd-length array of integers, in which all of them are the same, except for one single number.

Implement the method stray which accepts such array, and returns that single different number.

The input array will always be valid! (odd-length >= 3)

Examples:

```
[1, 1, 2] => 2

[17, 17, 3, 17, 17, 17, 17] => 3
```

题目地址: <https://www.codewars.com/kata/find-the-stray-number>

<adsbygoogle></adsbygoogle>

## 思路一

数组过滤，散杂数的特征是首次出现的下标和最后一次出现的下标应保持一致（仅出现一次）。

答案：

```js
const stray = (arr) => ~~arr.filter((x) => arr.indexOf(x) === arr.lastIndexOf(x)).join('');
```

其中：

- `Array.prototype.filter`是 ES 6 的特性。
- 结果为数组，先变成字符串（用`Array.prototype.join`），再强制类型转换为数字（用`~~`）

## 思路二

注意题干中提到了 `odd` 奇数个，可以用位运算来求不同值。

答案：

```js
const stray = (nums) => nums.reduce((a, b) => a ^ b);
```

其中：

- `Array.prototype.reduce` 为 ES 6 特性，可以参考 Map/Reduce 相关教程。
