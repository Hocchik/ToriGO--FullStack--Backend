-- Seed script to add test passenger(s) and an example pending trip
-- Adjust values (UUIDs, phone, email) as needed for your environment.

-- Test passenger user
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES (
  'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
  'Test',
  'Passenger',
  '12345678',
  '+51987654321',
  'test.passenger@example.com',
  30,
  'testpassword'
)
ON CONFLICT (dni) DO NOTHING;

-- Create passenger linked to that user (if not exists)
INSERT INTO passengers (user_id)
SELECT id FROM users WHERE id = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'
ON CONFLICT DO NOTHING;

-- Insert an example pending trip for that passenger
INSERT INTO trips (passenger_id, origin, destination, status, fare, origin_lat, origin_lng, destination_lat, destination_lng)
SELECT p.id, 'Av. Test 100', 'Av. Destino 200', 'pending', 6.50, -12.056, -77.034, -12.045, -77.030
FROM passengers p
JOIN users u ON u.id = p.user_id
WHERE u.id = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'
ON CONFLICT DO NOTHING;


-- Optional: create driver record (driver table) for the test driver
-- INSERT INTO drivers (id, user_id)
-- SELECT gen_random_uuid()::text, id FROM users WHERE id = 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb' ON CONFLICT DO NOTHING;

-- Notes:
-- - Run this script against the same database used by the app.
-- - If your `users` table uses different column names (full_name vs name/last_name) adapt the INSERT accordingly.
-- - For Postgres: run with psql or your DB tool.
