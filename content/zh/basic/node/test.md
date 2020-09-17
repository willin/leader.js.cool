---
title: Test
description: ''
position: 1405
category: '知识篇-Node.js'
---

谁开发，谁测试。

***注意：*** 原则上应该先写测试，再进行编码；如果需求时间紧，可以先进行功能实现，但务必后续维护时候将测试代码补充完善。

BDD（优先）+TDD（完全代码覆盖）

## 测试框架

* ES5: mocha + istanbul
* ES6: ava + nyc

## TDD

Test Driven Development，（单元）测试驱动开发。

特点：

1. 直接引用对应源码，执行方法进行测试；
2. 测试用例须设计完整，把所有分支都Cover到。


示例：

```js
describe('Lib Common', function () {
	'use strict';
	it('isEmpty', function () {
		// isObject
		isEmpty({}).should.be.equal(true);
		isEmpty([]).should.be.equal(true);
		isEmpty({a: 1}).should.be.equal(false);
		isEmpty([1, 2]).should.be.equal(false);
		// isString
		isEmpty('').should.be.equal(true);
		isEmpty('sth').should.be.equal(false);
		// isNumber
		isEmpty(0).should.be.equal(true);
		isEmpty(0.1).should.be.equal(false);
		// null and undefined
		isEmpty(null).should.be.equal(true);
		isEmpty(undefined).should.be.equal(true);
		// boolean
		isEmpty(false).should.be.equal(true);
		isEmpty(true).should.be.equal(false);
		// 最后一行false
		isEmpty(isEmpty).should.be.equal(false);
	});
	it('md5/sha1', function () {
		md5('sth').should.equal('7c8db9682ee40fd2f3e5d9e71034b717');
		sha1('sth').should.equal('dec981e3bbb165d021029c42291faf06f59827c1');
	});
	it('authcode', function () {
		authcode(authcode('test'), 'DECODE').should.be.equal('test');
		authcode(authcode('test', 'ENCODE', 'key'), 'DECODE', 'key').should.be.equal('test');
		authcode('c008AsZqmGL8VuEVpZKVlbPwXzSsCZ+YX5K5CAGpMMqn', 'DECODE').should.be.equal('');
	});
});
```

## BDD

Behavior Driven Development，行为驱动开发。

特点：

1. 运行系统，模拟用户请求进行访问；
2. 行为分析要完整，要将可能所有结果覆盖。

示例：

```js
/* 测试路由 */
app.get('/test/model/mysql/init/ok', function (req, res) {
	'use strict';
	return db.opensips('v1/subscriber').then(
		function () {
			res.send(200, 'ok');
		}).catch(function (err) {
			logger('routes/test/model/mysql/ok', err);
			res.send(403, 'fail');
		});
});

app.get('/test/model/mysql/init/fail', function (req, res) {
	'use strict';
	return db.opensips('test/notExisted').then(
		function () {
			res.send(200, 'OK');
		}).catch(function () {
			res.send(200, 'fail');
		});
});


/* 测试脚本 */
describe('Demo', function () {
	'use strict';
	it('404 not found', function (next) {
		request(app)
			.get('/sth/not/exist')
			.set('Accept', 'text/plain')
			.expect(200)
			.end(function (err, res) {
				if (err) {
					throw err;
				}
				should(res.body.status).be.equal(0);
				next();
			});
	});
	it('403 not allowed', function (next) {
		request(app)
			.get('/v2/basic/mqtt')
			.set('Accept', 'text/plain')
			.expect(200)
			.end(function (err, res) {
				if (err) {
					throw err;
				}
				should(res.body.status).be.equal(0);
				next();
			});
	});
	it('Init opensips/subscriber Should be OK', function (next) {
		request(app)
			.get('/test/model/mysql/init/ok')
			.set('Accept', 'text/plain')
			.expect(200)
			.expect('ok')
			.end(function (err) {
				if (err) {
					//console.log(res.body);
					throw err;
				}
				next();
			});
	});
	it('Init test/subscriber Should be FAILED', function (next) {
		request(app)
			.get('/test/model/mysql/init/fail')
			.set('Accept', 'text/plain')
			.expect(200)
			.expect('fail')
			.end(function (err) {
				if (err) {
					//console.log(res.body);
					throw err;
				}
				next();
			});
	});
});
```

ES6 下的 BDD 测试示例对比：

```js
import {test, server, assert} from './_import';
let location;
test.before(async() => {
  const response = await server.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: 'willin',
      password: 'PASSWORD'
    }
  });
  location = response.headers.location;
});

test('GET / 302', async() => {
  const response = await server.inject({
    method: 'GET',
    url: '/'
  });
  assert.equal(response.statusCode, 302);
});

test('GET /login 200', async() => {
  const response = await server.inject({
    method: 'GET',
    url: '/login'
  });
  assert.equal(response.statusCode, 200);
});


test('POST /login 302', async() => {
  const response = await server.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: 'willin',
      password: 'PASSWORD'
    }
  });
  assert.equal(response.statusCode, 302);
});

test('POST /login 401', async() => {
  const response = await server.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: 'willin',
      password: 'Ww10842073305zZa28v3PO5Ok0L63IdA'
    }
  });
  assert.equal(response.statusCode, 401);
});

test('POST /login Invalid Params 403', async() => {
  const response = await server.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: 'willin'
    }
  });
  assert.equal(response.statusCode, 403);
});

test('GET /doc 200', async() => {
  const response = await server.inject({
    method: 'GET',
    url: location
  });
  assert.equal(response.statusCode, 200);
});

test('GET /doc 302', async() => {
  const response = await server.inject({
    method: 'GET',
    url: '/doc?'
  });
  assert.equal(response.statusCode, 302);
});
```
