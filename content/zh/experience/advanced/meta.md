---
title: 元编程构造简单优雅解决方案
menuTitle: 元编程构造优雅解决方案
description: ''
position: 2403
category: '经验篇-进阶'
---

ECMAScript 6 中引入了相关 API —— `Proxy`。

参考文档： <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy>

搭配`Reflect`使用例子：

```js
var loggedObj = new Proxy(obj, {
  set: function (target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  },
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

下面用例个示例来讲解何为优雅的元编程解决方案。

<adsbygoogle></adsbygoogle>

## API 接口 SDK 封装

本章节以 **_腾讯云/QCloud_** 为例。

### 云服务器 CVM

文档说明：<https://www.qcloud.com/document/api/213/6978>

请求形式：

```
https://cvm.api.qcloud.com/v2/index.php?
Action=DescribeInstances
&SecretId=xxxxxxx
&Region=gz
&Timestamp=1465055529
&Nonce=59485
&Signature=mysignature
&instanceIds.0=ins-0hm4gvho
&instanceIds.1=ins-8oby8q00
&offset=0
&limit=20
&status=2
&zoneId=100003
```

### 传统解决方案

常规的解决方案大体如下：

```js
class Cvm(){
  constructor(config){
    // 将配置信息传入进行初始化
    this.hosts = 'https://cvm.api.qcloud.com/v2/index.php';
  }
  describeInstances(options){
    // 查看实例列表为例
    return request(this.hosts,{
      action: 'describeInstances',
      param1: options.param1
      // 其他参数拼装
    }).then(result=>{
      return JSON.parse(result);
    });
  }
  method2(options){
    // 查看实例列表为例
    return request(this.hosts,{
      action: 'method2',
      param1: options.param1
      // 其他参数拼装
    }).then(result=>{
      return JSON.parse(result);
    });
  }
}
```

如果再有其他服务，再定义 class，再封装方法。

这类处理有一个特点就是，共性很多，都是发送 HTTP 请求，获取请求结果。差异化在于：

1. 域名，QCloud 的规律为 https://{服务名}.api.qcloud.com/v2/index.php
2. 方法名，即不同的 `Action`
3. 请求类型和参数

### 简单优雅解决方案

```js
// 引入 HTTP 请求相关封装库
import request from './request';

// 列举 API 别名，包括 QCloud CVM、CDN、CDB 等所有服务
const SDKS = [
  'bm',
  'cdn',
  'cdb',
  'cvm',
  'cbs',
  'csec',
  'dayu',
  'lb',
  'monitor',
  'scaling',
  'sqlserver',
  'redis',
  'cmem',
  'trade',
  'tdsql',
  'vpc',
  'wenzhi',
  'yunsou'
];

// 默认参数
const DEFAULTS = {
  SecretId: '',
  // Signature: '',
  Region: 'gz',
  Nonce: parseInt(Math.random() * 999999, 10),
  Timestamp: parseInt(new Date() / 1000, 10)
};

const lazyLoad = (service) => (options) => {
  // 设置各服务的 api host
  const settings = {
    api: `https://${service}.api.qcloud.com/v2/index.php`,
    // 预留
    actions: {}
  };
  // 重要事情说三遍：
  // 核心代码开始
  // 核心代码开始
  // 核心代码开始
  return new Proxy(
    {},
    {
      // 创建代理
      // 定义 get 方法
      // 例子：
      // const obj = new Obj();
      // obj.prop 获取属性，用的 get 方法
      // obj.prop() 获取方法，用的依然是 get 方法
      get: (target, property) => (opts) => {
        // 非重要，将 Action 改为首字母大写，如 'ListRegions'
        const action = property.replace(property.charAt(0), property.charAt(0).toUpperCase());

        // 拼装请求参数
        let params = Object.assign({}, DEFAULTS, options);
        params = Object.assign({ Action: property }, params, opts);
        // 预留了 GET/POST 自定义
        params.method = settings.actions[action] || 'post';

        // 发送请求，获取请求结果返回
        // 由于不同接口均是 HTTP/S 方式请求，只需将对应方法封装完成，即可实现复用
        return request(settings.api, params);
      }
    }
  );
};

// LazyLoad 懒加载优化性能，但对于元编程来讲收益并不太大
SDKS.forEach((item) => {
  exports[item.toUpperCase()] = lazyLoad(item);
});
```

使用示例：

```js
import { TRADE } from 'wqcloud';
const trade = TRADE(options);

// ES7 Async/Await 方式
(async () => {
  const userInfo = await trade.DescribeUserInfo(params);
  console.log(userInfo);
})();

// ES5 Promise 方式
trade.DescribeUserInfo(params).then((userInfo) => {
  console.log(userInfo);
});
```

完整项目源码： <https://github.com/willin/wqcloud>
