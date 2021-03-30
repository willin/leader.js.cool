---
title: 奇数求和
description: ''
position: 1801
category: 知识篇-算法入门（使用ES 6/7）
---

## 题目

Given the triangle of consecutive odd numbers:

```
             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29
```

Calculate the row sums of this triangle from the row index (starting at index 1) e.g.:

```js
rowSumOddNumbers(1); // 1
rowSumOddNumbers(2); // 3 + 5 = 8
```

题目地址: <https://www.codewars.com/kata/sum-of-odd-numbers>

## 解题思路

当成数学题来做。

```
第1行，1个数求和；
第2行，2个数；
第3行，3个数；

......

第N行，N个数。
```

每一行，首尾数分别为：

```
1： N
2： N+1 2N+1
3： 2N+1 3N+2

......

N： (N-1)*N+1 (N+1)*N-1
```

求和公式：

```
(首项 + 末项) * 项数 / 2
```

即：

```
  ((N-1)*N+1 + (N+1)*N-1) * N / 2
= 2 * N * N * N / 2
= N^3   //(此处^不表示xor位运算，表示幂)
```

<adsbygoogle></adsbygoogle>

答案：

```js
const rowSumOddNumbers = (n) => Math.pow(n, 3);
```
