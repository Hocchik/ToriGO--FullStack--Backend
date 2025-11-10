import * as tripRepo from '../repositories/trip.repository.js';
import * as driverRepo from '../../Domain_Driver/repositories/driver.repository.js';

export const listAvailableTrips = async () => {
  const trips = await tripRepo.getAvailableTrips();
  return trips;
};

export const acceptTripByDriverUser = async (userId, tripId) => {
  // resolve driver record from authenticated user id
  const driver = await driverRepo.findByUserId(userId);
  if (!driver) {
    const err = new Error('Driver not found for the authenticated user');
    err.status = 404;
    throw err;
  }

  const trip = await tripRepo.getTripById(tripId);
  if (!trip) {
    const err = new Error('Trip not found');
    err.status = 404;
    throw err;
  }

  if (trip.status !== 'pending' || trip.driver_id) {
    const err = new Error('Trip is not available to accept');
    err.status = 400;
    throw err;
  }

  // assign driver and set status to 'accepted' (phase 1)
  const updated = await tripRepo.assignDriver(tripId, driver.id);
  return updated;
};
