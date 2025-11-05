import { createTrip, getTripsByUser, updateTripStatus } from '../repositories/trip.repository.js';
import { calculateFare } from '../utils/fareCalculator.js';

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