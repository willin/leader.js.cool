---
title: IDE
description: ''
position: 1104
category: '知识篇-必备神器'
---

# 安装配置 IDE

适合前端、后端、全栈工程师，尤其以 Javascript（Node.js）为主。

目前我个人用的最多的是 VS Code。

该章节不过多对比，根据个人喜好选择。入门请使用 WebStorm，进阶 Atom、VS Code， Sublime Text 不适合项目开发使用，比较适合调试使用。

具体配置及按键映射，如 Atom 和 VS Code 的，也需要根据个人喜好来设置，可以在安装后查看全局配置，自行修改调整。记得做好备份。

## WebStorm

官方地址: <http://www.jetbrains.com/webstorm/>

适合新手入门。

<adsbygoogle></adsbygoogle>

## Sublime Text 3

### 安装

下载地址: <http://www.sublimetext.com/3>

### 配置 subl 快捷命令(OS X)

图省事的话可以直接先尝试在终端(或 iTerm)里 执行：

```
ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
```

---

#### 详细过程分解

Finder 中打开应用程序目录,找到 `Sublime Text`应用,右键菜单选择 `显示包内容`，

进入 `Contents -> SharedSupport -> bin` 目录,看到一个 subl 文件

打开终端,输入：

```
ln -s (停止输入,把Finder里的那个subl文件拖进来,按一个空格继续输入) /usr/local/bin/subl
```

如果提示 `ln: /usr/local/bin123/subl: No such file or directory` 输入:

```
mkdir /usr/local/bin
```

然后再重新执行上一条命令。

### 安装 Package Control

安装完成后,打开 Sublime , 按下 `ctrl + ~`,在弹出的控制台中输入:

```python
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

以后使用快捷键 `⌘(command) + ⇧(shift) + p` 输入 Install, 就能够调出 Package Install 进行 Sublime 的插件主题安装了.

### 安装配置主题

调出 Package Install, 输入 `theme`, 大多数主题都是以 `Theme:` 开头,可以鼠标或键盘上下键选择,点击或回车便开始进行安装。

安装完成后从 `Preference (左上角苹果按钮旁边点Sublime Text) -> Color Scheme` 选择你所安装的主题并启用。

### 常用插件

1.Terminal

安装完成后从 `Preference -> Package Settings -> Terminal -> Settings - Default` 进入配置，

修改

```
	"terminal": "",
```

为

```
	"terminal": "iTerm.sh",
