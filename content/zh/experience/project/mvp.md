---
title: MVP原则
subtitle: 人无远虑必有近忧。能在设计过程中解决掉的问题，绝对不要拖到实现过程中迭代。
description: ''
position: 2101
category: '经验篇-项目'
---

即`最简化可实行产品`原则, 以`Webpack`示例:

## 既有项目引入新的组件/库

假设现有项目用到了 `react`, `react-router` ,  `antd` 等库, 并且 `controller`, `router`, `model`, `view` 已基本成型.

此时如果要引入 `mobx`, 最佳实践步骤为:

1. 新建一个空项目, 将既有库 `react`, `antd` 等安装, 配置一个最简单的 `hello world` 路由
2. 安装 `mobx`, 引入并测试通过
3. 再在原有项目上进行功能扩充

## 既有项目打包优化

假设现有项目用到了 `react`, `react-router` ,  `antd`, `mobx` 等库, 并且 `controller`, `router`, `model`, `view` 已基本成型. webpack打包过大, 应用性能较差.

最佳实践步骤:

1. 新建一个空项目, 新建一个空的webpack配置
2. 安装 `react` (或 `antd`, 或 `mobx`等) 写一个简单示例引入项目
3. 针对单一库进行 `webpack` 打包优化, 一般情况下, 除了 loader rules / vendor 需要每个库单独优化, 其他配置都能保证通用
4. 一项优化完成后重复2,3步骤, 直到所有库优化完成
5. 对原有项目的 webpack 配置进行替换, 不动项目源码
6. 进一步优化, 比如 `react-router-loader` 之类的引入, 开始针对项目源码进行优化

