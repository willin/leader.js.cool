# OS X

## 应用安装

> 系统偏好设置 -> 安全性与隐私 -> 允许从以下位置下载的应用  -> 改为“任何来源”

<!-- ## 关闭SIP

重启Mac,按CMD+R,进入recovery界面,在顶部工具栏选择“终端”:

```
csrutil disable
``` -->

## 安装Xcode

以及 Command Line Tools


## 本地DNS配置

Localhost下的泛域名指定

需要先安装 `brew` (离线资源)

```
brew install dnsmasq
mkdir -pv $(brew --prefix)/etc/
echo 'address=/.cxl/10.2.1.86' > $(brew --prefix)/etc/dnsmasq.conf
sudo cp -v $(brew --prefix dnsmasq)/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
sudo mkdir -v /etc/resolver
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/cxl'
```
