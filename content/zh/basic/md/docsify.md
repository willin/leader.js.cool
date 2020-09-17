---
title: Docsify画图建模Mermaid插件支持
menuTitle: Docsify画图建模
description: ''
position: 1503
category: 知识篇-Markdown
---

先上图

![mermaid1](https://user-images.githubusercontent.com/1890238/27322559-3217d3b8-5564-11e7-8d27-2d6de348aa5f.png)

## 引入Mermaid

在 `head` 中加入css:

```html
<link rel="stylesheet" href="//unpkg.com/mermaid/dist/mermaid.min.css">
```

在 底部 引用js:

```html
<script type="text/javascript" src="//unpkg.com/mermaid/dist/mermaid.min.js"></script>
```

## 配置文件修改

```js
window.$docsify = {
  // ...
  plugins: [
    function(hook, vm) {
      hook.ready(function () {
        mermaid.initialize({startOnLoad: false});
      });
      hook.doneEach(function () {
        mermaid.init(undefined,'.mermaid');
      });
    }
  ],
  markdown: {
    renderer: {
      code: function(code, lang) {
        var html = '';
        if(code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)){
          html = '<div class="mermaid">' + code + '</div>';
        }
        var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
        return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
      }
    }
  }
}
```

解释一下,两个关键步骤:

### markdown代码解析器

```js
markdown: {
  renderer: {
    code: function(code, lang) {
    var html = '';
    // 搜索 mermaid 代码
    if(code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)){
      // 生成一个 mermaid 图表的容器
      html = '<div class="mermaid">' + code + '</div>';
    }
    // 源码自带的 Prism 高亮插件
    var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
    // 将图表的容器添加到代码之前
    return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
    }
  }
}
```

### 自定义插件

```js
plugins: [
  function(hook, vm) {
    hook.ready(function () {
      // 类似 jQuery.ready 初始化 mermaid, 禁用自动渲染
      mermaid.initialize({startOnLoad: false});
    });
    hook.doneEach(function () {
      // 每个页面渲染完成后手动渲染 mermaid 图表
      mermaid.init(undefined,'.mermaid');
    });
  }
]
```


最后再补一张甘特图:


![mermaid2](https://user-images.githubusercontent.com/1890238/27322558-31c84fbe-5564-11e7-9949-851fddbafa33.png)


Mermaid支持:

- 流程图
- 序列图
- 甘特图

而且语法结构非常简单,值得推荐.

## 其实,正文才刚刚开始.

### 流程图

#### 开始/结束

```mermaid
graph TB
  s(开始/结束)
  style s rx: 10, ry: 10
```

#### 过程

```mermaid
graph TB
  step1[过程]
```

#### 输入/输出

```mermaid
graph TB
  step2>输入/输出]
```

#### 判断

```mermaid
graph TB
  step3{判断}
```

#### 连接线

```mermaid
graph LR
  A --> B
```

#### 自定义样式

```mermaid
graph LR
  id1(Start)-->id2(Stop)
  style id1 fill:#f9f,stroke:#333,stroke-width:4px
  style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5
```

#### 示例

```mermaid
graph TB
  s(开始) --> step1>输入参数]
  step1 --> step2{判断参数合法性}
  step2 ==> |校验失败|e
  step2--> |校验成功|step3[处理业务]
  step3 --> e(结束)
  style s rx: 10, ry: 10
  style e rx: 10, ry: 10
```

#### 子图

```mermaid
graph TB
  s(开始) --> step1>输入参数]
  subgraph 强调
    step1 --> step2{判断参数合法性}
  end
  step2 ==> |校验失败|e
  step2--> |校验成功|step3[处理业务]
  step3 --> e(结束)
  style s rx: 10, ry: 10
  style e rx: 10, ry: 10
```

### 时序图

#### 参与者

```mermaid
sequenceDiagram
  participant 客户端
  participant 接口服务器
  participant 数据库
```

#### 消息

##### 消息格式

```
[参与者][箭头][参与者]:消息内容
```

支持的箭头有:

| 类型 | 说明     |
|:---:|----------|
| ->  | 无箭头实线 |
| --> | 无箭头虚线 |
| ->> | 箭头实线  |
| -->>| 箭头虚线  |
| -x  | 箭头实线带x(异步) |
| --x | 箭头虚线带x(异步) |

```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
```

#### 激活

用 `+/-` 符号

```mermaid
sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can yoy hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!
```

### 甘特图

```mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram functionality to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser and jison          :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      :20h
Add another diagram to demo page    :48h
```

## 在线编辑器

 <https://knsv.github.io/mermaid/live_editor/>
