---
title: React Redux
description: ''
position: 1707
category: 知识篇-常用框架
---

> view 层发出 actions 通知触发 store 里的 reducer 从而来更新 state；state 的改变会将更新反馈给我们的 view 层，从而让我们的 view 层发生相应的反应给用户。

中文文档： <https://github.com/camsong/redux-in-chinese>

## 流程图

![pic-1](/basic/framework/react.png)

## 目录结构

目录结构大概可以这样规划

```
app
  |_components
  |_reducers
  |_actions
  |_stores
    |_configureStores.js
  |_main.js
```

<adsbygoogle></adsbygoogle>

## 核心代码

举例核心代码。值得注意的是其中有一个 state 的传递有一些迷惑的地方，在下面的注释中可以找到思路。

### components

```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../../actions/counter.js';

class Counter extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount = () => {
    this.startCount();
  };
  startCount = () => {
    const { actions } = this.props;
    actions.listen('INC');
  };
  render() {
    return <div>{this.props.counter.count}</div>;
  }
}
Counter.propTypes = {
  actions: React.PropTypes.object.isRequired,
  counter: React.PropTypes.object.isRequired
};
// 声明 connect 连接
// 将 redux 中的 state传给 App
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}
function mapDispatchToProps(dispatch) {
  const boundCounter = bindActionCreators(CounterActions, dispatch);
  return {
    actions: Object.assign({}, boundCounter)
  };
}
// 声明 connect 连接
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### actions

action 函数必须返回一个带有 type 属性的 plain object。

```js
import * as constants from '../../constants/counter';
export function listen(type) {
  switch (type) {
    case 'INC':
      return {
        type: constants.INC
      };
    case 'DEC':
      return {
        type: constants.DEC
      };
  }
}
```

### reducers

reducer 就是迎接 action 函数返回的线索的数据再处理函数，action 是预处理函数。

```js
import { INC, DEC } from '../../constants/counter';
// 初始状态
const initState = {
  count: 1
};
// 定义转换的reducer函数
// action = {type: 'INC',counter: {count: 1}};
export default function start(state = initState, action) {
  switch (action.type) {
    case INC:
      // 对这个action做出响应
      state.count += 1; // 改变状态
      // return {count: 2} 返回给页面;
      return state;
    case DEC:
      // 对这个action做出响应
      state.count -= 1; // 改变状态
      // return {count: 0} 返回给页面;
      return state;
    default:
      return state;
  }
}
```

```js
import { combineReducers } from 'redux';
import counter from './counter'; // {count: 2}返回给页面，所以页面用的是counter.count获取数据2
// 通过combineReducers将多个reducer合并成一个rootReducer:
const rootReducer = combineReducers({
  counter, // {count: 1}
  others
});
export default rootReducer;
```
