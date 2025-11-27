import express from 'express';
import { authenticate } from '../../Domain_Auth/middlewares/auth.middleware.js';
import { listAvailableTrips, acceptTrip, getDriverTrips, updateAvailability } from '../controllers/driver.controller.js';

const router = express.Router();

/**
 * @route GET /api/drivers/available
 * @desc List pending trips not yet assigned to any driver
 * @access Protected (driver)
 */
router.get('/available', authenticate, listAvailableTrips);

/**
 * @route POST /api/drivers/trips/:trip_id/accept
 * @desc Authenticated driver accepts a trip
 * @access Protected (driver)
 */
router.post('/trips/:trip_id/accept', authenticate, acceptTrip);

/**
 * @route GET /api/drivers/me/trips
 * @desc Get trips assigned to authenticated driver
 * @access Protected (driver)
 */
router.get('/me/trips', authenticate, getDriverTrips);

/**
 * @route POST /api/drivers/availability
 * @desc Update authenticated driver's availability
 * @access Protected (driver)
 */
router.post('/availability', authenticate, updateAvailability);

export default router;
