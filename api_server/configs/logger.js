import winston from 'winston';

const timestampStr = new Date().toISOString().replace(/:/g, '-');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      let logMsg = `[${level.toUpperCase()}] ${timestamp}: ${message}`;
      if (stack) {
        logMsg += `\nStack: ${stack}`;
      }
      return logMsg;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      level: 'info',
      filename: `logs/app-${timestampStr}.log`,
    }),
  ],
});

export default logger;
