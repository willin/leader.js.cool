---
title: 开源项目翻译正确姿势
description: ''
position: 2402
category: '经验篇-进阶'
---

日常开发中,我们经常会在Github上发现一些好用的新框架, 如何对这些项目文档进行翻译, 其实这个问题困扰了我很久. 这里,我总结了一些不同情况下所谓的最佳实践, 供大家参考:

## 独立文档项目

举例: <https://github.com/graphql/graphql.github.io>

GraphQL文档的网站, 是一个独立的项目, source分支是源码目录, master分支(可以理解为gh-pages分支)是静态站点.

### 1. 初始化翻译项目

直接`Fork`该项目, 示例: <https://github.com/willin/graphql.js.cool>

Fork之后可以给该项目改名, 如我换到了 `graphql.js.cool` 域名, 并以该域名进行命名.

然后, 将项目`Clone`至本地.

```bash
git clone git@github.com:willin/graphql.js.cool.git
cd graphql.js.cool
# 默认源码的分支是source, 可以新建一个分支用于翻译
git checkout -b cn
git push -u origin cn
```

至此, 可以开始翻译工作了.

### 2. 从源站更新内容

```bash
# 一次性添加
git remote add remote git@github.com:graphql/graphql.github.io.git
# 每次更新源站最新代码
git pull remote source
```

`.git/config`文件参考:

```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = git@github.com:willin/graphql.js.cool.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "cn"]
	remote = origin
	merge = refs/heads/cn
[travis]
	slug = willin/graphql.js.cool
[remote "remote"]
	url = git@github.com:graphql/graphql.github.io.git
	fetch = +refs/heads/*:refs/remotes/remote/*
```

## 文档包含在项目中

可能是一个一个单独的分支, 或者只是某个分支的一个目录.

以`vue-router`项目为例, 文档位于`dev`分支的`docs`目录: <https://github.com/vuejs/vue-router/tree/dev/docs>

### 1. 初始化翻译项目

```bash
git init
git remote add origin xxx # 你的项目路径
git remote add remote git@github.com:vuejs/vue-router.git
# 拉取源站代码
git pull remote dev
```

### 2. 从源站更新内容

```bash
# 每次更新源站最新代码
git pull remote dev
```


## 注意事项

- `CNAME`等配置文件需要替换
- `pull`后可能会有冲突. 解决后再提交代码.


## p.s.

优秀的中文翻译项目及推荐的未翻译项目汇总: [Awesome-CN](https://github.com/willin/awesome-cn)
