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

export const getTripByExternalId = async (external_id) => {
  const result = await pool.query(`SELECT * FROM trips WHERE external_id = $1`, [external_id]);
  return result.rows[0];
};

export const upsertTripByExternalId = async (data) => {
  // data: { external_id, passenger_id, driver_id, origin, destination, price, started_at, finished_at, status, raw_payload, driver_last_lat, driver_last_lng }
  const {
    external_id,
    passenger_id = null,
    driver_id = null,
    origin = null,
    destination = null,
    price = null,
    started_at = null,
    finished_at = null,
    status = null,
    raw_payload = null,
    driver_last_lat = null,
    driver_last_lng = null,
  } = data;

  const result = await pool.query(
    `INSERT INTO trips (external_id, passenger_id, driver_id, origin, destination, fare, started_at, completed_at, status, raw_payload, driver_lat, driver_lng, origin_lat, origin_lng, destination_lat, destination_lng)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     ON CONFLICT (external_id) DO UPDATE SET
       passenger_id = COALESCE(EXCLUDED.passenger_id, trips.passenger_id),
       driver_id = COALESCE(EXCLUDED.driver_id, trips.driver_id),
       origin = COALESCE(EXCLUDED.origin, trips.origin),
       destination = COALESCE(EXCLUDED.destination, trips.destination),
       fare = COALESCE(EXCLUDED.fare, trips.fare),
       started_at = COALESCE(EXCLUDED.started_at, trips.started_at),
       completed_at = COALESCE(EXCLUDED.completed_at, trips.completed_at),
       status = COALESCE(EXCLUDED.status, trips.status),
       raw_payload = COALESCE(EXCLUDED.raw_payload, trips.raw_payload),
       driver_lat = COALESCE(EXCLUDED.driver_lat, trips.driver_lat),
       driver_lng = COALESCE(EXCLUDED.driver_lng, trips.driver_lng),
       origin_lat = COALESCE(EXCLUDED.origin_lat, trips.origin_lat),
       origin_lng = COALESCE(EXCLUDED.origin_lng, trips.origin_lng),
       destination_lat = COALESCE(EXCLUDED.destination_lat, trips.destination_lat),
       destination_lng = COALESCE(EXCLUDED.destination_lng, trips.destination_lng)
     RETURNING *;
    `,
    [
      external_id,
      passenger_id,
      driver_id,
      origin?.address || origin || null,
      destination?.address || destination || null,
      price,
      started_at,
      finished_at,
      status,
      raw_payload ? JSON.stringify(raw_payload) : null,
      driver_last_lat,
      driver_last_lng,
      origin?.lat || null,
      origin?.lng || null,
      destination?.lat || null,
      destination?.lng || null,
    ]
  );
  return result.rows[0];
};

export const insertTripTraces = async (trip_id, traces = []) => {
  if (!traces || traces.length === 0) return [];
  // build bulk insert
  const values = [];
  const params = [];
  let idx = 1;
  for (const t of traces) {
    values.push(`($${idx++}, $${idx++}, $${idx++}, $${idx++})`); // trip_id, lat, lng, ts
    params.push(trip_id, t.lat, t.lng, t.ts);
  }
  const query = `INSERT INTO trip_traces (trip_id, lat, lng, ts) VALUES ${values.join(',')} RETURNING *`;
  const result = await pool.query(query, params);
  return result.rows;
};

export const appendTracesByExternalId = async (external_id, traces = []) => {
  const trip = await getTripByExternalId(external_id);
  if (!trip) return null;
  return insertTripTraces(trip.id, traces);
};

export const getTripWithTracesByExternalId = async (external_id, includeTrace = false) => {
  const trip = await getTripByExternalId(external_id);
  if (!trip) return null;
  if (!includeTrace) return trip;
  const tracesRes = await pool.query(`SELECT id, lat, lng, ts, created_at FROM trip_traces WHERE trip_id = $1 ORDER BY ts ASC`, [trip.id]);
  return { ...trip, traces: tracesRes.rows };
};

export const getTripsByDriverId = async (driver_id, limit = 50, status = null) => {
  let query = `SELECT * FROM trips WHERE driver_id = $1`;
  const params = [driver_id];
  if (status) {
    params.push(status);
    query += ` AND status = $2`;
  }
  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
  params.push(limit);
  const result = await pool.query(query, params);
  return result.rows;
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
    `UPDATE trips
     SET status = 'accepted', driver_id = $1, driver_assigned_at = NOW(), driver_lat = $2, driver_lng = $3
     WHERE id = $4 AND status = 'pending' AND driver_id IS NULL
     RETURNING *`,
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