---
title: Later 计划任务
description: ''
position: 2203
category: '经验篇-运维'
---

<http://bunkat.github.io/later/index.html>

应用场景：计划任务，类似Crontab。

```js
import later from 'later';
// 每分钟执行一次
later.setInterval(()=>{
  // Codes

}), later.parse.recur().every(1).minute());
// 每天的 16:55 执行
later.setInterval(()=>{
  // Codes

}), later.parse.cron('55 16 */1 * * ?'));
// 每小时的 1 分 执行
later.setInterval(()=>{
  // Codes

}), later.parse.cron('1 */1 * * * ?'));
```
