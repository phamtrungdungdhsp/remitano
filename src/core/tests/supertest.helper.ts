import * as request from 'supertest';
import superagent from 'superagent';
import { get, has, isUndefined } from 'lodash';
import { HttpStatus } from '@nestjs/common';
const test = (request as any).Test;

declare module 'supertest' {
  interface Test extends superagent.SuperAgentRequest {
    authenticate(token: string): this;

    has(keys: string | string[]): this;

    notHas(keys: string | string[]): this;

    assertValue(key: string, value): this;

    isOk(): this;

    isAuthError(): this;

    isValidateError(): this;

    isForbiddenError(): this;

    isBadRequestError(message?: string): this;

    isNoContent(): this;

    isNotFound(): this;

    isCreated(): this;

    isPagination(dataKey?: string): this;

    isGoneError(): this;
  }
}

test.prototype.authenticate = function (token) {
  return this.set('Authorization', `Bearer ${token}`);
};

test.prototype.isGoneError = function () {
  return this.expect(HttpStatus.GONE);
};

test.prototype.isOk = function () {
  return this.expect((res) => {
    if (res.statusCode !== HttpStatus.OK) {
      console.log('Debug when fail case success: ', JSON.stringify(res.body));
    }
  }).expect(HttpStatus.OK);
};

test.prototype.isNotFound = function () {
  return this.expect(HttpStatus.NOT_FOUND);
};

test.prototype.isAuthError = function () {
  return this.expect(HttpStatus.UNAUTHORIZED);
};

test.prototype.isValidateError = function () {
  return this.expect(HttpStatus.UNPROCESSABLE_ENTITY);
};

test.prototype.isForbiddenError = function () {
  return this.expect(HttpStatus.FORBIDDEN);
};

test.prototype.isBadRequestError = function (message?: string) {
  return this.expect(HttpStatus.BAD_REQUEST).expect(async ({ body }) => {
    if (!isUndefined(message)) {
      if (body.message !== message) {
        console.log('Full response for BAD_REQUEST: ', JSON.stringify(body));
      }
      expect(body.message).toBe(message);
    }
  });
};

test.prototype.isNoContent = function () {
  return this.expect(HttpStatus.NO_CONTENT);
};

test.prototype.isCreated = function () {
  return this.expect(HttpStatus.CREATED);
};

test.prototype.isPagination = function (dataKey?: string) {
  const paginationKeys = ['total', 'lastPage', 'perPage', 'currentPage'];
  if (dataKey) {
    return this.expect(function (res) {
      for (const key of paginationKeys) {
        if (!has(res.body[dataKey], key)) {
          throw new Error('Response do not contains key ' + key);
        }
      }
    });
  } else {
    return this.has(paginationKeys);
  }
};

test.prototype.has = function (keys: string | string[]) {
  return this.expect(function (res) {
    if (typeof keys === 'string') {
      if (!has(res.body, keys)) {
        throw new Error('Response do not contains key ' + keys);
      }
    } else {
      for (const key of keys) {
        if (!has(res.body, key)) {
          throw new Error('Response do not contains key ' + key);
        }
      }
    }
  });
};

test.prototype.notHas = function (keys: string | string[]) {
  return this.expect(function (res) {
    if (typeof keys === 'string') {
      if (has(res.body, keys)) {
        throw new Error('Response contains key ' + keys);
      }
    } else {
      for (const key of keys) {
        if (has(res.body, key)) {
          throw new Error('Response contains key ' + key);
        }
      }
    }
  });
};

test.prototype.assertValue = function (key: string, value: any) {
  return this.expect(function (res) {
    const body = res.body;
    if (get(body, key) !== value) {
      throw new Error(`${key} not equal ${value}. Value is ${get(body, key)}`);
    }
  });
};
