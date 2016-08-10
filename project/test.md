# Test

谁开发，谁测试。

BDD（优先）+TDD（完全代码覆盖）

## 测试框架

* v2: mocha + istanbul
* v3: ava + nyc

下文示例来自v2中的测试，源码位于: <https://code.aliyun.com/shgg/v2/tree/c605998dc59d1b3e1d91681cc9b0c9daec4ef341/test>

(内部代码，须登录Git)

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
