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
	upsertTrip,
	appendTrace,
} from '../controllers/trip.controller.js';
import { authenticate } from '../../Domain_Auth/middlewares/auth.middleware.js';

const router = express.Router();

// Passenger endpoints
router.post('/request', authenticate, requestTrip);
router.post('/accept', acceptTrip); // legacy/public: requires driver_id in body
router.post('/complete', completeTrip);
router.get('/history', authenticate, getUserTrips);

// Upsert final trip payload (finish or cancel)
router.post('/', authenticate, upsertTrip);

// Append trace points while trip is active or after (batch or single)
router.post('/:trip_id/trace', authenticate, appendTrace);

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