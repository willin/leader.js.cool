---
title: CertBot 证书
description: ''
position: 2207
category: '经验篇-运维'
---

在阿里云 ECS 上安装的话，Python 版本是包含 2、3 两个的，所以需要升级 pip 到 9.0 之后版本。

如果是`Ubuntu 16.04`版本，千万不要用`Root`安装。

升级过程中提示：

```
locale.Error: unsupported locale setting
```

通过修改本地语言修复：

```bash
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
sudo dpkg-reconfigure locales
```

然后一路回车结束。

```bash
pip install -U pip

# 测试安装结果
pip -V
# pip 9.0.1 from /usr/local/lib/python2.7/dist-packages (python 2.7)
```

<adsbygoogle></adsbygoogle>

安装`certbot-auto`

```bash
wget https://dl.eff.org/certbot-auto
chmod +x certbot-auto
```

检查 Nginx 是否已经配置该网站。

```
server {
        listen 80;
        server_name example.com;
        add_header Strict-Transport-Security max-age=15768000;
        return 301 https://example.com$request_uri;
}
```

颁发证书：

```bash
./certbot-auto certonly --agree-tos --email mail@example.com --nginx -d example.com
```

添加 HTTPS 配置：

```conf
server {
        listen 443 ssl http2; # managed by Certbot
        server_name example.com;
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
        ssl_session_cache shared:le_nginx_SSL:1m; # managed by Certbot
        ssl_session_timeout 1440m; # managed by Certbot

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # managed by Certbot
        ssl_prefer_server_ciphers on; # managed by Certbot

        ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256 ECDHE-ECDSA-AES256-GCM-SHA384 ECDHE-ECDSA-AES128-SHA ECDHE-ECDSA-AES256-SHA ECDHE-ECDSA-AES128-SHA256 ECDHE-ECDSA-AES256-SHA384 ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-AES256-GCM-SHA384 ECDHE-RSA-AES128-SHA ECDHE-RSA-AES128-SHA256 ECDHE-RSA-AES256-SHA384 DHE-RSA-AES128-GCM-SHA256 DHE-RSA-AES256-GCM-SHA384 DHE-RSA-AES128-SHA DHE-RSA-AES256-SHA DHE-RSA-AES128-SHA256 DHE-RSA-AES256-SHA256 EDH-RSA-DES-CBC3-SHA"; # managed by Certbot

        # add_header Alternate-Protocol  443:npn-spdy/3;
        add_header Strict-Transport-Security "max-age=31536000;";
        #add_header  X-Content-Type-Options "nosniff";
        #add_header X-Frame-Options DENY;

        access_log off;

        # 应用部分
}
```

更新证书命令：

```bash
./certbot-auto renew --dry-run
```
