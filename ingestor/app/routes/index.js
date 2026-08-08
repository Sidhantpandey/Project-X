import express from 'express';
import { getHealth } from '../controllers/healthController.js';
import logController from '../controllers/logController.js';
import userController from '../controllers/userController.js';
import { apiKeyAuth } from '../middleware/authMiddleware.js';
import { sessionAuth } from '../middleware/sessionAuth.js';

const router = express.Router();

router.route('/healthz').get(getHealth);
router.route('/auth/register').post(userController.register);
router.route('/auth/login').post(userController.login);
router.route('/auth/logout').post(sessionAuth, userController.logout);
router.route('/auth/me').get(sessionAuth, userController.getMe);
router.route('/ingest').post(apiKeyAuth, logController.postLog);

export default router;
