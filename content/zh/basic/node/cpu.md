---
title: Node.js CPU调度优化
menuTitle: CPU调度
description: ''
position: 1408
category: '知识篇-Node.js'
---

!> Master / Cluster 模式

## 单一服务器多核心分配

假设处理的任务列表如下:

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
```

以 10 为例,假设服务器为 4CPU,那么每个 CPU 处理的任务分别为:

- CPU1: [1, 2, 3]
- CPU2: [4, 5, 6]
- CPU3: [7, 8]
- CPU4: [9, 0]

```js
const numCPUs = require('os').cpus().length; // 假设该值为 4

// 处理的任务列表
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// 调度处理代码写在这儿
// 每个 CPU 分配 N 个任务
const n = Math.floor(arr.length / numCPUs);
// 未分配的余数
const remainder = arr.length % numCPUs;

for (let i = 1; i <= numCPUs; i += 1) {
  console.log(arr.splice(0, n + (i > remainder ? 0 : 1)));
}
```

## Cluster 模式示例

入口文件 `index.js`

```js
const cluster = require('cluster');
(async () => {
  /* eslint global-require:0 */
  let run;
  if (cluster.isMaster) {
    run = require('./cluster/master');
  } else {
    run = require('./cluster/worker');
  }
  try {
    await run();
  } catch (err) {
    console.trace(err);
  }
})();
```

Master 任务: `./cluster/master.js`

```js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// 处理的任务列表
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

module.exports = async () => {
  // 调度处理代码写在这儿
  // 每个 CPU 分配 N 个任务
  const n = Math.floor(arr.length / numCPUs);
  // 未分配的余数
  const remainder = arr.length % numCPUs;

  for (let i = 1; i <= numCPUs; i += 1) {
    const tasks = arr.splice(0, n + (i > remainder ? 0 : 1));
    // 将任务编号传递到 Cluster 内启动
    cluster.fork({ tasks: JSON.stringify(tasks) });
  }
  cluster.on('exit', (worker) => {
    console.log(`worker #${worker.id} PID:${worker.process.pid} died`);
  });
};
```

Cluster 任务: `./cluster/worker.js`

```js
const cluster = require('cluster');
// 禁止直接启动
if (cluster.isMaster) {
  process.exit(0);
}

module.exports = async () => {
  const env = process.env.tasks;
  let tasks = [];
  if (/^\[.*\]$/.test(env)) {
    tasks = JSON.parse(env);
  }
  if (tasks.length === 0) {
    // 非法启动, 释放进程资源
    process.exit(0);
  }
  console.log(`worker #${cluster.worker.id} PID:${process.pid} Start`);
  console.log(tasks);
};
```

<adsbygoogle></adsbygoogle>

## 多服务器多核心分配调度

假设处理的任务列表如下:

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
```

有多台负载均衡器,仅确定服务器数量,不确定服务器硬件配置.

假设目前有 3 台服务器,分别为 `4` 核心, `6` 核心, `8` 核心.

按照核心性能进行优先调度,那么每个 CPU 处理的任务分别为:

- 服务器 1 (`4` 核心, 1.8GHz)
  - CPU1: [ 29 ]
  - CPU2: [ 30 ]
  - CPU3: [ 31 ]
  - CPU4: [ 32 ]
- 服务器 2 (`6` 核心, 2.8GHz)
  - CPU1: [ 1, 2 ]
  - CPU2: [ 3, 4 ]
  - CPU3: [ 5, 6 ]
  - CPU4: [ 7, 8 ]
  - CPU5: [ 9, 10 ]
  - CPU6: [ 11, 12 ]
- 服务器 3 (`8` 核心, 2.0GHz)
  - CPU1: [ 13, 14 ]
  - CPU2: [ 15, 16 ]
  - CPU3: [ 17, 18 ]
  - CPU4: [ 19, 20 ]
  - CPU5: [ 21, 22 ]
  - CPU6: [ 23, 24 ]
  - CPU7: [ 25, 26 ]
  - CPU8: [ 27, 28 ]

```js
const os = require('os');
const numCPUs = os.cpus().length;

// 处理的任务列表
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

// 调度处理代码写在这儿
// 处理器主频
const speed = os.cpus().reduce((sum, cpu) => sum + cpu.speed, 0) / numCPUs;
// 主机名
const hostname = os.hostname();
// 获取内网ip
const eth0 = os.networkInterfaces().eth0;
const ip = typeof eth0 === 'undefined' ? '' : eth0.filter((x) => x.family === 'IPv4')[0].address;

// ./cluster/master.js
module.exports = async () => {
  // 上报服务器信息到公共区域, 如 redis
  // 等待 `3` 台服务器全部上报完成
  // 性能最高的一台执行任务调度,得到任务列表
  // 写入公共区域,下派任务到其他服务器
  // 下派本地cluster任务
};
```
