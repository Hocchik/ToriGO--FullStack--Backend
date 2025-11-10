import express from 'express';
import {
	requestTrip,
	acceptTrip,
	completeTrip,
	getUserTrips,
	listAvailableTripsForDrivers,
	acceptTripByAuthenticatedDriver,
	updateDriverLocation,
	markDriverArrived,
	confirmPassengerBoarded,
	startTripByDriver,
	cancelTrip,
	getTripDetails,
} from '../controllers/trip.controller.js';
import { authenticate } from '../../Domain_Auth/middlewares/auth.middleware.js';

const router = express.Router();

// Passenger endpoints
router.post('/request', requestTrip);
router.post('/accept', acceptTrip); // legacy/public: requires driver_id in body
router.post('/complete', completeTrip);
router.get('/history', getUserTrips);

// Driver-facing endpoints (trip domain)
router.get('/available', authenticate, listAvailableTripsForDrivers);
router.post('/:trip_id/accept', authenticate, acceptTripByAuthenticatedDriver);
router.post('/:trip_id/location', authenticate, updateDriverLocation);
router.post('/:trip_id/arrived', authenticate, markDriverArrived);
router.post('/:trip_id/boarded', authenticate, confirmPassengerBoarded);
router.post('/:trip_id/start', authenticate, startTripByDriver);
router.post('/:trip_id/cancel', authenticate, cancelTrip);
router.get('/:trip_id', authenticate, getTripDetails);

export default router;