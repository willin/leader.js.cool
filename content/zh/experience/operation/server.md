---
title: 服务器配置
description: ''
position: 2201
category: '经验篇-运维'
---

## 常用工具

### 性能监控

开放接口文档

- NewRelic: <https://rpm.newrelic.com/api/explore/applications/list>
- 阿里云: <https://help.aliyun.com/document_detail/28617.html>

<adsbygoogle></adsbygoogle>

## 创建用户

```bash
adduser xxx
# 输入密码
```

**_注_**：还有一个`useradd`命令，不会创建用户目录。

```bash
sudo vi /etc/sudoers
```

在

```
root    ALL=(ALL:ALL) ALL
```

后插入一行

```
xxx(用户名)    ALL=(ALL:ALL) ALL
```

## 切换到用户安装环境

```bash
su username
```

### 安装 zsh

```bash
sudo apt-get update
sudo apt-get install zsh curl git
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 配置 ssh 免密码登录

```bash
mkdir ~/.ssh
chmod 700 ~/.ssh
cd ~/.ssh
touch authorized_keys
chmod 644 authorized_keys
vi authorized_keys
```

插入你的`ssh`公钥。

```bash
# 不存在创建（注意是在本地，不是远程服务器）
ssh-keygen
# 一直按回车，结束
# 存在直接查看
cat ~/.ssh/id_rsa.pub
```

### 安装 node

（示例，从官网获取最新版本源码编译安装）

```bash
cd ~ #注意安装目录，最好在用户目录下，其他系统目录可能会有权限问题
wget -c https://nodejs.org/dist/v6.4.0/node-v6.4.0.tar.gz
tar zxvf node-v6.4.0.tar.gz
cd node-v6.4.0/
./configure
make
sudo make install
# 安装成功测试
node -v
npm -v
```

源码编译安装 Redis、OpenSSL 等步骤基本相同。具体可以参考官方文档。

### Nginx 安装配置

Nginx 1.9.5 之后的版本支持了`HTTP/2`，同时，也取消了对`SPDY`的支持。

以`HTTP/2`模块支持安装为例。

```bash
wget -c http://nginx.org/download/nginx-1.11.3.tar.gz
tar zxvf nginx-1.11.3.tar.gz
cd nginx-1.11.3/
./configure --with-pcre --with-http_ssl_module --with-http_v2_module
```

#### 异常处理

1.没装 PCRE

```
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```

<ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/>

查找并下载最新版本 PCRE 源码，并解压

```bash
wget -c ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.38.tar.gz
tar zxvf pcre-8.38.tar.gz
cd pcre-8.38/
pwd
# /home/user/nginx-1.11.3/pcre-8.38
```

修改`configure`命令为：

```bash
./configure --with-pcre=/home/user/nginx-1.11.3/pcre-8.38 --with-http_ssl_module --with-http_v2_module
```

2.没装 OpenSSL

```
./configure: error: SSL modules require the OpenSSL library.
You can either do not enable the modules, or install the OpenSSL library
into the system, or build the OpenSSL library statically from the source
with nginx by using --with-openssl=<path> option.
```

<https://www.openssl.org/source/>

查找并下载最新版本 OpenSSL 源码，并解压

```bash
wget -c https://www.openssl.org/source/openssl-1.0.2h.tar.gz
tar zxvf openssl-1.0.2h.tar.gz
cd openssl-1.0.2h
pwd
# /home/user/nginx-1.11.3/openssl-1.0.2h
```

**_注_**： `openssl-1.1.0-pre6` 版本经测试无法安装。

```bash
./configure --with-pcre=/home/user/nginx-1.11.3/pcre-8.38 --with-openssl=/home/user/nginx-1.11.3/openssl-1.0.2h --with-http_ssl_module --with-http_v2_module
```

3. 没装 zlib

```
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
```

<http://www.zlib.net/>

查找并下载最新版本 Zlib 源码，并解压

```bash
wget -c http://zlib.net/zlib-1.2.8.tar.gz
tar zxvf zlib-1.2.8.tar.gz
cd zlib-1.2.8
pwd
# /home/user/nginx-1.11.3/zlib-1.2.8
```

```bash
./configure --with-pcre=/home/user/nginx-1.11.3/pcre-8.38 --with-openssl=/home/user/nginx-1.11.3/openssl-1.0.2h --with-zlib=/home/user/nginx-1.11.3/zlib-1.2.8 --with-http_ssl_module --with-http_v2_module
```

#### 安装

```bash
make
sudo make install
```

#### apt-get 方式安装 nginx

```bash
cd /etc/apt/
sudo vi nginx_signing.key
```

把如下内容粘贴到里边

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2.0.22 (GNU/Linux)

mQENBE5OMmIBCAD+FPYKGriGGf7NqwKfWC83cBV01gabgVWQmZbMcFzeW+hMsgxH
W6iimD0RsfZ9oEbfJCPG0CRSZ7ppq5pKamYs2+EJ8Q2ysOFHHwpGrA2C8zyNAs4I
QxnZZIbETgcSwFtDun0XiqPwPZgyuXVm9PAbLZRbfBzm8wR/3SWygqZBBLdQk5TE
fDR+Eny/M1RVR4xClECONF9UBB2ejFdI1LD45APbP2hsN/piFByU1t7yK2gpFyRt
97WzGHn9MV5/TL7AmRPM4pcr3JacmtCnxXeCZ8nLqedoSuHFuhwyDnlAbu8I16O5
XRrfzhrHRJFM1JnIiGmzZi6zBvH0ItfyX6ttABEBAAG0KW5naW54IHNpZ25pbmcg
a2V5IDxzaWduaW5nLWtleUBuZ2lueC5jb20+iQE+BBMBAgAoAhsDBgsJCAcDAgYV
CAIJCgsEFgIDAQIeAQIXgAUCV2K1+AUJGB4fQQAKCRCr9b2Ce9m/YloaB/9XGrol
kocm7l/tsVjaBQCteXKuwsm4XhCuAQ6YAwA1L1UheGOG/aa2xJvrXE8X32tgcTjr
KoYoXWcdxaFjlXGTt6jV85qRguUzvMOxxSEM2Dn115etN9piPl0Zz+4rkx8+2vJG
F+eMlruPXg/zd88NvyLq5gGHEsFRBMVufYmHtNfcp4okC1klWiRIRSdp4QY1wdrN
1O+/oCTl8Bzy6hcHjLIq3aoumcLxMjtBoclc/5OTioLDwSDfVx7rWyfRhcBzVbwD
oe/PD08AoAA6fxXvWjSxy+dGhEaXoTHjkCbz/l6NxrK3JFyauDgU4K4MytsZ1HDi
MgMW8hZXxszoICTTiQEcBBABAgAGBQJOTkelAAoJEKZP1bF62zmo79oH/1XDb29S
YtWp+MTJTPFEwlWRiyRuDXy3wBd/BpwBRIWfWzMs1gnCjNjk0EVBVGa2grvy9Jtx
JKMd6l/PWXVucSt+U/+GO8rBkw14SdhqxaS2l14v6gyMeUrSbY3XfToGfwHC4sa/
Thn8X4jFaQ2XN5dAIzJGU1s5JA0tjEzUwCnmrKmyMlXZaoQVrmORGjCuH0I0aAFk
RS0UtnB9HPpxhGVbs24xXZQnZDNbUQeulFxS4uP3OLDBAeCHl+v4t/uotIad8v6J
SO93vc1evIje6lguE81HHmJn9noxPItvOvSMb2yPsE8mH4cJHRTFNSEhPW6ghmlf
Wa9ZwiVX5igxcvaIRgQQEQIABgUCTk5b0gAKCRDs8OkLLBcgg1G+AKCnacLb/+W6
cflirUIExgZdUJqoogCeNPVwXiHEIVqithAM1pdY/gcaQZmIRgQQEQIABgUCTk5f
YQAKCRCpN2E5pSTFPnNWAJ9gUozyiS+9jf2rJvqmJSeWuCgVRwCcCUFhXRCpQO2Y
Va3l3WuB+rgKjsQ=
=EWWI
-----END PGP PUBLIC KEY BLOCK-----
```

