import pool from '../config/dbConfig.js';

export const createTrip = async ({ passenger_id, origin, destination, fare }) => {
  const result = await pool.query(
    `INSERT INTO trips (passenger_id, origin, destination, status, fare)
     VALUES ($1, $2, $3, 'pending', $4) RETURNING *`,
    [passenger_id, origin, destination, fare]
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