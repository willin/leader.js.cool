---
title: 缓存设计
description: ''
position: 2113
category: '经验篇-项目'
---

缓存结构设计示例。

## 说明

常规结构：

```
Type:Key:SubKey
```

用`:`区分，在管理工具上会自动变成文件夹可收缩。

## 注册频率限制

Key：

```
reg:#手机唯一id或注册ip#
```

Value：

```
成功注册的用户名或手机号
```

（记录可以有迹可循，如果不需要查询，直接记录固定值，如`1`即可）

TTL： 1800(s)

说明：

> 注册成功后创建该`key`；判断，如果取到非`null`值，禁止注册。


## 登录尝试限制

Key：

```
trial:#手机唯一id或登录ip#
```

Value：

```
错误尝试次数
```

TTL： 1800(s)

说明：

> 初次尝试新建该`key`，值为1；判断，如果值大于3，禁止登录。

## 复杂缓存结构示例

接口性能监控，如图：

![Image](/experience/project/hmap.png)

结构：

Key：

```
api:#记录日期#
```

Value： 数组（通过Redis `HSet`和`HGet`命令进行存储和读取）

```js
[
  key：'#total（总计）/来源（如android-xxx/ios-xxx/device-xxx/web-xxx）/路径（如app1/v2/path/action）#'
  value: { // JSON.stringify(#对象#)
    count: '请求次数',
    success: '成功次数',
    avg: '平均响应时间',
    max: '最大响应时间',
    min: '最小响应时间'
  }
]
```
