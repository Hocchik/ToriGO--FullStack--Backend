-- Adds external_id and raw_payload to trips, and creates trip_traces table
-- Run on PostgreSQL. If using PostGIS, consider adding a geometry column for traces.

ALTER TABLE trips
  ADD COLUMN IF NOT EXISTS external_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS raw_payload JSONB;

CREATE TABLE IF NOT EXISTS trip_traces (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  ts TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_trip_traces_trip_id ON trip_traces(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_traces_ts ON trip_traces(ts);

-- Note: Run this migration after any previous trip migrations.
