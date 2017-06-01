# 查找散杂数

## 题目 [^1]

Given an array, find the int that appears an odd number of times.

There will always be only one integer that appears an odd number of times.

Examples:

```
[20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5] => 5

[1,1,2,-2,5,2,4,4,-1,-2,5] => -1
```

[^1]: <https://www.codewars.com/kata/find-the-odd-int>

## 思路

数组过滤，单数的特征是首次出现的下标和最后一次出现的下标差值为奇数。

答案：

```js
const findOdd = arr => arr.sort().filter(x=>(arr.lastIndexOf(x)-arr.indexOf(x))%2===0)[0]
```

其中： 

* `Array.prototype.filter`是ES 6的特性。
