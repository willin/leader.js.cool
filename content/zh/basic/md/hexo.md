---
title: Hexo搭建静态博客
description: ''
position: 1501
category: 知识篇-Markdown
---

## 1. 环境

### 1.1 安装 Git

### 1.2 安装 node.js

**1. 安装 nvm**

使用 curl 方式安装：

> $curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash

> $echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \  --cache=$HOME/.npm/.cache/cnpm \ --disturl=https://npm.taobao.org/dist \ --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc

**2. 使用 nvm 安装 node.js**

> $nvm install node

> $nvm alias default node

## 2. 配置 Github

### 2.1 建立 Respository

建立与你用户名对应的仓库，仓库名必须为【**your_user_name**.github.io】

### 2.2 配置 SSH-Key

参考：[Windows 下 Git 安装指南](http://www.cnblogs.com/zhcncn/p/3787849.html)

##3. 安装 Hexo

###3.1 Installation
打开 Git 命令，执行如下命令

> $ cnpm install -g hexo

###3.2 Quick Start

**1. Setup your blog**

在电脑中建立一个名字叫「Hexo」的文件夹（比如我建在了 D:\Hexo），然后在此文件夹中右键打开 Git Bash。执行下面的命令

> $ hexo init

> [info] Copying data

> [info] You are almost done! Don't forget to run `cnpm install` before you start blogging with Hexo!

Hexo 随后会自动在目标文件夹建立网站所需要的文件。然后按照提示，运行 cnpm install（在 /D/Hexo 下）

> cnpm install

会在 D:\Hexo 目录中安装 node_modules。

**2. Start the server**

运行下面的命令（在 /D/Hexo 下）

> $ hexo server

> [info] Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.

表明 Hexo Server 已经启动了，在浏览器中打开 [http://localhost:4000/](http://localhost:4000/),这时可以看到 Hexo 已为你生成了一篇 blog。

你可以按 Ctrl+C 停止 Server。

**3. Create a new post**

新打开一个 git bash 命令行窗口，cd 到/D/Hexo 下，执行下面的命令

> $ hexo new "My New Post"

> [info] File created at d:\Hexo\source_posts\My-New-Post.md

刷新 http://localhost:4000/，可以发现已生成了一篇新文章 "My New Post"。

<adsbygoogle></adsbygoogle>

**NOTE:**

有一个问题，发现 "My New Post" 被发了 2 遍，在 Hexo server 所在的 git bash 窗口也能看到 create 了 2 次。

> $ hexo server

> [info] Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.

> [create] d:\Hexo\source_posts\My-New-Post.md

> [create] d:\Hexo\source_posts\My-New-Post.md

经验证，在 hexo new "My New Post" 时，如果按 Ctrl+C 将 hexo server 停掉，就不会出现发 2 次的问题了。

所以，在 hexo new 文章时，需要 stop server。

**4. Generate static files**

执行下面的命令，将 markdown 文件生成静态网页。

> $ hexo generate

该命令执行完后，会在 D:\Hexo\public\ 目录下生成一系列 html，css 等文件。

**5. 编辑文章**

hexo new "My New Post"会在 D:\Hexo\source_posts 目录下生成一个 markdown 文件：My-New-Post.md

可以使用一个支持 markdown 语法的编辑器（比如 Sublime Text 2）来编辑该文件。

**6. 部署到 Github**

部署到 Github 前需要配置\_config.yml 文件，首先找到下面的内容

```
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
 type:
```

然后将它们修改为

```
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
 type: git
 repository: git@github.com:zhchnchn/zhchnchn.github.io.git
 branch: master
```

**NOTE1:**

Repository：必须是 SSH 形式的 url（git@github.com:zhchnchn/zhchnchn.github.io.git），而不能是 HTTPS 形式的 url（https://github.com/zhchnchn/zhchnchn.github.io.git），否则会出现错误：

> $ hexo deploy

> [info] Start deploying: github

> [error] https://github.com/zhchnchn/zhchnchn.github.io is not a valid repositor URL!

使用 SSH url，如果电脑没有开放 SSH 端口，会致部署失败。

> fatal: Could not read from remote repository.

> Please make sure you have the correct access rights
> and the repository exists.

**NOTE2:**

如果你是为一个项目制作网站，那么需要把 branch 设置为 gh-pages。

**7. 测试**

当部署完成后，在浏览器中打开[http://our_user_name.github.io/](https://our_user_name.github.io/） ，正常显示网页，表明部署成功。

**8. 总结：部署步骤**

每次部署的步骤，可按以下三步来进行。

> hexo clean

> hexo generate

> hexo deploy

**9. 总结：本地调试**

1. 在执行下面的命令后，

> $ hexo g #生成

> $ hexo s #启动本地服务，进行文章预览调试

浏览器输入 http://localhost:4000，查看搭建效果。此后的每次变更\_config.yml 文件或者新建文件都可以先用此命令调试，尤其是当你想调试新添加的主题时。

2. 可以用简化的一条命令

> hexo s -g

###3.3 总结
####3.3.1 常用命令

> hexo new "postName" #新建文章

> hexo new page "pageName" #新建页面

> hexo generate #生成静态页面至 public 目录

> hexo server #开启预览访问端口（默认端口 4000，'ctrl + c'关闭 server）

> hexo deploy #将.deploy 目录部署到 GitHub

> hexo help # 查看帮助

> hexo version #查看 Hexo 的版本

####3.3.2 复合命令

> hexo deploy -g #生成加部署

> hexo server -g #生成加预览

命令的简写为：

> hexo n == hexo new

> hexo g == hexo generate

> hexo s == hexo server

> hexo d == hexo deploy

##4. 配置 Hexo

#### [配置参考: http://ibruce.info/2013/11/22/hexo-your-blog/](http://ibruce.info/2013/11/22/hexo-your-blog/)

# 配合 Travis CI，将 Hexo 博客自动部署到 github 上

## 1. 新建代码仓库

新建一个代码仓库，有一个注意点，若仓库取名为【**your_user_name**.github.io】，则需要新建一个分支用来放.md 文件，因为 html 文件会自动部署到 master 上。若仓库名只是普通的名称，则可以将.md 文件放到 master 分支上，但这时需要新建一个分支 gh-pages 用来放 html 文件。

这里，我们就使用了【**your_user_name**.github.io】这样的仓库名，取名为 Hexo.github.io，新建一个分支，取名为 raw。

Clone 到本地

```
git clone -b raw <仓库克隆URL> #只Clone出新建的raw分支 保留master分支用于部署
```

## 2. 安装 Node.js 和 Hexo

请参考[2.1 Hexo 搭建](https://crabxlab.gitbooks.io/fs-guide/content/front/hexo_create.html)

## 3. 使用 Travis CI

首先我们先打开[Travis CI](https://travis-ci.org/)，可以在右上角找到使用 GitHub 登陆的按钮。
![travis ci](/basic/travis/travis.png)

授权完成后，你可以在左上角找到 My Repositories 一旁的加号“+”，点击它，它就会列出你所有的仓库，你只需要找到刚才的 hexo.github.io 并把它左侧的开关打开就可以了。

![img](/basic/travis/04.01.png)
![img](/basic/travis/04.02.png)

## 4. 生成 GitHub Personal Access Token

登录 GitHub，在右上角头像处进入设置。

![img](/basic/travis/05.00.png)

在左侧找到 Personal access tokens，并点击右上角的 Generate new token。

![img](/basic/travis/05.01.png)

需要为新的 Token 输入一个名字，这里我们就填入 Travis CI 好了。

![img](/basic/travis/05.02.png)

确定生成后，Token 将显示在页面上，此时需要将其复制并保存好，并避免泄露。遗忘 Token 后不能找回，只能重新生成。

![img](/basic/travis/05.03.png)

最后，我们还需要[生成随机字符串](https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new)，并在其中选择一行随机字符串，为下文备用。

## 5. 配置 Travis CI

首先在 Travis CI 中找到已经启用自动构建的仓库，并在右侧找到设置按钮。

![img](/basic/travis/06.00.png)

注意：该图片中的仓库名称为 SumiMakito.github.io，但我们这里的名称应该为 Hexo.github.io。

有两处需要设置，首先需要启用 Build only if .travis.yml is present 选项，以避免 master 分支被构建和陷入构建循环的问题。

另外，在下方的环境变量设置处，我们需要设置两组变量，并注意保持 Display value in build log 禁用，以免构建日志泄露 Token 等信息。

```
#需要设置的两组变量
GitHubKEY = 上文生成的GitHub Personal Access Token
NOTIFY_TOKEN = 上文生成的随机字符串
```

![img](/basic/travis/06.01.png)

在每次 Push 后，Travis CI 将检查分支下的 .travis.yml 文件，并以此作为配置进行构建。

在分支下新建.travis.yml 和 build.sh。下面是我所使用的 .travis.yml :

```yml
language: node_js
node_js:
  - '0.12'
install:
  - npm install hexo-cli -g
  - npm install hexo --save
  - npm install
script:
  - chmod +x ./build.sh
  - ./build.sh > /dev/null
branches:
  only:
    - raw
```

在这里，配置文件限制了自动构建工作只会在 raw 分支下进行。

下面是我所使用的 build.sh：

```
hexo generate #生成静态整站
cd ./public #生成的静态页面会存储在public目录下
git init
git config --global push.default matching
git config --global user.email "username@example.com" #填入GitHub的邮箱地址
git config --global user.name "username" #填入GitHub的用户名
git add --all .
git commit -m "Travis CI Auto Builder" #自动构建后的内容将全部以此信息提交
git push --quiet --force https://${GitHubKEY}@github.com/你的GitHub用户名/你的代码仓库名.git master  #自动构建后的内容将全部以此信息提交
curl --connect-timeout 20 --max-time 30 -s http://远端服务器URL/webhook.php?_=${NOTIFY_TOKEN} #服务器Webhook 将在下文介绍
```

## 6. 测试

还记得之前的 Hexo 文件夹吗？

```
cd ./HexoBlog
hexo new hello-ci #本地没有Hexo的话可以直接跳过这一步
vim ./source/_posts/hello-ci.md
git add --all .
git commit -m "Hello, CI!"
git push #将代码push到raw分支上
```

登陆相应网址进行效果查看。

## 7. 附加 自动部署脚本

在项目文件夹下新建一个`cmd`文件（文件名随意），并为其增加执行权限。

```
touch cmd
chmod +x cmd
```

`cmd`文件源码:

```bash
#!/bin/bash
pushd $(dirname "${0}") > /dev/null
DIR=$(pwd -L)
popd > /dev/null
DATE=$(date +"%Y-%m-%d %H:%M")

# get action
ACTION=$1

# help
usage() {
  echo "Usage: ./cmd {commit|build|clean}"
  exit 1;
}

# start app
commit() {
	git add .
	git commit -m 'Post Auto Commit'
	git push
}

build() {
	hexo d -g
}

# stop app
clean() {
	rm -rf .deploy_git
	rm -rf public
}

case "$ACTION" in
  commit)
    commit
  ;;
  build)
    build
  ;;
  clean)
    clean
  ;;
  *)
    usage
  ;;
esac
```
