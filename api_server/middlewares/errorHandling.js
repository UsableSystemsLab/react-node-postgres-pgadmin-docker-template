import logger from '../configs/logger.js';

// Error handling middleware. Logs the error and sends a 500 response.
const errorHandlingMiddleware = (err, req, res, _next) => {
  logger.error({ message: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandlingMiddleware;
