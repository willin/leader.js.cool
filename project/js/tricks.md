# tricks

## Deep Clone

```js
const obj2 = JSON.parse(JSON.stringify( obj1 ));
```

## Scroll Debounce

```js
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


// Demo
function testFunc(e) {
  console.count(e);
}

window.addEventListener('scroll', ()=>console.count('bounce'));
window.addEventListener('scroll', debounce(testFunc));
```
