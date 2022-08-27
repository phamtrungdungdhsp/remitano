import {
  INestApplication,
  Type,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import request, { CallbackHandler } from 'supertest';
import { BaseEntity } from 'typeorm';
import { AppModule } from '~app.module';
import { databaseConfig } from '~config/database.config';
import './supertest.helper';

export class TestHelper {
  public app: INestApplication;
  public httpService: any;
  public moduleFixture: TestingModule;
  public wrongUUID = '00000000-0000-0000-0000-000000000000';
  private testHelperModules: { [_: string]: any } = {};

  async initialize(
    overrideBuilder?: (builder: TestingModuleBuilder) => TestingModuleBuilder,
  ) {
    let moduleBuilder = Test.createTestingModule({
      imports: [AppModule, databaseConfig],
    });
    if (overrideBuilder) {
      moduleBuilder = overrideBuilder(moduleBuilder);
    }
    this.moduleFixture = await moduleBuilder.compile();

    this.app = this.moduleFixture.createNestApplication();

    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      }),
    );

    await this.app.init();
    this.httpService = this.app.getHttpServer();
  }

  getTestHelperModule<T>(testHelperModule: new (t: TestHelper) => T): T {
    if (!this.testHelperModules[testHelperModule.name]) {
      this.testHelperModules[testHelperModule.name] = new testHelperModule(
        this,
      );
    }
    return this.testHelperModules[testHelperModule.name];
  }

  async close() {
    this.app.flushLogs();
    jest.restoreAllMocks();
    await this.app.close();
    this.app = null;
    global.gc && global.gc();
  }

  getService<T>(service: Type<T>): Promise<T> {
    return this.moduleFixture.resolve(service);
  }

  get(url: string, callback?: CallbackHandler) {
    return request(this.httpService).get(url, callback);
  }

  post(url: string, callback?: CallbackHandler) {
    return request(this.httpService).post(url, callback);
  }

  put(url: string, callback?: CallbackHandler) {
    return request(this.httpService).put(url, callback);
  }

  patch(url: string, callback?: CallbackHandler) {
    return request(this.httpService).patch(url, callback);
  }

  delete(url: string, callback?: CallbackHandler) {
    return request(this.httpService).delete(url, callback);
  }

  async invisibleInDatabase(entity: typeof BaseEntity, condition) {
    if (typeof condition === 'string') {
      condition = { id: condition };
    }
    if (await entity.getRepository().findOne(condition)) {
      throw new Error(`${JSON.stringify(condition)}  visible in database`);
    }
  }
}
