---
title: Nest.js
description: ''
position: 1711
category: 知识篇-常用框架
---

- 代码仓库： <https://github.com/nestjs/nest>
- 官方文档： <https://docs.nestjs.com/>
- 中文文档： <https://docs.nestjs.cn/>

## 安装

```bash
# 如果是 node.js 10 之后的版本，需要加 --ignore-engines 来忽略一些不兼容库的警告
npm i -g @nestjs/cli --ignore-engines
# 或
yarn global add @nestjs/cli --ignore-engines
```

## 小技巧

### 异步方法优化

减少不必要的 async/await 包裹。示例代码如下：

```ts
function test() {
  const deferred = {
    promise: undefined,
    resolve: undefined
  };
  deferred.promise = new Promise((resolve) => {
    deferred.resolve = resolve;
  });
  setTimeout(() => {
    deferred.resolve('hello world');
  }, 1000);
  return deferred.promise;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 以下两种写法都能运行，推荐使用第一种
  @Get('/test')
  getTest(): Promise<string> {
    return test();
  }

  @Get('/test2')
  async getTest2(): Promise<string> {
    return await test();
  }
}
```

同理，除了在 Controller 中，在 Model、 Service 等其他地方内层方法均可以进行优化，因为外层调用的时候已经带上了 `await`。同时，还需要注意各个方法的返回类型，养成良好习惯。

## 使用 Fastify 框架

该部分没有文档，只有一个示例项目： <https://github.com/nestjs/nest/tree/master/sample/10-fastify>

```bash
yarn remove @nestjs/platform-express
yarn remove @types/express
yarn add @nestjs/platform-fastify
```

修改 `main.ts` 文件：

```js
import { NestFactory } from '@nestjs/core';
// 新增引用
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // 原有代码：
  // const app = await NestFactory.create(AppModule);
  // 替换代码：
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

## Open-API(Swagger)

目前只有英文文档，没有中文文档。地址：<https://docs.nestjs.com/openapi/introduction>

配合 Fastify 使用：

```bash
yarn add @nestjs/swagger
yarn add fastify-swagger
# [Nest] 7253   - 2020/07/08 下午4:42:59   [PackageLoader] The "fastify-swagger" package is missing. Please, make sure to install this library ($ npm install fastify-swagger) to take advantage of SwaggerModule. +37ms
# 如果出现类似报错，使用2.x版本重试
yarn add fastify-swagger@^2.6.0
```

示例代码：

```js
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  // 生成的 JSON 格式文档，可以导出静态化
  const document = SwaggerModule.createDocument(app, options);
  // 注入, 访问 http://localhost:3000/api 可以访问
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

Module 代码可以参考 Express Swagger 的示例项目： <https://github.com/nestjs/nest/tree/master/sample/11-swagger>

生成 Open-API.json 文件示例代码：

```js
import { resolve } from 'path';
import { writeFileSync } from 'fs';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = (await NestFactory.create) < NestFastifyApplication > (AppModule, new FastifyAdapter());
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  // 生成的 JSON 格式文档，可以导出静态化
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync(resolve(__dirname, '../api.json'), JSON.stringify(document, null, 2), { encoding: 'utf8' });
}
bootstrap();
```

## E2E Testing

依然没有找到文档，参考一个示例的测试源码吧： <https://github.com/nestjs/nest/blob/master/integration/hello-world/e2e/fastify-adapter.spec.ts>

```js
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
// 新增引用
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { expect } from 'chai';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    // 修改 app 创建
    app = moduleFixture.createNestApplication < NestFastifyApplication > new FastifyAdapter();

    await app.init();
  });

  it('/ (GET)', () => {
    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');

    // 改用 inject 方式，不用 supertest
    return app
      .inject({
        method: 'GET',
        url: '/'
      })
      .then(({ payload }) => expect(payload).to.be.eql('Hello World!'));
  });
});
```

## Graphql

- 中文文档： <https://docs.nestjs.cn/7/graphql>
- 英文文档： <https://docs.nestjs.com/graphql/quick-start>

依赖于`apollo-server`。

TBD.
