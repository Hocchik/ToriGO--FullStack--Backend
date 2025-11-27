-- Migration 006: Simulated vehicle registry and inspections
-- Creates tables to simulate national registry data and inspection records
-- Inserts sample rows for testing (plates, licenses, soat) and links to motorcycles when available

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Registered drivers (official registry simulated)
CREATE TABLE IF NOT EXISTS registered_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dni varchar(32) UNIQUE,
  name text,
  last_name text,
  document_issued_at date,
  created_at timestamptz DEFAULT now()
);

-- Registered vehicles (official vehicle registry simulated)
CREATE TABLE IF NOT EXISTS registered_vehicles (
  plate varchar(32) PRIMARY KEY,
  color varchar(64),
  model varchar(128),
  brand varchar(128),
  registered_owner_id uuid REFERENCES registered_drivers(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Drivers license registry (official)
CREATE TABLE IF NOT EXISTS drivers_license (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_number varchar(64) UNIQUE NOT NULL,
  registered_driver_id uuid NOT NULL REFERENCES registered_drivers(id) ON DELETE CASCADE,
  issue_date date NOT NULL,
  expiration_date date NOT NULL,
  license_type varchar(32),
  created_at timestamptz DEFAULT now()
);

-- SOAT policies (insurance) mapping to vehicles and registered driver
CREATE TABLE IF NOT EXISTS soat_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  insurance_policy varchar(80) UNIQUE NOT NULL,
  expiration_date date NOT NULL,
  vehicle_plate varchar(32) NOT NULL REFERENCES registered_vehicles(plate) ON DELETE CASCADE,
  registered_driver_id uuid REFERENCES registered_drivers(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Map internal app drivers to registered_drivers (optional link table)
CREATE TABLE IF NOT EXISTS driver_registry_link (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid REFERENCES drivers(id) ON DELETE CASCADE,
  registered_driver_id uuid REFERENCES registered_drivers(id) ON DELETE CASCADE,
  linked_at timestamptz DEFAULT now(),
  UNIQUE(driver_id, registered_driver_id)
);

-- Technical inspections (revision tecnica) for vehicles/motorcycles
CREATE TABLE IF NOT EXISTS technical_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_plate varchar(32) REFERENCES registered_vehicles(plate) ON DELETE CASCADE,
  motorcycle_id uuid REFERENCES motorcycles(id) ON DELETE SET NULL,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  review_date date NOT NULL,
  expires_at date NOT NULL,
  passed boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now()
);
