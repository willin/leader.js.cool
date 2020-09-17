---
title: CI 持续交付
description: ''
position: 2204
category: '经验篇-运维'
---

# 持续交付工作流

阿里云持续交付平台： <https://crp.aliyun.com/>

## 1.触发器任务

![Image](/experience/operation/workflow1.png)

点击红色箭头所指圆圈位置设置触发器任务。

一般情况下，需要部署到产品环境是侦听`Master`分支，集成测试可以为其他开发分支。

本文示例以一套完整的自动化测试部署流程为例，选择了`Master`分支。

## 2.代码检出

![Image](/experience/operation/workflow2.png)

这里的信息都是自动填入的，无需做更改。

## 3.集成测试

如果是简单的测试脚本，如单元测试，不需要数据库的。可以直接使用阿里云的编译测试功能，如下图所示：

![Image](/experience/operation/workflow3-1.png)

如果有专门的测试服务，可以用如下图所示方式进行测试：

![Image](/experience/operation/workflow3-2.png)

提示：CRP提供的测试环境是Ubuntu，未安装数据库，但据说可以自己安装，目前还没有尝试过。

### 注意点

#### 自动完成

左侧活动信息中，【自动完成】选项，如果勾选，则测试通过就会自动进入下一步（如部署产品环境），否则会停在这里，需要手动触发，如下图所示：

![Image](/experience/operation/workflow3-3.png)

#### 表单项

##### 目标机器

填入测试服务器ip。

##### 部署路径

可以是用户目录，如 `/home/user/`

或是项目目录，如 `/home/user/project`

无太大影响，因为【部署命令】中可以使用 `cd` 命令。

一般这里我填入的是用户目录。

##### 部署命令

流程：

0. 根据需要，启动、重启数据库/缓存服务（一般可以不用放在自动测试流程里）
1. 进入项目目录
2. 更新代码，新建当前版本分支，以备回滚操作
3. 更新依赖项
4. 启动测试脚本

Shell命令

```bash
cd /home/xxx-user/xxx-project/
git checkout .
git fetch
git checkout $CODE_VERSION
npm -d install
npm update
npm test
# 产品环境加入：
# pm2 reload xxx-server-name
```

##### 登录用户

SSH 登入服务的用户名称

提示: 系统需要您的目标机器添加部署公钥方可执行部署任务。请将公钥拷贝到服务器部署用户目录的$HOME/.ssh/authorized_keys文件中。

## 4.自动部署

### 新建流程

模板默认流程只有两个，需要新建的时候根据下图：

![Image](/experience/operation/workflow4-1.png)

箭头所指小圆圈部分单击拖拽新建一个工作流，并将结束定向到新的工作流上。

![Image](/experience/operation/workflow4-2.png)

### 注意点

1. 【自动触发】、【自动完成】勾选上，如果需要，还可以打开【异常通知】
2. 【目标机器】如有多台负载均衡横向扩展的相同环境机器以逗号分隔
