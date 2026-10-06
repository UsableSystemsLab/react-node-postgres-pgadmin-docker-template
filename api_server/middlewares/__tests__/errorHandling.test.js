import { jest } from '@jest/globals';
import { mockReqRes } from '../../test-utils/mockReqRes.js';

const mockLogger = { error: jest.fn(), info: jest.fn() };
jest.unstable_mockModule('../../configs/logger.js', () => ({
  default: mockLogger,
}));

const { default: errorHandling } = await import('../errorHandling.js');

describe('errorHandling middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs the error and returns 500 with generic message', () => {
    const { req, res, next } = mockReqRes();
    const err = new Error('boom');

    errorHandling(err, req, res, next);

    expect(mockLogger.error).toHaveBeenCalledWith({
      message: 'boom',
      stack: err.stack,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('does not call next()', () => {
    const { req, res, next } = mockReqRes();
    errorHandling(new Error('x'), req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
