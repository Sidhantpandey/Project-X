import express from 'express';
import logger from './app/utils/logger.js';
import corsMiddleware from './app/config/cors.js';
import sessionMiddleware from './app/config/session.js';
import requestLogger from './app/middleware/requestLoggerMiddleware.js';
import routes from './app/routes/index.js';
import { notFoundHandler, errorHandler } from './app/middleware/errorHandlerMiddleware.js';
import morgan from 'morgan';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(requestLogger);
app.use(morgan('dev'));

// Log startup info
logger.info({ msg: 'API key auth enabled', apiKeyCount: (process.env.API_KEYS || 'sk_dev_default_key_12345').split(',').length });

// Routes
app.use(routes);

app.use(notFoundHandler);  
app.use(errorHandler);    

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
