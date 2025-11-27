-- Seed 10 test passenger users and passenger rows for local testing
-- NOTE: adapt column names if your `users` table uses `full_name` instead of `name`/`last_name`.

-- Passenger 1
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0001-0000-0000-000000000001', 'Pedro', 'Gonzales', '11111111', '+51911111111', 'pedro1@example.com', 28, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 2
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0002-0000-0000-000000000002', 'Maria', 'Lopez', '22222222', '+51922222222', 'maria2@example.com', 32, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 3
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0003-0000-0000-000000000003', 'Juan', 'Ramirez', '33333333', '+51933333333', 'juan3@example.com', 24, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 4
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0004-0000-0000-000000000004', 'Luisa', 'Fernandez', '44444444', '+51944444444', 'luisa4@example.com', 29, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 5
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0005-0000-0000-000000000005', 'Carlos', 'Vega', '55555555', '+51955555555', 'carlos5@example.com', 41, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 6
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0006-0000-0000-000000000006', 'Ana', 'Martinez', '66666666', '+51966666666', 'ana6@example.com', 35, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 7
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0007-0000-0000-000000000007', 'Diego', 'Sanchez', '77777777', '+51977777777', 'diego7@example.com', 27, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 8
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0008-0000-0000-000000000008', 'Rocio', 'Hernandez', '88888888', '+51988888888', 'rocio8@example.com', 22, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 9
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0009-0000-0000-000000000009', 'Miguel', 'Ortega', '99999999', '+51999999999', 'miguel9@example.com', 45, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Passenger 10
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES ('p-0010-0000-0000-000000000010', 'Sofia', 'Cruz', '10101010', '+51910101010', 'sofia10@example.com', 31, 'pass1234')
ON CONFLICT (dni) DO NOTHING;

-- Insert into passengers table for each user if no passenger row exists
INSERT INTO passengers (user_id)
SELECT u.id FROM users u
WHERE u.dni IN ('11111111','22222222','33333333','44444444','55555555','66666666','77777777','88888888','99999999','10101010')
  AND NOT EXISTS (
    SELECT 1 FROM passengers p WHERE p.user_id = u.id
  );

-- Notes: If your users table columns differ (e.g., full_name instead of name/last_name)
-- edit this file accordingly before running.
