---
title: 代码细节处理
description: ''
position: 2115
category: '经验篇-项目'
---

## 请求超时无返回

原因：

### 1.如果CPU没有飙升，可能有异常未捕获

可能情况1，如： sql `SELECT xxxx LIMIT 1` 的查询，直接用了 result[0]。 但也可能并没查到结果。

可能情况2，如： JSON.parse(xxxData)，或者在用第三方库的时候注意一下，如果方法不是返回`Promise`对象，很可能异常的时候是`Throw`出一个错误，需要做`try/catch`捕获。

可能情况3，如： Callback方法，如 `client.query((result, err)=> { })`，中，需要加 `if(err)` 的判断。

### 2.CPU飙升：大多数情况是死循环

如：

```js
for(let i = 0; i < xxx1.length; i++) {
  for(let j=0; i < xxx2.length; j++) {
    // xxx
  }
}
```

第二个循环条件中 `j` 用成了 `i` 导致死循环产生。

死循环大多发生于对数据遍历的处理。产生死循环最大的可能原因是***循环的条件***。

如果在循环体内用到以下一些方法，也需要特别注意：

* 对数据数组的改动，如：pop/shift/slice
* 循环体的退出，如：break/continue

可以配合`PM2`和定时任务脚本对进程CPU占用进行监控，自动重启服务。

## 内存泄露

基本情况排查参考： <https://cnodejs.org/topic/4fa94df3b92b05485007fd87>

比较常见的：

```js
exports.Func = async() => {
  // 避免方法内require
  const redisClient = require('@dwing/redis');

  // 没必要放在方法里，可以放到外边，多个方法共用
  const redis = redisClient({
    // config
  });
  // xxxx
};
```

## MySQL 编码细节

```js
const {pool} = require('@dwing/mysql');
const {isEmpty} = require('@dwing/common');

(async() => { // 包裹在async中
  const client = await pool({ // mysql有await，redis没有
    // config
  });
  const result = await client.query('SELECT 1');
  if(isEmpty(result) && !Array.isArray(result)) {
    // 查询出错，不能用 result[]
  }
  if(isEmpty(result)) {
    // 查询结果为空，不能用 result[]
  }
  return result[0];
})();
```

除了`SELECT`的结果是数组，其他的都是对象，并且包含`result.affectedRows`

```js
const result = await client.query('UPDATE xxx SET xxx WHERE xxx');
if(isEmpty(result)) {
  // 查询出错， 不能用 result.affectedRows
}
return result.affectedRows;
```

## Redis 编码细节

```js
const redisClient = require('wulian-redis');
const redis = redisClient({
  // config
});

(async() => { // 包裹在async中
  const result = await redis.get('xxxKey');
  if(result === null) { // xxxKey不存在，返回值为 null

  }
})();
```

如果要存取`JSON`格式数据：

```js
await redis.set('xxxKey', JSON.stringify(xxxJSONVal));

let result = {};
try { // 读取要异常捕获，不然篡改值可能导致程序崩
  result = JSON.parse(await redis.get('xxxKey'));
} catch(e) { }
```

如果要设置超时：

```js
await redis.setex('xxxKey', 3600, JSON.stringify(xxxJSONVal));
```

## 其他资料

性能调优与故障排查： <https://github.com/JacksonTian/jsconfcn2016>
