---
title: Redis
description: ''
position: 1603
category: 知识篇-DB
---

## 代码示例

一般 Redis 里存储的数据需要一个默认的 TTL，即到期删除，尽可能避免无用数据长期存储。

```js
const redis = require('@dwing/redis');

const client = redis({
  host: '127.0.0.1',
  port: 6379,
  db: 0
});

(async () => {
  // 推荐
  await client.set('trial:127.0.0.1', 1, 900);

  // 或

  // 需要注意，如果该`key`之前已存在，且ttl已设置，重新set之后，ttl会变成-1（永久）；
  await client.set('trial:127.0.0.1', 1);
  // TTL: 900s
  await client.expire('trial:127.0.0.1', 900);
})();
```

<adsbygoogle></adsbygoogle>

## 注意事项

- 设置 TTL，默认超时时间
- Value 值为字符串，如果 JSON 数据存之前要`JSON.stringify`，取之后要`JSON.parse`
- 具体 Redis 命令参数参考 <http://redis.io/commands>