```

即可右键从 iTerm 中打开当前目录了。

## Atom

下载地址： <https://atom.io/>

进阶使用，或 VS Code。

之前我个人一直用的 WebStorm，一方面这是个付费的 IDE；另一方面是该环境内存开销比较大，自带功能太多，对于新人来讲是不错的选择，但是慢慢的对开发熟悉后，并不太需要那些辅助的功能和插件，所以会尝试一些更轻量级、灵活的编辑器。

### 插件列表 / Plugin List

```
Community Packages (49) /Users/willin/.atom/packages
├── activate-power-mode@0.7.4
├── atom-beautify
├── atom-jade@0.3.0
├── atom-material-syntax@0.4.6
├── atom-material-ui@1.3.3
├── atom-terminal-panel@4.4.4
├── atom-ternjs@0.14.2
├── atom-typescript@10.1.6
├── auto-update-packages@1.0.1
├── autoclose-html@0.23.0
├── autocomplete-modules@1.6.1
├── ava@0.7.0
├── color-picker@2.2.2
├── csslint@1.1.5
├── docblockr@0.8.2
├── editorconfig@1.4.1
├── file-icons@1.7.18
├── git-log@0.4.1
├── git-time-machine@1.5.3
├── highlight-selected@0.11.2
├── hyperclick@0.0.37
├── js-hyperclick@1.4.2
├── language-babel
├── language-dots@0.0.4
├── language-javascript-jsx@0.3.7
├── language-swigjs@0.3.1
├── linter@1.11.16
├── linter-eslint@7.2.4
├── linter-tslint@0.11.1
├── markdown-scroll-sync@2.1.2
├── merge-conflicts@1.4.4
├── minimap@4.24.7
├── minimap-git-diff@4.3.1
├── minimap-highlight-selected@4.4.0
├── minimap-pigments@0.2.1
├── open-in-browser@0.4.7
├── open-recent@5.0.0
├── pigments@0.31.2
├── project-manager@2.9.7
├── project-switcher@0.3.0
├── rest-client@1.2.1
├── screen-recorder@1.2.0
├── seti-ui@1.3.1
├── simplified-chinese-menu@3.4.11
├── sort-lines@0.14.0
├── terminal-plus@0.14.5
├── todo-show@1.7.0
├── tool-bar@1.0.1
└── tool-bar-config@0.1.0
```

### 推荐配置

```
"*":
  "activate-power-mode":
    particles:
      size: {}
      spawnCount: {}
      totalCount: {}
    screenShake: {}
  "atom-beautify":
    apex: {}
    arduino: {}
    c: {}
    cfml: {}
    coffeescript:
      indent_size: 2
    cpp: {}
    cs: {}
    css: {}
    d: {}
    ejs: {}
    erb: {}
    fortran: {}
    general:
      _analyticsUserId: "ea162638-166c-40b5-835b-108ef72f93f3"
      analytics: false
      beautifyEntireFileOnSave: false
    gherkin: {}
    handlebars: {}
    html:
      end_with_newline: true
      indent_inner_html: true
      indent_size: 2
      max_preserve_newlines: 1
    jade: {}
    java: {}
    js:
      brace_style: "collapse-preserve-inline"
      end_with_comma: true
      end_with_newline: true
      indent_size: 2
      keep_function_indentation: true
    json:
      beautify_on_save: true
      indent_size: 2
    jsx: {}
    latex: {}
    less: {}
    marko: {}
    mustache: {}
    objectivec: {}
    pawn: {}
    perl: {}
    php: {}
    python: {}
    riot: {}
    ruby: {}
    rust: {}
    sass: {}
    scss: {}
    spacebars: {}
    sql: {}
    svg: {}
    swig: {}
    tss: {}
    twig: {}
    typescript: {}
    vala: {}
    visualforce: {}
    xml: {}
    xtemplate: {}
  "autoclose-html": {}
  autosave:
    enabled: true
  core:
    disabledPackages: [
      "atom-terminal-panel"
      "atom-beautify"
      "editorconfig"
    ]
    themes: [
      "atom-material-ui"
      "atom-material-syntax"
    ]
  editor:
    fontFamily: "'Source Code Pro for Powerline','Electrolize'"
    fontSize: 15
    invisibles: {}
    showIndentGuide: true
    softWrap: true
  "exception-reporting":
    userId: "69f2bdd3-5fcf-f92b-ecd5-461248e4bd3f"
  "file-icons":
    onChanges: true
  "highlight-selected": {}
  "js-hyperclick": {}
  linter:
    errorPanelHeight: 71
    showErrorPanel: false
    showErrorTabLine: true
  "linter-eslint":
    fixOnSave: true
  "merge-conflicts": {}
  minimap:
    plugins:
      "git-diff": true
      "git-diffDecorationsZIndex": 0
      "highlight-selected": true
      "highlight-selectedDecorationsZIndex": 0
      pigments: true
      pigmentsDecorationsZIndex: 0
  "project-manager":
    sortBy: "last modified"
  "rest-client": {}
  "simplified-chinese-menu": {}
  "split-diff":
    diffWords: true
    ignoreWhitespace: true
    leftEditorColor: "red"
    rightEditorColor: "green"
    syncHorizontalScroll: true
  "terminal-plus":
    core:
      mapTerminalsTo: "Folder"
    style:
      fontFamily: "'Source Code Pro for Powerline'"
  "todo-show":
    ignoreThesePaths: [
      "**/node_modules/"
      "**/vendor/"
      "**/bower_components/"
      "**/public/"
    ]
  "tool-bar":
    position: "Left"
  "tool-bar-config": [
    {
      icon: "document"
      iconSet: "ion"
      title: "New File"
      callback: "application:new-file"
    }
    {
      icon: "folder"
      iconSet: "ion"
      title: "Open..."
      callback: "application:open-folder"
    }
    {
      icon: "archive"
      iconSet: "ion"
      title: "Save"
      callback: "core:save"
    }
    {
      icon: "spacer"
    }
    {
      icon: "search"
      iconSet: "ion"
      title: "Find in Buffer"
      callback: "find-and-replace:show"
    }
    {
      icon: "shuffle"
      iconSet: "ion"
      title: "Replace in Buffer"
      callback: "find-and-replace:show-replace"
    }
    {
      icon: "spacer"
    }
    {
      icon: "navicon-round"
      iconSet: "ion"
      title: "Toggle Command Palette"
      callback: "command-palette:toggle"
    }
    {
      icon: "gear-a"
      iconSet: "ion"
      title: "Open Settings View"
      callback: "settings-view:open"
    }
    {
      icon: "spacer"
    }
    {
      icon: "refresh"
      iconSet: "ion"
      title: "Reload Window"
      callback: "window:reload"
    }
  ]
  "tree-view":
    autoReveal: true
  welcome:
    showOnStartup: false