然后`:wq`保存

```bash
sudo apt-key add nginx_signing.key
sudo vi sources.list
```

在最后一行加入下面两行的内容：

```
deb http://nginx.org/packages/ubuntu/ trusty nginx
deb-src http://nginx.org/packages/ubuntu/ trusty nginx
```

再更新,并安装:

```bash
apt-get update
apt-get install nginx
```

如果解压报错,执行:

```bash
# 替换 deb 文件路径
sudo dpkg -i --force-overwrite  /var/cache/apt/archives/nginx_1.12.1-1~trusty_amd64.deb
sudo apt-get -f install
```

#### 配置 Nginx

参考修改安装目录下的默认配置 `conf/nginx.conf`：

```
#user  nobody;
worker_processes auto;
worker_rlimit_nofile 100000;

#pid        logs/nginx.pid;

events {
    worker_connections 10240;
    multi_accept on;
    use epoll;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    # 从项目载入nginx配置
    # include /home/user/project/conf/nginx.conf;
}
```

HTTP/2 项目配置：

```
server {
        listen 80;
        server_name example.com;
        add_header Strict-Transport-Security max-age=15768000;
        return 301 https://example.com$request_uri;
}

server {
        listen       443 ssl http2;
        server_name  example.com;

        # ssl_dhparam        /home/user/project/config/dhparam.pem;
        ssl_certificate      /home/user/project/config/ssl.crt;
        ssl_certificate_key  /home/user/project/config/ssl.key;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA:!CAMELLIA;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        add_header Strict-Transport-Security "max-age=31536000;";
        #add_header  X-Content-Type-Options "nosniff";
        #add_header X-Frame-Options DENY;

        access_log off;
        error_log /home/user/logs/example.com.error.log crit;

        location / {
                if ($http_user_agent = Mozilla/4.0){
                  return 503;
                }
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://127.0.0.1:8888/;
                proxy_redirect off;
        }
}
```

## 配置开机自启动

文件位置： `/etc/rc.local`

示例：

```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

/usr/bin/nginx &
sleep 1
sudo -u willin /project/path redis &
exit 0
```

Node.js 项目，使用`PM2`工具：

```bash
pm2 startup
```

根据界面提示，如：

```
[PM2] You have to run this command as root. Execute the following command:
      sudo su -c "env PATH=$PATH:/usr/local/bin pm2 startup linux -u username --hp /home/username"
```

执行相应代码。

如果已经添加过开机自启动，更新自启项目：

```bash
pm2 dump
pm2 save
```
