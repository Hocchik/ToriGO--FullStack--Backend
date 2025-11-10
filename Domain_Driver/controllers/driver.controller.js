import * as driverService from '../services/driver.service.js';

// List available pending trips for drivers
export const listAvailableTrips = async (req, res) => {
  try {
    // ensure the authenticated user is a driver
    const role = req.user?.role || req.user?.roles || null;
    if (role && !(role === 'DRIVER' || role === 'driver' || (Array.isArray(role) && role.includes('driver')))) {
      return res.status(403).json({ error: 'Access denied: only drivers' });
    }
    const trips = await driverService.listAvailableTrips();
    return res.status(200).json({ trips });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch available trips' });
  }
};

// Accept a trip (assign to the authenticated driver)
export const acceptTrip = async (req, res) => {
  try {
    // ensure the authenticated user is a driver
    const role = req.user?.role || req.user?.roles || null;
    if (role && !(role === 'DRIVER' || role === 'driver' || (Array.isArray(role) && role.includes('driver')))) {
      return res.status(403).json({ error: 'Access denied: only drivers' });
    }
    const tripId = req.params.trip_id || req.body.trip_id;
    if (!tripId) return res.status(400).json({ error: 'trip_id is required' });

    const updated = await driverService.acceptTrip(req.user.userId, tripId);
    return res.status(200).json({ message: 'Trip accepted', trip: updated });
  } catch (err) {
    console.error(err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Failed to accept trip' });
  }
};

// Get trips assigned to the authenticated driver
export const getDriverTrips = async (req, res) => {
  try {
    const trips = await driverService.getDriverTrips(req.user.userId);
    return res.status(200).json({ trips });
  } catch (err) {
    console.error(err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Failed to fetch driver trips' });
  }
};
