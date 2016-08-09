# 项目结构

## 服务器端：MVC模式

项目目录结构：

```
.
├── bin
│   └── # 可执行文件
├── config
│   └── # 配置文件
├── demo
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

```
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
