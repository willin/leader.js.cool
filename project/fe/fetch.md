# Fetch API AJAX

## 浏览器兼容性

<http://caniuse.com/#feat=fetch>

## 支持检查

```js
if(typeof fetch === 'function' && typeof window.fetch === 'function') {
  // 支持
}

if(typeof fetch !== 'function' || typeof window.fetch !== 'function') {
  // 不支持
}
```

## 示例代码

```js
var req = new Request('/data.json', {method: 'POST', cache: 'reload'});  
fetch(req).then(function(res) {  
  return res.json();
}).then(function(data){
  console.log(data);
});  
```

## 参考资料

* 接口文档： <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>
* 介绍： <https://github.com/camsong/blog/issues/2>
