---
title: Travis-CI 每日构建
description: ''
position: 1208
category: '知识篇-基础知识'
---

## Travis-CI 每日构建

`.travis.yml` 配置文件参考：

```yaml
language: node_js
node_js: node
cache:
  directories:
    - node_modules
install:
  - yarn
before_script:
  - git config user.name "Travis-CI"
  - git config user.email "willin@willin.org"
  - git remote rm origin
  - git remote add origin https://${GH_TOKEN}@${GH_REF}
  - git checkout master
script: yarn start
after_success:
  - git add -A .
  - git commit -a -m "Travis-CI Deployed to Github"
  - git push origin master
```

## 环境配置

其中 `GH_TOKEN` (Personal Access Token) 和 `GH_REF` 环境变量可以通过两种方式添加：

1. （推荐）访问 https://travis-ci.org/USER/REPOS/settings 添加 环境变量（Environment Variables）（Ref： <https://docs.travis-ci.com/user/environment-variables/>）
2. 命令行 `travis encrypt 'GH_TOKEN=xxxxxxxx'` 的方式加密并添加到配置文件中（Ref： <https://docs.travis-ci.com/user/encryption-keys/>）

另外， git 用户的邮箱决定了你的贡献度是否显示在 github 上，也可以随便写一个，如 `deploy@travis-ci.org`。

## 创建计划任务

- Branch: 一般 Master
- Interval： Daily
- Options: Always Run

Ref： <https://docs.travis-ci.com/user/cron-jobs/>

这样就会每隔 24h 执行一次，可以用来做一些数据的统计、网站的更新等，玩法看你有什么样的想法。

这里有一个我做的每天抓取 Github Trending 每日趋势记录的 Repo： <https://github.com/willin/github-trending> 可以参考一下。
