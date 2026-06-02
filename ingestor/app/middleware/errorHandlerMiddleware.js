import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';

export function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error({ err, path: req.path }, message);
  }

  res.status(statusCode).json({
    statusCode,
    message,
    success: false,
    errors: err.errors || [],
    data: null,
  });
}
