# iTerm

![iterm](/_static/basic/source/iterm.png)

下载安装： <https://www.iterm2.com/>

## 安装 Oh My Zsh

安装：

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 配置iTerm主题

推荐使用`Solarized`, 下载地址: <http://ethanschoonover.com/solarized/files/solarized.zip>

解压后`iterm2-colors-solarized`目录下,双击即可安装

安装完成后 在iTerm的 `Preference (左上角苹果按钮旁边点Sublime Text) -> Profiles 顶部大选项卡 -> Colors 偏右小选项卡 -> Load Presets 底部下拉菜单` 启用主题

## 配置Oh My Zsh主题和插件

配置文件路径:

```
~/.zshrc
```

搜索 `ZSH_THEME=` 修改主题,默认主题为 `robbyrussell`, 想要折腾的话,可以试试`agnoster`, 需要安装 `PowerLine` 字体

可用主题列表: <https://github.com/robbyrussell/oh-my-zsh/wiki/Themes>

搜索 `plugins=` 增改弃用的插件

可用插件列表: <https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins>

