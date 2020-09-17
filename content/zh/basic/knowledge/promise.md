---
title: Promise 思想
description: ''
position: 1204
category: '知识篇-基础知识'
---

改善 Callback Hell 问题

## 什么样的函数需要改写成 Promise

例 1:

```js
mysql.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) {
    throw err;
  }
  //对查询结果进行操作
  console.log('The solution is: ', rows[0].solution);
});
```

例 2:

```js
fs.readFile('myfile.txt', function (err, file) {
  if (err) {
    throw err;
  }
  //对file进行操作
});
```

## Callback Hell

例子:

```js
mysql.query(sql1, function (err1, rows1) {
  if (err1) {
    throw err1;
  }
  mysql.query(sql2, function (err2, rows2) {
    if (err2) {
      throw err2;
    }
    //对rows1和rows2进行操作
  });
});
```

这样写法的问题:

1. 嵌套太多,可读性差
2. 变量名受污染
3. 各个函数之间的干扰,一但错误发生,不能继续向下执行

等等

## 示例代码

```js
'use strict';
/**
 * 生成一个defer对象
 * @return {object} Promise对象
 */
let getDefer = function () {
  let deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

/*
 * 通过getDefer封装Promise
 */
let promiseFunc = function (input) {
  let deferred = getDefer();
  if (parseInt(input, 10) < 10) {
    deferred.resolve(input * input);
  } else {
    deferred.reject('Input Number Too Large');
  }
  return deferred.promise;
};

promiseFunc(5)
  .then(function (result) {
    console.log(result); //25
  })
  .catch(function (err) {
    console.log(err); //不报错
  });

promiseFunc(15)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err); //报错
  });

/*
 * 链式写法
 */
setTimeout(function () {
  console.log('=============');
  promiseFunc(2)
    .then(function (val) {
      console.log('Step 1:', val); //val===4
      return promiseFunc(val);
    })
    .then(function (val) {
      console.log('Step 2:', val); //val===16
      return promiseFunc(val);
    })
    .then(function (val) {
      console.log('step 3:', val); //err 不执行这句,跳到catch,往后的then均不执行
      return promiseFunc(val);
    })
    .then(function (val) {
      console.log('Step 4:', val);
      return promiseFunc(val);
    })
    .catch(function (err) {
      console.log(err);
    });
}, 20);

/*
 * Promise.all
 * 全部执行完,再返回
 * (常用)
 */
setTimeout(function () {
  Promise.all([promiseFunc(1), promiseFunc(2), promiseFunc(3)]).then(function (val) {
    console.log('=============');
    console.log(val); //[1,4,9]
  });
}, 100);

/*
 * Promise.race
 * 谁先执行完,返回谁
 * (不常用)
 */
setTimeout(function () {
  Promise.race([promiseFunc(1), promiseFunc(2), promiseFunc(3)]).then(function (val) {
    console.log('=============');
    console.log(val); //1
  });
}, 100);
```

执行结果：

```
25
Input Number Too Large
=============
Step 1: 4
Step 2: 16
Input Number Too Large
=============
[ 1, 4, 9 ]
=============
1
```

## What's Next?

ES7 Async/Await:

```js
(async () => {
  const result = await promiseFN();
  console.log(result);
})();
```

多个异步方法优化:

```js
(async () => {
  const tasks = [];
  tasks.push(promiseFN1());
  tasks.push(promiseFN2());
  tasks.push(promiseFN3());
  const result = await Promise.all(tasks);
  console.log(result[0], result[1], result[2]);
})();
```
