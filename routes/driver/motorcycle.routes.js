import express from 'express';
import { createMotorcycle, getDriverMotorcycle } from '../../controllers/driver/motorcycle.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorizeRole } from '../../middlewares/role.middleware.js';

const router = express.Router();

/**
 * @route POST /api/motorcycles/register
 * @desc Register a motorcycle for a driver
 * @access Protected (driver only)
 */
router.post('/register', authenticate, authorizeRole('driver'), createMotorcycle);

/**
 * @route GET /api/motorcycles/:driver_id
 * @desc Get motorcycle info by driver ID
 * @access Public or Protected (optional)
 */
router.get('/:driver_id', getDriverMotorcycle);

export default router;