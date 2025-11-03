import express from 'express';
import { requestPasswordReset, resetPassword } from '../../controllers/auth/password.controller.js';

const router = express.Router();

router.post('/request-reset', requestPasswordReset);
router.post('/confirm-reset', resetPassword);

export default router;