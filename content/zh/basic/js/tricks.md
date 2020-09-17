---
title: Tricks
menuTitle: 小技巧
description: ''
position: 1301
category: 知识篇-Vanilla JS
---

你也许并不需要jQuery之类的库来协助开发。

## 事件委派

如对 AJAX 请求返回结果中的按钮进行 `click` 事件绑定：

```js
var handleClick = function (e) {
	if (e.target && e.target.nodeName.toLowerCase() === 'button') {
		// Codes Here

	}
}

parentNode.addEventListener('click', handleClick);
```


## Deep Clone

问题现象：

```js
var obj1 = {
  key1: 'value1',
  key2: 'value2',
  children: {
    key3: 'value3',
    key4: 'value4'
  }
}
var obj2 = Object.assign({},obj1);
obj2.children.key3 = 'test';
console.log(obj1.children);
// { key3: 'test', key4: 'value4' }
```

快速解决方案：

```js
const obj2 = JSON.parse(JSON.stringify( obj1 ));
```

## Scroll Debounce

用于解决前端滚动侦听事件触发频率过高问题。

核心代码：

```js
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
```


示例代码：

```js
function testFunc(e) {
  console.count(e);
}

window.addEventListener('scroll', ()=>console.count('bounce'));
window.addEventListener('scroll', debounce(testFunc));
```

在浏览器中测试。

## 遍历用Map还是For

同是遍历，但实际有很大不同。

### 对比

#### map

改变自身。

```js
[1,2,3,4,5].map(x => x+1)
// [ 2, 3, 4, 5, 6 ]
```

#### for

只是循环。

### Benchmark测试

benchmark脚本：

```js
suite('iterator', function () {
  bench('for', function () {
    const a = [1, 2, 3, 4, 5];
    for (let i = 0; i < a.length; i++) {
      // nothing
    }
  });
  bench('foreach', function () {
    const a = [1, 2, 3, 4, 5];
    a.forEach(function (d) {
      // nothing
    });
  });
  bench('for of', function () {
    const a = [1, 2, 3, 4, 5];
    for (let i of a) {
      // nothing
    }
  });
  bench('map', function () {
    const a = [1, 2, 3, 4, 5];
    a.map(x => x);
  });
});
```

测试结果：

```bash
                      iterator
      50,038,931 op/s » for
       8,980,276 op/s » foreach
       8,990,758 op/s » for of
       1,713,807 op/s » map


  Suites:  1
  Benches: 4
  Elapsed: 5,710.33 ms
```

### 结论

单凭循环 `for` 最可靠。

`foreach` 和 `for ... of` 差不多。

`map` 性能最低。

## 触发 react onchange 事件并赋值

```js
  var setValue = function (element, value) {
    element.value = value;
    if ('createEvent' in document) {
      var event = new Event('input', { bubbles: true });
      element.dispatchEvent(event);
    }
    else {
      element.fireEvent('onchange');
    }
  };
```
