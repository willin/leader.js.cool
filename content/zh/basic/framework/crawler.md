---
title: Phantom/Request
description: ''
position: 1709
category: 知识篇-常用框架
---

## PhantomJS / Request 爬虫入门

以可备案域名后缀查询为例.

PhantomJS 优势为: 可以模拟页面渲染(执行js).

request 优势就是效率高咯.

## phantom 示例

思路很简单:

1. 打开首页
2. 抓取数据
3. 模拟点击下一页
4. 重复第2步,直到没有数据

```js
const driver = require('node-phantom-simple');
const phantom = require('phantomjs-prebuilt');

driver.create({
  path: phantom.path
}, (err, browser) => {
  browser.createPage((err2, page) => {
    page.set('settings.userAgent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3175.4 Safari/537.36');
    page.open('URL地址,和谐你我他', (err3, status) => {
      console.log('opened site? ', status);
      /* global nextPage,previousPage */
      let n = 0;
      const domains = [];
      const fib = () => {
        // eslint-disable-next-line
        page.evaluate(function () {
          /* eslint-disable */
          var i = 1;
          var ele;
          var result = [];
          while (ele = document.getElementById(i)) {
            result.push(ele.children[3].innerText.trim());
            i++;
          }
          return {
            data: result,
            cur: ~~previousPage.toString().split(' = ')[2].split(';')[0] + 1
          };
        }, (err4, result) => {
          /* eslint-enable */
          const { data, cur } = result;
          console.log('page %d done', cur);
          if (cur === n + 1) {
            domains.push(...data);
            n += 1;
          }
          if (data.length === 0) {
            console.log('-------');
            console.log('total domains:', domains.length);
            const arr = [...new Set(domains)];
            console.log('unique domains:', arr.length);
            console.log('-------');
            console.log(arr.sort().join('\n'));
            browser.exit();
            process.exit();
          }
        });
        setTimeout(() => {
          // eslint-disable-next-line
          page.evaluate(function () {
            nextPage();
          }, () => {
            setTimeout(fib, 3000);
          });
        }, 3000);
      };
      fib();
    });
  });
});
```

其中几个注意点:

1. User-Agent 必须要设置
2. Timeout 是经过试验得出的较优的方案

这些都是为了绕过知道创宇的反爬虫机制.

## Request 示例

在这个示例里, 不推荐使用 phantom, 因为这样的界面上并没有动态的内容, 而且页面间通过传统表单形式进行跳转, 这就有一些可以利用的空间了.

比如`pagesize`默认选项只有三种: 5, 10, 20. 但经过测试, 设置1000也能正常获取数据. 所以我们这里就直接设置1000,一次性搞定.

```js
const request = require('request');
const cheerio = require('cheerio');
const gbk = require('gbk');

request({
  url: 'URL地址,和谐你我他',
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3175.4 Safari/537.36'
  },
  form: {
    domainName: '',
    domainBlur: 0,
    domainType: 0,
    'page.pageSize': 1000,
    pageNo: 1,
    jumpPageNo: ''
  },
  encoding: null
}, (err, httpResponse, body) => {
  const $ = cheerio.load(gbk.toString('utf-8', body));
  const domains = [];

  $('tr[id]').each((i, ele) => {
    domains.push($(ele).children('td').eq(3).text().trim());
  });
  console.log('-------');
  console.log('total domains:', domains.length);
  const arr = [...new Set(domains)];
  console.log('unique domains:', arr.length);
  console.log('-------');
  console.log(arr.sort().join('\n'));
  process.exit();
});
```

完整的项目源码位于: <https://github.com/willin/beian-domain/tree/develop>
