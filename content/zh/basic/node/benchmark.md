---
title: Benchmark
description: ''
position: 1406
category: '知识篇-Node.js'
---

性能对比测试框架 Matcha： <https://github.com/logicalparadox/matcha>

## 使用场景

技术选型，如图形验证码，在NPM包选取使用`canvas`还是`ccap`时可以用。

或，一个问题，有多种解决方案，选择采用哪一种方案的时候。

***注意：*** 所有需要做选择的场景，最好都先做一下对比。

## 结果报告示例

```
ATL (After v1.0.1)
  if > (true) .................................... 4,752,967 op/s
  if = (true) .................................... 4,653,896 op/s
  if < (false) ................................... 4,612,560 op/s

Left Shift (ATL v1.0.0)
  << > (true) .................................... 2,562,098 op/s
  << = (true) .................................... 2,473,787 op/s
  << < (false) ................................... 2,458,286 op/s
```

## 示例代码

```js
suite('ATL', function() {
  bench('if > (true)', function(){
    atl('1.6.7','1.4.4');
  });
  bench('if = (true)', function(){
    atl('1.4.4','1.4.4');
  });
  bench('if < (false)', function(){
    atl('1.1.6','1.4.4');
  });
});

suite('Left Shift', function(){
  bench('<< > (true)', function(){
    atls('1.6.7','1.4.4');
  });
  bench('<< = (true)', function(){
    atls('1.4.4','1.4.4');
  });
  bench('<< < (false)', function(){
    atls('1.1.6','1.4.4');
  });
});
```

源码位于: <https://github.com/WulianCC/node-atl/blob/master/benchmark/parse.js>
