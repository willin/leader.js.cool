---
title: 重启服务
description: ''
position: 2205
category: '经验篇-运维'
---

# 重启所有服务

![Image](/experience/operation/restarter1.png)

虽然CRP中工作流可以一个点流出至多个点，但只有第一个子任务会执行。

所以我将自动重启任务改为了串行执行。

## 配置手动启动

![Image](/experience/operation/restarter2.png)

如上图所示，将第一个代码检出任务的【自动触发】勾选去掉。

后续的每个工作流可以是每一台单独服务器或是每几台相同环境的负载均衡机器。

## 重启Shell脚本

```
pm2 kill
rm -f /home/xxx-user/xxx-project1/logs/*.log
rm -f /home/xxx-user/xxx-project2/logs/*.log
pm2 start /home/xxx-user/xxx-project1/app.json
pm2 start /home/xxx-user/xxx-project2/app.json
```
