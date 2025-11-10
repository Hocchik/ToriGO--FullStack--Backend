import * as tripRepo from '../../Domain_Trip/repositories/trip.repository.js';
import * as driverRepo from '../repositories/driver.repository.js';

export const listAvailableTrips = async () => {
  const trips = await tripRepo.getAvailableTrips();
  return trips;
};

export const acceptTrip = async (userId, tripId) => {
  // find driver record by user id
  const driver = await driverRepo.findByUserId(userId);
  if (!driver) {
    const err = new Error('Driver not found for the authenticated user');
    err.status = 404;
    throw err;
  }

  // ensure trip exists and is pending
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

  // accept the trip by updating status and driver assignment
  const updated = await tripRepo.updateTripStatus(tripId, 'accepted', driver.id);
  return updated;
};

export const getDriverTrips = async (userId) => {
  const driver = await driverRepo.findByUserId(userId);
  if (!driver) {
    const err = new Error('Driver not found');
    err.status = 404;
    throw err;
  }
  const trips = await tripRepo.getTripsByUser(driver.id, 'driver');
  return trips;
};
