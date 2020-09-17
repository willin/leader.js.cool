---
title: 项目结构
description: ''
position: 2103
category: '经验篇-项目'
---

目录分配尽可能简洁、清晰。

## 服务器端：MVC模式

项目目录结构：

```bash
.
├── bin
│   └── # 可执行文件
├── config
│   └── # 配置文件
├── lib
│   └── # 通用类
├── locales
│   └── # 语言文件
├── package.json
├── routes
│   └── v3 (子项目)
│       ├── handlers
│       │   └── # Controller
│       ├── models
│       │   └── # Model
│       └── views (接口可无，另推荐前后端分离)
│           └── # View
└── test
```

## 客户端：MVVM模式

```bash
.
├── app
│   ├── app.js
│   └── index.html
├── main.js
└── src
    ├── app.js
    ├── components
    │   └── # View Model
    ├── index.less
    ├── model
    │   └── # Model
    ├── routes
    │   └── # View
    ├── webpack.config.js
    └── webpack.config.prod.js
```

## 测试：BDD

![BDD](/experience/project/test.png)

上图为BDD测试目录，非测试用例文件（或目录）以`_`开头。
