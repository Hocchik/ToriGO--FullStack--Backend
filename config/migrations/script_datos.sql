-- Migration 005: Full schema for ToriGO mototaxi app
-- Creates core tables: users, passengers, passenger_locations, drivers, motorcycles,
-- trips, trip_traces, price_rules, trip_prices, trip_audit
-- Designed for PostgreSQL. Optional PostGIS support included when available.

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- provides gen_random_uuid()
-- PostGIS is optional but recommended for geo queries
-- Create PostGIS only if the extension is available on the server
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'postgis') THEN
    EXECUTE 'CREATE EXTENSION IF NOT EXISTS postgis';
  END IF;
END$$;

-- Enums
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'trip_status') THEN
    CREATE TYPE trip_status AS ENUM (
      'pending', 'accepted', 'enroute', 'arrived', 'boarded', 'in_progress', 'completed', 'canceled', 'failed'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'availability_status') THEN
    CREATE TYPE availability_status AS ENUM ('available','busy','offline');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
    CREATE TYPE payment_method AS ENUM ('cash','card','wallet','mixed');
  END IF;
END$$;

-- Users (base entity for passengers and drivers)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  last_name text NOT NULL,
  dni varchar(20) UNIQUE,
  phone varchar(32) UNIQUE,
  email varchar(255) UNIQUE,
  age integer,
  -- Store password hashes here (bcrypt). Keep as text to accommodate hash formats.
  password text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Passengers
CREATE TABLE IF NOT EXISTS passengers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  rating numeric(3,2) DEFAULT 5.00,
  total_trips integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Passenger frequent locations
CREATE TABLE IF NOT EXISTS passenger_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id uuid NOT NULL REFERENCES passengers(id) ON DELETE CASCADE,
  name text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz DEFAULT now()
);
-- Note: spatial `geom` column and GIST index are created later if PostGIS is present

-- Drivers
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  driver_license text UNIQUE,
  experience_years integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 5.00,
  availability availability_status DEFAULT 'offline',
  created_at timestamptz DEFAULT now()
);

-- Motorcycles
CREATE TABLE IF NOT EXISTS motorcycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid NOT NULL UNIQUE REFERENCES drivers(id) ON DELETE CASCADE,
  plate varchar(32) NOT NULL UNIQUE,
  color varchar(64),
  soat text,
  technical_review_date date,
  created_at timestamptz DEFAULT now()
);

-- Price rules (master rules for dynamic pricing)
CREATE TABLE IF NOT EXISTS price_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  base_fare numeric(10,2) NOT NULL DEFAULT 0,
  price_per_km numeric(10,4) NOT NULL DEFAULT 0,
  price_per_minute numeric(10,4) NOT NULL DEFAULT 0,
  surge_multiplier numeric(6,4) NOT NULL DEFAULT 1.0,
  min_fare numeric(10,2) NOT NULL DEFAULT 0,
  active boolean DEFAULT true,
  effective_from timestamptz,
  effective_to timestamptz,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Trips (single row per trip, lifecycle & audit fields)
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id text UNIQUE, -- id from frontend (tripId) for idempotency
  passenger_id uuid REFERENCES passengers(id) ON DELETE SET NULL,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  origin_address text,
  origin_lat double precision,
  origin_lng double precision,
  destination_address text,
  destination_lat double precision,
  destination_lng double precision,
  payment_method payment_method DEFAULT 'cash',
  fare numeric(12,2),
  status trip_status DEFAULT 'pending',
  price_rule_id uuid REFERENCES price_rules(id), -- rule applied at booking
  price_snapshot jsonb, -- store computed price breakdown
  raw_payload jsonb,
  driver_assigned_at timestamptz,
  driver_arrived_at timestamptz,
  passenger_boarded_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  canceled_at timestamptz,
  canceled_by text,
  cancel_reason text,
  driver_lat double precision,
  driver_lng double precision,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_trips_status_created ON trips(status, created_at);
CREATE INDEX IF NOT EXISTS idx_trips_driver ON trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_trips_passenger ON trips(passenger_id);
CREATE INDEX IF NOT EXISTS idx_trips_external_id ON trips(external_id);
-- Note: spatial origin/destination columns and GIST indexes are created later if PostGIS is present

-- Trip traces (GPS points)
CREATE TABLE IF NOT EXISTS trip_traces (
  id bigserial PRIMARY KEY,
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  seq integer, -- optional sequence number
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  ts timestamptz NOT NULL,
  recorded_by text, -- 'driver'|'passenger'|'device' or user id
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_trip_traces_trip_ts ON trip_traces(trip_id, ts DESC);
-- Note: spatial `geom` column and GIST index for trip_traces created later if PostGIS is present

-- Trip prices (applied calculation snapshot per trip)
CREATE TABLE IF NOT EXISTS trip_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL UNIQUE REFERENCES trips(id) ON DELETE CASCADE,
  base_fare numeric(12,2),
  distance_km numeric(10,4),
  duration_min numeric(10,4),
  surge_multiplier numeric(6,4),
  total_fare numeric(12,2),
  breakdown jsonb,
  created_at timestamptz DEFAULT now()
);

-- Trip audit: record status transitions and who triggered them
CREATE TABLE IF NOT EXISTS trip_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  from_status trip_status,
  to_status trip_status,
  changed_by uuid, -- user id if available
  reason text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_trip_audit_trip ON trip_audit(trip_id);

-- Quick helper view: current active trips with driver/passenger info
CREATE OR REPLACE VIEW vw_active_trips AS
SELECT t.id, t.external_id, t.status, t.passenger_id, t.driver_id, t.origin_address, t.destination_address, t.created_at
FROM trips t
WHERE t.status IN ('pending','accepted','enroute','arrived','boarded','in_progress');

-- Triggers: auto-update updated_at on rows
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_trips ON trips;
CREATE TRIGGER set_timestamp_trips
BEFORE UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_users ON users;
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- NOTES:
-- - Use transactions in application code when inserting a trip and bulk inserting traces.
-- - Use UPDATE ... WHERE status='pending' AND driver_id IS NULL to atomically assign drivers.
-- - Consider partitioning trip_traces by time or trip_id for very high volume workloads.

-- Optional: create spatial columns and GIST indexes only if PostGIS is installed
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'postgis') THEN
    -- passenger_locations geom + index
    ALTER TABLE passenger_locations
      ADD COLUMN IF NOT EXISTS geom geometry(Point,4326);
    CREATE INDEX IF NOT EXISTS idx_passenger_locations_geom ON passenger_locations USING GIST (geom);

    -- trips spatial columns + indexes
    ALTER TABLE trips
      ADD COLUMN IF NOT EXISTS origin_geom geometry(Point,4326),
      ADD COLUMN IF NOT EXISTS destination_geom geometry(Point,4326);
    CREATE INDEX IF NOT EXISTS idx_trips_origin_geom ON trips USING GIST (origin_geom);
    CREATE INDEX IF NOT EXISTS idx_trips_destination_geom ON trips USING GIST (destination_geom);

    -- trip_traces geom + index
    ALTER TABLE trip_traces
      ADD COLUMN IF NOT EXISTS geom geometry(Point,4326);
    CREATE INDEX IF NOT EXISTS idx_trip_traces_geom ON trip_traces USING GIST (geom);
  END IF;
END$$;
