---
title: 查找单数
description: ''
position: 1803
category: 知识篇-算法入门（使用ES 6/7）
---

## 题目1

Given an array, find the int that appears an odd number of times.

There will always be only one integer that appears an odd number of times.

Examples:

```
[20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5] => 5

[1,1,2,-2,5,2,4,4,-1,-2,5] => -1
```

题目地址: <https://www.codewars.com/kata/find-the-odd-int>

### 思路

数组过滤，单数的特征是首次出现的下标和最后一次出现的下标差值为奇数。

答案：

```js
const findOdd = arr => arr.sort().filter(x=>(arr.lastIndexOf(x)-arr.indexOf(x))%2===0)[0]
```

其中：

* `Array.prototype.filter`是ES 6的特性。

## 题目2

Given an array of integers, every element appears twice except for one. Find that single one.

Note:

> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?


问题描述:

给出一个奇数位的数组, 所有元素都出现了两次,除了其中的一个数,找出这个孤立的数.

例子: `[1,2,3,2,1,4,4]` 可能是数十万条记录的数组

输出应该为: `3`

要求：设计的算法是线性的复杂度，并且不要用额外的内存空间。

原题地址: <https://leetcode.com/problems/single-number/>

### 解题思路

异或运算的几个相关公式：

1. a ^ a = 0
2. a ^ b = b ^ a
3. a ^ b ^ c = a ^ (b ^ c) = (a ^ b) ^ c
4. d = a ^ b ^ c 可以推出 a = d ^ b ^ c
5. a ^ b ^ a = b

本题可以抽象成：int数组里有x1, x2 … xn（每个出现2次），和y（只出现一次），得出y的值。

由公式2可知，数组里面所有数异或的结果等于 x1^x1^x2^x2^…^xn^xn^y

由公式3可知，上式等于(x1^x1)^(x2^x2)^…^(xn^xn)^y

由公式1可知，上式等于(0)^(0)^…(0)^y = y

因此只需要将所有数字异或，就可得到结果。

答案:

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = (nums) => nums.reduce((x, y) => x^y);
```
