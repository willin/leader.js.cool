---
title: 无限层级目录算法
description: ''
position: 1804
category: 知识篇-算法入门（使用ES 6/7）
---

# 设计1

核心字段

Column | Desc
--- | ---
oid | 组织id
name | 组织名称
parentoid | 上级组织id
rootoid | 根组织id

测试数据, 一个复杂组织目录(根据 `oid = 47378` 查出):

<a href="/_categories/test1.json" target="_blank">test1.json</a>

## 树形结构生成

期望结果:

<a href="/_categories/tree1.json" target="_blank">tree1.json</a>

递归方法:

```js
// 将测试数据保存
const orgs = require('./test1.json');

// 递归
const loop = (list, oid, isRoot = true) => {
  const c = list.filter(x => oid === (isRoot ? x.oid : x.parentoid)).map((x) => {
    // 问题1: 每次都将数组完整传入遍历
    x.children = loop(list, x.oid, false);
    return x;
  });
  // 问题2: 循环次数最多 n^n 次
  return c;
};

console.log(JSON.stringify(loop(orgs, 47378), null, 2));
```

# 设计2

核心字段

Column | Desc
--- | ---
oid | 组织id
name | 组织名称
parentoid | 上级组织id
rootoid | 根组织id
depth | 层级深度

测试数据, 一个复杂组织目录(根据 `oid = 47378` 查出):

<a href="/_categories/test2.json" target="_blank">test2.json</a>

## 树形结构生成

期望结果:

<a href="/_categories/tree2.json" target="_blank">tree2.json</a>

循环算法:

```js
// 将测试数据保存
const orgs = require('./test2.json');

const loop = (list) => {
  const sorted = list.sort((x, y) => x.depth < y.depth ? 1 : -1);
  // 计算深度
  const depth = sorted[0].depth;
  const items = {};
  // 分级遍历, 问题1: 空间复杂度
  for (let i = 1; i <= depth; i += 1) {
    items[i] = list.filter(x => x.depth === i);
  }
  // 循环自下而上遍历
  for (let i = depth; i > 1; i -= 1) {
    items[i] = items[i].forEach(x => {
      const parentNode = items[i - 1].findIndex(y => y.oid === x.parentoid);
      items[i - 1][parentNode].children = (items[i - 1][parentNode].children || [] ).concat(x);
    });
  }
  // 循环次数: CN(Depth)
  return items[1];
};

console.log(JSON.stringify(loop(orgs), null, 2));
```

# BenchMark

使用`matcha`进行性能测试

```js
suite('Categories', function () {
  bench('test 1', function() {
    loop1(orgs1, 47378);
  });
  bench('test 2', function() {
    loop2(orgs2);
  });
});
```

```
                     Categories
           2,620 op/s » test 1
             531 op/s » test 2
```
