import logger from '../utils/logger.js';

const VALID_API_KEYS = (process.env.API_KEYS || 'sk_dev_default_key_12345').split(',');

export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    logger.warn({ msg: 'Missing API key', path: req.path });
    return res.status(401).json({ success: false, message: 'API key required (x-api-key header)' });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    logger.warn({ msg: 'Invalid API key', path: req.path });
    return res.status(403).json({ success: false, message: 'Invalid API key' });
  }

  logger.info({ msg: 'API key validated', path: req.path });
  next();
};

export default { apiKeyAuth };