```

### keymap.cson

(`快捷键`根据个人喜好和习惯设定 / up to your habit)

```
'atom-text-editor':
  'cmd-alt-l': 'atom-beautify:beautify-editor'
  'cmd-shift-l': 'atom-beautify:beautify-editor'
  'cmd-alt-j': 'activate-power-mode:toggle'
  'cmd-shift-j': 'activate-power-mode:toggle'
  'cmd-`': 'terminal-plus:toggle'
  'cmd-alt-up': 'pane:split-up'
  'cmd-alt-down': 'pane:split-down'
  'cmd-alt-left': 'pane:split-left'
  'cmd-alt-right': 'pane:split-right'
  'cmd-alt-shift-up':'window:focus-pane-on-up'
  'cmd-alt-shift-down':'window:focus-pane-on-down'
  'cmd-alt-shift-left':'window:focus-pane-on-left'
  'cmd-alt-shift-right':'window:focus-pane-on-right'
  'cmd-k':'pane:close'
  'cmd-1':'todo-show:find-in-project'
```

## Visual Studio Code

下载地址： <https://code.visualstudio.com/>

在用了半年多 Atom 之后，一次更新导致了 Terminal 插件失效，所以转到了 VS Code。

在 1.6 之后的版本中内置了终端，所以还算不错。

比 Atom 快了很多，尤其是压缩过的 js 代码，在 Atom 中打开简直就是噩梦，可能是因为代码自动格式化引起的，原因不详。

VS Code 不足在于：

- ESLint 报错不能直接跳转到网站详细说明
- 没有 MiniMap 插件
- 没有 Power Mode 插件，当然这个只是自嗨用的，无关痛痒

整体来讲，还是头一次对微软的东西这么满意。

### 配置

```
{
    "editor.tabSize": 2,
    "editor.fontSize": 13,
    "editor.fontFamily": "'Source Code Pro for Powerline', Menlo, Monaco, 'Courier New', monospace",
    "editor.fontWeight": "normal",
    "editor.formatOnType": true,
    "editor.wordWrap": true,
    "extensions.autoUpdate": true,
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 5000,
    "terminal.external.osxExec": "iTerm.app",
    "telemetry.enableTelemetry": false,
    "telemetry.enableCrashReporter": false,
    "window.zoomLevel": 1,
    // 插件定义
    "eslint.autoFixOnSave": true
  }
```

### 按键

```
[
  // HHKB
  { "key": "cmd+escape", "command": "workbench.action.terminal.toggleTerminal" },
  { "key": "cmd+shift+escape", "command": "workbench.action.showErrorsWarnings"},
  { "key": "alt+i", "command": "cursorUp", "when": "editorTextFocus" },
  { "key": "alt+j", "command": "cursorLeft", "when": "editorTextFocus" },
  { "key": "alt+k", "command": "cursorDown", "when": "editorTextFocus" },
  { "key": "alt+l", "command": "cursorRight", "when": "editorTextFocus" }
]
```

### 插件

- Auto Close Tag
- ESLint
- exports autocomplete
- Material Icon Theme
- Material-theme
- Project Manager
- Sass
- TODO Highlight
- VS Color Picker
