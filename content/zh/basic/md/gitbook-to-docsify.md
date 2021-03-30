---
title: Gitbook 迁移到 Docsify
description: ''
position: 1502
category: 知识篇-Markdown
---

## 1. 删除 GitBook 相关文件/文件夹

比如 `public` 目录, `node_modules`目录, `book.json` 等.

## 2. 将 `Summary.md` 改名为 `_sidebar.md`

去除文件内的标题 `#` , 都改为列表

类似:

```markdown
- [版权](COPYRIGHT.md)
- 知识篇
  - [操作系统(OS X)](basic/osx.md)
  - 必备神器
    - [Brew](basic/resource/brew.md)
    - [OhMyZsh](basic/resource/zsh.md)
    - [Dnsmasq](basic/resource/dnsmasq.md)
    - [IDE](basic/resource/ide.md)
    - [科学上网](basic/resource/ss.md)
    - [在线资源](basic/resource/online.md)
    - [离线资源](basic/resource/offline.md)
    - [前端资源](basic/resource/frontend.md)
```

## 3. 安装 Docsify

```bash
yarn global add docsify-cli
# 或
npm i -g docsify-cli
```

项目根目录创建 `index.html`, 如:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>不可替代的团队领袖培养计划</title>
    <meta name="description" content="Description" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script type="text/javascript">
    window.$docsify = {
      name: '《团队领袖培养计划》',
      repo: 'https://github.com/js-cool/leader.js.cool.git',
      loadSidebar: true,
      subMaxLevel: 2,
      formatUpdated: '{YYYY}-{MM}-{DD} {HH}:{mm}',
      executeScript: true,
      alias: {}
    };
  </script>
  <script type="text/javascript" src="//unpkg.com/docsify/lib/docsify.min.js"></script>
</html>
```

<adsbygoogle></adsbygoogle>

注意这里的 `alias`, 是设置别名用的. 我们需要为每个创建的目录重定向`_sidebar.md`, 因为 Docsify 默认是从当前目录下去找这个文件的.

写一个简单脚本遍历一下,在根目录创建 `sidebar.js`

```js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
const result = {};

function readDirSync(p) {
  const dir = fs.readdirSync(p);
  dir.forEach((file) => {
    const info = fs.statSync(`${p}/${file}`);
    if (info.isDirectory() && file.indexOf('.') !== 0 && file.indexOf('_') !== 0) {
      result[`${p.replace(root, '')}/${file}/_sidebar.md`] = '/_sidebar.md';
      readDirSync(`${p}/${file}`);
    }
  });
}

readDirSync(root);
console.log(result);
```

将打印出来

```js
{
  '/basic/_sidebar.md': '/_sidebar.md',
  '/basic/algorithm/_sidebar.md': '/_sidebar.md',
  '/basic/db/_sidebar.md': '/_sidebar.md',
  '/basic/framework/_sidebar.md': '/_sidebar.md',
  '/basic/js/_sidebar.md': '/_sidebar.md'
}
```

这样的一个对象,赋值到 `alias` 里即可.

## 4.发布

如果发布到`Github Pages`或其他类似的地方,不在需要将`Pages`部署到`gh-pages`分支, 只需要修改为部署`master`分支即可.
