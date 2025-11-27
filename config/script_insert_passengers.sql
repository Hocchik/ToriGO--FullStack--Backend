-- Users
INSERT INTO users (id, name, last_name, dni, phone, email, age, password)
VALUES
  (gen_random_uuid(), 'Diego',  'Sanchez',  '71000001', '+51970000001', 'diego.sanchez@example.com', 28, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW'),
  (gen_random_uuid(), 'María',  'Lopez',    '71000002', '+51970000002', 'maria.lopez@example.com', 31, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW'),
  (gen_random_uuid(), 'Juan',   'Ramirez',  '71000003', '+51970000003', 'juan.ramirez@example.com', 24, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW'),
  (gen_random_uuid(), 'Sofía',  'Cruz',     '71000004', '+51970000004', 'sofia.cruz@example.com', 27, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW'),
  (gen_random_uuid(), 'Ana',    'Martinez', '71000005', '+51970000005', 'ana.martinez@example.com', 33, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW'),
  (gen_random_uuid(), 'Carlos', 'Vega',     '71000006', '+51970000006', 'carlos.vega@example.com', 40, '$2b$10$XH0vvYddsvGjOBtTCVADUuXtr9d7xUVltLuU1ossef1sIjHb3M7gW')
ON CONFLICT (dni) DO NOTHING;

-- Create passenger rows for inserted users (if they don't exist)
INSERT INTO passengers (user_id)
SELECT u.id
FROM users u
WHERE u.dni IN ('71000001','71000002','71000003','71000004','71000005','71000006')
  AND NOT EXISTS (SELECT 1 FROM passengers p WHERE p.user_id = u.id);

