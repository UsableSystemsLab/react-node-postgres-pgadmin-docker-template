import logger from '../configs/logger.js';

const accessLoggingMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;

    logger.info(`Access: ${ip} - ${method} ${url} - Status: ${status} - ${duration}ms`);
  });

  next();
};

export default accessLoggingMiddleware;
