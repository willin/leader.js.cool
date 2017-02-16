# 正则替换

## RegExp 对象[^1]

[^1]: 参考： <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp>

工具：

* RegExp tester （Chrome插件）

## 例题[^2]

Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example:

```
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
```

The returned format must be correct in order to complete this challenge. 
Don't forget the space after the closing parenthese!

[^2]: <https://www.codewars.com/kata/create-phone-number>

答案：

```js
const createPhoneNumber = n => n.join('').replace(/(\d{3})(\d{3})(\d{3})/,'($1) $2-$3');
```
