import { jest } from '@jest/globals';

const mockLogger = { info: jest.fn(), error: jest.fn() };
jest.unstable_mockModule('../../configs/logger.js', () => ({
  default: mockLogger,
}));

const { default: accessLogging } = await import('../accessLogging.js');

function makeReqRes({ ip, forwardedFor, originalUrl = '/api/health' } = {}) {
  let finishHandler;
  const req = {
    method: 'GET',
    originalUrl,
    url: '/api/health',
    headers: forwardedFor ? { 'x-forwarded-for': forwardedFor } : {},
    socket: { remoteAddress: ip || '127.0.0.1' },
  };
  const res = {
    statusCode: 200,
    on: jest.fn((event, cb) => {
      if (event === 'finish') finishHandler = cb;
    }),
  };
  return { req, res, triggerFinish: () => finishHandler && finishHandler() };
}

describe('accessLogging middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls next() immediately', () => {
    const { req, res } = makeReqRes();
    const next = jest.fn();
    accessLogging(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('registers a finish listener on the response', () => {
    const { req, res } = makeReqRes();
    accessLogging(req, res, jest.fn());
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
  });

  it('logs method, url, status, and IP from socket on finish', () => {
    const { req, res, triggerFinish } = makeReqRes({ ip: '10.0.0.1' });
    accessLogging(req, res, jest.fn());
    triggerFinish();

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    const msg = mockLogger.info.mock.calls[0][0];
    expect(msg).toContain('10.0.0.1');
    expect(msg).toContain('GET /api/health');
    expect(msg).toContain('Status: 200');
  });

  it('prefers x-forwarded-for header over socket address', () => {
    const { req, res, triggerFinish } = makeReqRes({
      ip: '10.0.0.1',
      forwardedFor: '203.0.113.7',
    });
    accessLogging(req, res, jest.fn());
    triggerFinish();

    expect(mockLogger.info.mock.calls[0][0]).toContain('203.0.113.7');
  });

  it('falls back to req.url when originalUrl is not set', () => {
    const { req, res, triggerFinish } = makeReqRes({ originalUrl: null });
    accessLogging(req, res, jest.fn());
    triggerFinish();

    expect(mockLogger.info.mock.calls[0][0]).toContain('GET /api/health');
  });
});
