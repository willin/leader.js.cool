# 服务器配置

## 创建用户

```bash
adduser xxx
# 输入密码
```

***注***：还有一个`useradd`命令，不会创建用户目录。

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

### 配置ssh免密码登录

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

### 安装node

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

源码编译安装Redis、OpenSSL等步骤基本相同。具体可以参考官方文档。

### Nginx安装配置

Nginx 1.9.5 之后的版本支持了`HTTP/2`，同时，也取消了对`SPDY`的支持。

以`HTTP/2`模块支持安装为例。

```bash
wget -c http://nginx.org/download/nginx-1.11.3.tar.gz
tar zxvf nginx-1.11.3.tar.gz
cd nginx-1.11.3/
./configure --with-pcre --with-http_ssl_module --with-http_v2_module
```

#### 异常处理

1.没装PCRE

```
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```

<ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/>

查找并下载最新版本PCRE源码，并解压

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

2.没装OpenSSL

```
./configure: error: SSL modules require the OpenSSL library.
You can either do not enable the modules, or install the OpenSSL library
into the system, or build the OpenSSL library statically from the source
with nginx by using --with-openssl=<path> option.
```

<https://www.openssl.org/source/>

查找并下载最新版本OpenSSL源码，并解压

```bash
wget -c https://www.openssl.org/source/openssl-1.0.2h.tar.gz
tar zxvf openssl-1.0.2h.tar.gz
cd openssl-1.0.2h
pwd
# /home/user/nginx-1.11.3/openssl-1.0.2h
```

***注***： `openssl-1.1.0-pre6` 版本经测试无法安装。

```bash
./configure --with-pcre=/home/user/nginx-1.11.3/pcre-8.38 --with-openssl=/home/user/nginx-1.11.3/openssl-1.0.2h --with-http_ssl_module --with-http_v2_module
```

3. 没装zlib

```
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
```

<http://www.zlib.net/>

查找并下载最新版本Zlib源码，并解压

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

#### 配置Nginx

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

HTTP/2项目配置：

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
