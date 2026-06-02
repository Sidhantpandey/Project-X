import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip
  }, 'Incoming request');
  next();
};

export default requestLogger;
