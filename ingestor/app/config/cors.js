import cors from 'cors';

const parseOrigins = () => {
  const raw = process.env.CORS_ORIGIN;
  if (!raw) {
    return ['http://localhost:5173', 'http://localhost:3000'];
  }
  return raw.split(',').map((origin) => origin.trim());
};

const corsOptions = {
  origin: parseOrigins(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
};

export const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
