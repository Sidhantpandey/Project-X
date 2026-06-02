import express from 'express';
import logger from './app/utils/logger.js';
import corsMiddleware from './app/config/cors.js';
import requestLogger from './app/middleware/requestLoggerMiddleware.js';
import routes from './app/routes/index.js';
import { notFoundHandler, errorHandler } from './app/middleware/errorHandlerMiddleware.js';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);
app.use(morgan('dev'));

// Routes
app.use(routes);

app.use(notFoundHandler);  
app.use(errorHandler);    

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
