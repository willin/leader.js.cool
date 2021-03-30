---
title: 异常捕获
description: ''
position: 1307
category: 知识篇-Vanilla JS
---

## ES5 中的传统做法

假设代码块执行抛出错误 fail，那么捕获该错误的写法为：

```js
try {
  // 代码块执行，并抛出 fail 错误
  throw new Error('fail');
} catch (e) {
  console.log(e);
}
```

### 定时器

我们先来针对上面的代码改写一下，加入一个定时器。

```js
try {
  setTimeout(() => {
    throw new Error('fail');
    // Uncaught Error: fail
  }, 1000);
} catch (e) {
  console.log(e);
}
```

像这样，将 try/catch 扔在定时器的外面，是无法捕获到内部的错误的。

正确的做法应该是：

```js
setTimeout(() => {
  try {
    throw new Error('fail');
  } catch (e) {
    console.log(e);
  }
}, 1000);
```

### Promise

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    // 同步代码中的 throw 可以被捕捉到
    throw new Error('fail');
  });
}

doSomething()
  .then((x) => {
    console.log('success:', x);
  })
  .catch((err) => {
    console.log('fail:', err);
  });
```

这样写是没有问题的，错误能够被捕获到。但只要稍微修改一下，可能就出现问题了。比如：

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    // 异步代码中的 throw 不能被 Promise 的 catch 捕捉到
    setTimeout(() => {
      throw new Error('fail');
    }, 1000);
  });
}

doSomething()
  .then((x) => {
    console.log('success:', x);
  })
  .catch((err) => {
    console.log('fail:', err);
  });
```

这里抛出但错误将不能被捕获。所以，在 Promise 中，我们一般通过 reject 来抛出错误。

```js
function doSomething(x) {
  return new Promise((resolve, reject) => reject(x));
}

doSomething('fail')
  .then((x) => {
    console.log('success:', x);
  })
  .catch((err) => {
    console.log('fail:', err);
  });
// fail: fail
```

另外，还有一个比较有意思的细节，在 catch 之后继续添加 .then 会被继续执行。

```js
function doSomething(x) {
  return new Promise((resolve, reject) => reject(x));
}

doSomething('fail')
  .then((x) => {
    console.log('success:', x);
  })
  .catch((err) => {
    console.log('fail:', err);
    // 这里可以写 return 给下面的方法继续执行
  })
  .then((x) => {
    console.log('continue:', x);
  });
// fail: fail
// continue: undefined
```

<adsbygoogle></adsbygoogle>

### Async/Await

本质上来讲， Async/Await 是通过 Promise 实现，所以基本跟上面 Promise 所讲的差不多。

可以在 await 方法外嵌套 try/catch，类似这样：

```js
function doSomething(x) {
  return new Promise((resolve, reject) => reject(x));
}

(async () => {
  try {
    const result = await doSomething('fail');
    console.log('success:', result);
    // return 返回
  } catch (err) {
    console.log('fail:', err);
    // return 返回
  }
})();
// fail: fail
```

但这里就有一个问题，比如函数需要有返回，那么返回的语句就需要写两次，正常但时候返回结果，错误的时候，返回一个 `throw new Error()` 或者其他的。有一个小的窍门，可以这样写：

```js
function doSomething(x) {
  return new Promise((resolve, reject) => reject(x));
}

(async () => {
  const result = await doSomething('fail').catch((err) => {
    console.log('fail:', err);
    return 0; // 默认值
  });
  console.log('success:', result);
})();
// fail: fail
// success: 0
```

在错误捕获到之后，重新分配一个默认值，让代码继续运行。
