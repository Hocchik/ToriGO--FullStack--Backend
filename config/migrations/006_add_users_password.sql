-- Migration 006: Add `password` column to `users` (nullable)
-- Purpose: Add a column to store password hashes (bcrypt recommended).
-- This migration is safe to run on existing databases and will not overwrite existing data.

BEGIN;

-- Add nullable column for password hash (use bcrypt/argon2 hashes, stored as text)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS password text;

-- Example: set a password hash for a specific user (replace values below).
-- Generate the bcrypt hash in your application (Node.js example using bcrypt):
--   const bcrypt = require('bcrypt');
--   const hash = await bcrypt.hash('myPlainPassword', 10);
-- Then run the UPDATE in psql with the produced hash:
-- UPDATE users SET password = '$2b$10$....' WHERE id = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';

COMMIT;

-- After you have backfilled passwords for all existing users you can enforce NOT NULL:
-- ALTER TABLE users ALTER COLUMN password SET NOT NULL;

-- Optional: add a CHECK to enforce typical bcrypt hash prefix (not strictly necessary):
-- ALTER TABLE users ADD CONSTRAINT chk_password_hash_format CHECK (password IS NULL OR password LIKE '$2b$%');



select rd.name, rd.last_name, rd.dni, rv.plate, dl.license_number, dl.expiration_date as exdalicense, sp.insurance_policy, sp.expiration_date as exdasoat  
from registered_drivers rd
INNER JOIN registered_vehicles rv ON rv.registered_owner_id = rd.id
INNER JOIN soat_policies sp ON sp.registered_driver_id = rd.id
INNER JOIN drivers_license dl ON dl.registered_driver_id = rd.id