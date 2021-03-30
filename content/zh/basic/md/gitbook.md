---
title: GitBook静态文档生成
description: ''
position: 1504
category: 知识篇-Markdown
---

GitBook 是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书

## 安装使用

- 登陆 gitbook,使用 github 账号登陆,新建一个 book,然后选择 link to github.(不要选择 gitbook 在线编辑)

- 新建 github 仓库比如 some_book.git

- 本地安装 gitbook 和 gitbook-cli 命令行工具:

  $ cnpm i -g gitbook-cli
  $ gitbook versions:install

- 本地新建 my_book

  $ gitbook init my_book #新建一本书
  $ cd my_book
  $ git init

- 使用 GitBook 制作电子书，必备两个文件：README.md 和 SUMMARY.md

### README.md:

电子书介绍说明部分

### SUMMARY.md:

电子书目录部分

接下来只需要编写相应章节即可。在编辑完 README.md 和 SUMMARY.md 后，可以运行以下命令：

    $ git add .
    $ git commit -m '...'
    $ git remote add origin git@github.com:xxxx/some_book.git #创建远程服务器
    $ git push -u origin master

Gitbook 首先把你的 Markdown 文件编译为 HTML 文件，并根据 SUMMARY.md 生成书的目录。所有生存的文件都保存在当前目录下的一个名为\_book 的子目录中。完成这些工作后，Gitbook 会作为一个 HTTP Server 运行，并在 4000 端口监听 HTTP 请求。

然后使用 markdown 语法编辑文章,开启本地服务器:

    $ gitbook serve

## 插件使用

添加插件后使用

```bash
gitbook install
```

进行安装

<adsbygoogle></adsbygoogle>

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

book.json 配置：

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

book.json 配置：

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
