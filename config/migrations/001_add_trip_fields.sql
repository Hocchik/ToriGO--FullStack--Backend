-- Adds fields to support trip lifecycle and locations
ALTER TABLE trips
  ADD COLUMN IF NOT EXISTS driver_assigned_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS driver_arrived_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS passenger_boarded_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS canceled_by TEXT,
  ADD COLUMN IF NOT EXISTS cancel_reason TEXT,
  ADD COLUMN IF NOT EXISTS origin_lat NUMERIC,
  ADD COLUMN IF NOT EXISTS origin_lng NUMERIC,
  ADD COLUMN IF NOT EXISTS destination_lat NUMERIC,
  ADD COLUMN IF NOT EXISTS destination_lng NUMERIC,
  ADD COLUMN IF NOT EXISTS driver_lat NUMERIC,
  ADD COLUMN IF NOT EXISTS driver_lng NUMERIC;

-- You can run this file against your database when migrating schema.
