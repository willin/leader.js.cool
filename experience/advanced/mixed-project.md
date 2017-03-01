# 混合Web应用实践

本项目实例代码： <https://github.com/js-cool/up.js.cool>

## 设计

### 项目诉求

输出：

* 图表按时间展示在线状况及效率
* 接口、图片输出当前在线状态

输入：

* WRescueTime 插件获取在线行为数据

### 存储设计

数据库采用`MySQL`，缓存采用`Redis`。

#### 表结构

```sql
CREATE TABLE `data` (
  `user` char(16) NOT NULL DEFAULT '' COMMENT '用户',
  `active` int(3) unsigned NOT NULL COMMENT '活跃时间（秒）',
  `efficiency` decimal(3,2) NOT NULL COMMENT '效率（%）',
  `date` int(10) unsigned NOT NULL COMMENT '数据时间（转时间戳）',
  KEY `whereorder` (`user`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

#### 缓存结构

## 编码

### 初始化项目

```
yarn init
yarn add --dev eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import
```

配置`ESLint`

## 测试

练手项目，测试阶段暂时忽略。有时间了再来补上。

## 部署


