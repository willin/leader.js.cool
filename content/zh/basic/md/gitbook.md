---
title: GitBook静态文档生成
description: ''
position: 1504
category: 知识篇-Markdown
---

GitBook是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书

## 安装使用

* 登陆gitbook,使用github账号登陆,新建一个book,然后选择link to github.(不要选择gitbook在线编辑)

* 新建github仓库比如some_book.git

* 本地安装gitbook和gitbook-cli命令行工具:


    $ cnpm i -g gitbook-cli
    $ gitbook versions:install

* 本地新建my_book


    $ gitbook init my_book #新建一本书
    $ cd my_book
    $ git init

* 使用GitBook制作电子书，必备两个文件：README.md和SUMMARY.md

### README.md:

电子书介绍说明部分

### SUMMARY.md:

电子书目录部分

接下来只需要编写相应章节即可。在编辑完README.md和SUMMARY.md后，可以运行以下命令：

    $ git add .
    $ git commit -m '...'
    $ git remote add origin git@github.com:xxxx/some_book.git #创建远程服务器
    $ git push -u origin master

Gitbook首先把你的Markdown文件编译为HTML文件，并根据SUMMARY.md生成书的目录。所有生存的文件都保存在当前目录下的一个名为_book的子目录中。完成这些工作后，Gitbook会作为一个HTTP Server运行，并在4000端口监听HTTP请求。


然后使用markdown语法编辑文章,开启本地服务器:

    $ gitbook serve

## 插件使用

添加插件后使用

```bash
gitbook install
```

进行安装

### TOC 目录生成

book.json 配置：

```json
{
    "plugins": ["atoc"],
    "pluginsConfig": {
        "atoc": {
            "addClass": true,
            "className": "atoc"
        }
    }
}
```

在需要使用目录的章节文字顶部加入

```html
<!-- toc -->
```

即可生成文档目录。


### 捐赠插件

book.json配置：

```json
{
    "plugins": ["donate"],
    "pluginsConfig": {
        "donate": {
          "wechat": "例：/images/qr.png",
          "alipay": "http://blog.willin.wang/static/images/qr.png",
          "title": "默认空",
          "button": "默认值：Donate",
          "alipayText": "默认值：支付宝捐赠",
          "wechatText": "默认值：微信捐赠"
        }
    }
}
```

### 文章字数统计

book.json配置：

```json
{
    "plugins": ["wordcount"]
}
```

运行示例：

```
info: found 24 pages
info: found 99 asset files
Completed counting with 13313 words.
info: >> generation finished with success in 5.8s !

Starting server ...
Serving book on http://localhost:4000
```
