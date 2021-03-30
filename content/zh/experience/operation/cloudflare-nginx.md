---
title: CloudFlare
description: ''
position: 2208
category: '经验篇-运维'
---

# CloudFlare Nginx 获取真实 ip 地址

## 配置

安装 `ngx_http_realip_module` 模块, 在 `nginx.conf` 中进行配置:

```conf
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 104.16.0.0/12;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 199.27.128.0/21;
set_real_ip_from 2400：cb00 :: / 32;
set_real_ip_from 2606：4700 :: / 32;
set_real_ip_from 2803：f800 :: / 32;
set_real_ip_from 2405：b500 :: / 32;
set_real_ip_from 2405：8100 :: / 32;
set_real_ip_from 2c0f：f248 :: / 32;
set_real_ip_from 2a06：98c0 :: / 29;

# 使用以下任意一个
# real_ip_header CF-Connecting-IP;
# 推荐这个
real_ip_header X-Forwarded-For;
```

从这个网址获取 IP 列表的更新: <https://www.cloudflare.com/ips/>

<adsbygoogle></adsbygoogle>

## 参考资料

- Nginx 模块`ngx_http_realip_module`: <http://nginx.org/en/docs/http/ngx_http_realip_module.html>
- CloudFlare 原始访客 ip: <https://support.cloudflare.com/hc/en-us/articles/200170706-How-do-I-restore-original-visitor-IP-with-Nginx->
