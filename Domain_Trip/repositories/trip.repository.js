import pool from '../../config/dbConfig.js';

export const createTrip = async ({ passenger_id, origin, destination, fare }) => {
  const result = await pool.query(
    `INSERT INTO trips (passenger_id, origin, destination, status, fare, origin_lat, origin_lng, destination_lat, destination_lng)
     VALUES ($1, $2, $3, 'pending', $4, $5, $6, $7, $8) RETURNING *`,
    [passenger_id, origin, destination, fare, origin?.lat || null, origin?.lng || null, destination?.lat || null, destination?.lng || null]
  );
  return result.rows[0];
};

export const getTripById = async (id) => {
  const result = await pool.query(`SELECT * FROM trips WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateTripStatus = async (trip_id, status, driver_id = null) => {
  const result = await pool.query(
    `UPDATE trips SET status = $1, driver_id = $2 WHERE id = $3 RETURNING *`,
    [status, driver_id, trip_id]
  );
  return result.rows[0];
};

export const getTripsByUser = async (user_id, role) => {
  const column = role === 'passenger' ? 'passenger_id' : 'driver_id';
  const result = await pool.query(
    `SELECT * FROM trips WHERE ${column} = $1 ORDER BY created_at DESC`,
    [user_id]
  );
  return result.rows;
};

export const getAvailableTrips = async () => {
  // Trips that are pending and not yet assigned to any driver
  const result = await pool.query(
    `SELECT * FROM trips WHERE status = 'pending' AND driver_id IS NULL ORDER BY created_at ASC`
  );
  return result.rows;
};

export const assignDriver = async (trip_id, driver_id, driver_lat = null, driver_lng = null) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'accepted', driver_id = $1, driver_assigned_at = NOW(), driver_lat = $2, driver_lng = $3 WHERE id = $4 RETURNING *`,
    [driver_id, driver_lat, driver_lng, trip_id]
  );
  return result.rows[0];
};

export const markDriverArrived = async (trip_id, lat = null, lng = null) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'arrived', driver_arrived_at = NOW(), driver_lat = $1, driver_lng = $2 WHERE id = $3 RETURNING *`,
    [lat, lng, trip_id]
  );
  return result.rows[0];
};

export const confirmPassengerBoarded = async (trip_id) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'boarded', passenger_boarded_at = NOW() WHERE id = $1 RETURNING *`,
    [trip_id]
  );
  return result.rows[0];
};

export const startTrip = async (trip_id) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'in_progress', started_at = NOW() WHERE id = $1 RETURNING *`,
    [trip_id]
  );
  return result.rows[0];
};

export const completeTrip = async (trip_id) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'completed', completed_at = NOW() WHERE id = $1 RETURNING *`,
    [trip_id]
  );
  return result.rows[0];
};

export const cancelTrip = async (trip_id, canceled_by = null, reason = null) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'canceled', canceled_at = NOW(), canceled_by = $1, cancel_reason = $2 WHERE id = $3 RETURNING *`,
    [canceled_by, reason, trip_id]
  );
  return result.rows[0];
};

export const updateDriverLocation = async (trip_id, lat, lng) => {
  const result = await pool.query(
    `UPDATE trips SET driver_lat = $1, driver_lng = $2 WHERE id = $3 RETURNING *`,
    [lat, lng, trip_id]
  );
  return result.rows[0];
};