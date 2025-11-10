import { createTrip, getTripsByUser, updateTripStatus } from '../repositories/trip.repository.js';
import { calculateFare } from '../utils/fareCalculator.js';
import * as tripService from '../services/trip.service.js';
import * as tripRepo from '../repositories/trip.repository.js';

export const requestTrip = async (req, res) => {
  try {
    const { passenger_id, origin, destination } = req.body;
    const fare = calculateFare(origin, destination);
    const trip = await createTrip({ passenger_id, origin, destination, fare });
    res.status(201).json({ message: 'Trip requested', trip });
  } catch (err) {
    res.status(500).json({ error: 'Trip creation failed' });
  }
};

export const acceptTrip = async (req, res) => {
  try {
    const { trip_id, driver_id } = req.body;
    const trip = await updateTripStatus(trip_id, 'in_progress', driver_id);
    res.status(200).json({ message: 'Trip accepted', trip });
  } catch (err) {
    res.status(500).json({ error: 'Trip acceptance failed' });
  }
};

// Driver-facing: list pending trips not assigned to any driver
export const listAvailableTripsForDrivers = async (req, res) => {
  try {
    const trips = await tripService.listAvailableTrips();
    return res.status(200).json({ trips });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch available trips' });
  }
};

// Driver-facing: authenticated driver accepts a trip (resolves driver by user)
export const acceptTripByAuthenticatedDriver = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });

    // optionally accept with driver's current location
    const { driver_lat, driver_lng } = req.body;
    const driver = await tripService.acceptTripByDriverUser(req.user.userId, tripId);
    // if coordinates were provided, update them
    if (driver_lat != null && driver_lng != null) {
      await tripRepo.updateDriverLocation(tripId, driver_lat, driver_lng);
    }
    return res.status(200).json({ message: 'Trip accepted', trip: driver });
  } catch (err) {
    console.error(err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Failed to accept trip' });
  }
};

export const updateDriverLocation = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    const { lat, lng } = req.body;
    if (!tripId || lat == null || lng == null) return res.status(400).json({ error: 'trip_id, lat and lng are required' });
    const updated = await tripRepo.updateDriverLocation(tripId, lat, lng);
    return res.status(200).json({ message: 'Location updated', trip: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update location' });
  }
};

export const markDriverArrived = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    const { lat, lng } = req.body;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });
    const updated = await tripRepo.markDriverArrived(tripId, lat, lng);
    return res.status(200).json({ message: 'Driver arrived', trip: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to mark arrival' });
  }
};

export const confirmPassengerBoarded = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });
    const updated = await tripRepo.confirmPassengerBoarded(tripId);
    return res.status(200).json({ message: 'Passenger boarded', trip: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to confirm boarding' });
  }
};

export const startTripByDriver = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });
    const updated = await tripRepo.startTrip(tripId);
    return res.status(200).json({ message: 'Trip started', trip: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to start trip' });
  }
};

export const cancelTrip = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.body.trip_id;
    const { canceled_by, reason } = req.body;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });
    const updated = await tripRepo.cancelTrip(tripId, canceled_by || (req.user?.userId || null), reason || null);
    return res.status(200).json({ message: 'Trip canceled', trip: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to cancel trip' });
  }
};

export const getTripDetails = async (req, res) => {
  try {
    const tripId = req.params.trip_id || req.query.trip_id || req.body.trip_id;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });
    const trip = await tripRepo.getTripById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    return res.status(200).json({ trip });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch trip details' });
  }
};

export const completeTrip = async (req, res) => {
  try {
    const { trip_id } = req.body;
    const trip = await updateTripStatus(trip_id, 'completed');
    res.status(200).json({ message: 'Trip completed', trip });
  } catch (err) {
    res.status(500).json({ error: 'Trip completion failed' });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const { user_id, role } = req.query;
    const trips = await getTripsByUser(user_id, role);
    res.status(200).json({ trips });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};