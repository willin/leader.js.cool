## Shad0ws0cks

  Shad0ws0cks是一款轻量级socks代理软件，速度快，而且可以跨平台使用。 在这里假定我们已经获取到账号.

下载：

Shad0ws0cks-windows: <https://github.com/Shad0ws0cks/Shad0ws0cks-windows/releases>

os-x: <https://github.com/Shad0ws0cks/Shad0ws0cksX-NG/releases>

 (把0改为o)

找到安装包解压，右键shad0ws0cks.exe，以管理员身份运行，在任务栏里面找到图标，右键，服务器->编辑服务器

![](/_static/basic/image1.png)

根据购买的服务器帐号信息，添加服务器IP，端口，密码，点击确定，如果有多个账号，就点击添加，最后确定。

然后程序就会自动连接服务器.

![](/_static/basic/image2.png)

然后通过 Firefox 下的 Autoproxy 或者 Chrome 下的 SwichyOmega 之类惯用的扩展插件设置一下 SOCKS 5 代理服务

这里讲一下Chrome 下的 SwichyOmega：

下载：
SwichyOmega:[https://github.comShad0ws0cks/FelisCatus/SwitchyOmega/releases](https://github.com/FelisCatus/SwitchyOmega/releases)

![](/_static/basic/image3.png)

下载.rcx文件，下载完成拖入谷歌扩展程序列表安装并开启．安装完毕后会自动开启选项界面：

![](/_static/basic/image4.png)

这里有一段介绍性的教程。如果想了解SwitchyOmega的不妨跟着教程走一遍。

点击proxy情景模式：

![](/_static/basic/image5.png)

按照选择的代理服务器要求填写以上红线部分，这里用的是Shad0ws0cks，所以代理协议选择socks5，代理端口号为刚刚在编辑服务器时设置的本机端口号。

点击选择自动代理情景模式

![](/_static/basic/image6.png)

添加条件设置，即添加需要永久自动启动代理访问的域名：

![](/_static/basic/image7.png)

就可以使得这些域名通配符匹配的域名可以通过代理访问，永久的（即以后浏览这些网站都自动使用代理模式）。
除了在选项界面添加条件，也可以在浏览器右上角小图标设置，如下：

![](/_static/basic/image8.png)

点击添加条件

![](/_static/basic/image9.png)

或者点击资源未加载

![](/_static/basic/image10.png)

就可以添加到自动代理模式。

但是，有些网站有时候抽风需要翻墙访问，有时候不需要，那就可以临时设置代理模式，默认是直接连接，如下：

![](/_static/basic/image11.png)

点击proxy，此时，就可以访问临时需要翻墙的网站了。图标为![](/_static/basic/image12.png)时为直接连接，图标为![](/_static/basic/image13.png)时为代理模式。
