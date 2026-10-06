import { jest } from '@jest/globals';

/**
 * Build a fake Express { req, res, next } trio for controller/middleware tests.
 * res.status() and res.json() return res so chaining works as in production.
 */
export function mockReqRes(reqOverrides = {}) {
  const req = {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...reqOverrides,
  };

  const res = {
    statusCode: 200,
    status: jest.fn(function (code) {
      this.statusCode = code;
      return this;
    }),
    json: jest.fn(function (payload) {
      this.body = payload;
      return this;
    }),
    send: jest.fn(function (payload) {
      this.body = payload;
      return this;
    }),
  };

  const next = jest.fn();
  return { req, res, next };
}
