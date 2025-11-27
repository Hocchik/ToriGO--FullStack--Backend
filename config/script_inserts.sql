
-- Registered drivers (SUNARP simulated)
INSERT INTO registered_drivers (id, dni, name, last_name)
VALUES
	('bc73683a-883d-4b5a-a050-8b573986935d', '06702426', 'eusebio', 'zari'),
	('7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d', '45821093', 'alberto', 'ruiz'),
	('1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b', '12039487', 'sofía', 'díaz'),
	('8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f', '78564129', 'manuel', 'gutiérrez'),
	('2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a', '01928374', 'laura', 'fernández'),
	('5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a', '90123456', 'javier', 'lópez'),
	('3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c', '56473821', 'clara', 'martínez'),
	('9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f', '23789012', 'pablo', 'sánchez'),
	('4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a', '67345098', 'elena', 'pérez'),
	('0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c', '34152670', 'ricardo', 'garcía'),
	('6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d', '89012345', 'maría', 'rodríguez'),
	('f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e', '45678901', 'sergio', 'hernández'),
	('a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9', '10987654', 'ana', 'gómez'),
	('5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9', '76543210', 'antonio', 'morales'),
	('b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b', '09876543', 'irene', 'ortega'),
	('e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0', '54321098', 'david', 'jiménez'),
	('3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4', '21098765', 'patricia', 'navarro'),
	('8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a', '65432109', 'miguel', 'castro'),
	('1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8', '32109876', 'rocío', 'vega'),
	('7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3', '87654321', 'daniel', 'mendoza'),
	('4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2', '13579246', 'nuria', 'ramos')
ON CONFLICT (dni) DO NOTHING;


-- Drivers license records (mapped to registered_drivers)
INSERT INTO drivers_license (id, license_number, registered_driver_id, issue_date, expiration_date, license_type)
VALUES
	(gen_random_uuid(), 'A06702426', 'bc73683a-883d-4b5a-a050-8b573986935d', '2023-01-15', '2033-01-15', 'A-I'),
	(gen_random_uuid(), 'B45821093', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d', '2021-11-01', '2031-11-01', 'A-IIIa'),
	(gen_random_uuid(), 'A12039487', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b', '2023-09-10', '2033-09-10', 'A-I'),
	(gen_random_uuid(), 'B78564129', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f', '2020-03-25', '2030-03-25', 'A-IIb'),
	(gen_random_uuid(), 'A01928374', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a', '2024-02-18', '2034-02-18', 'A-I'),
	(gen_random_uuid(), 'B90123456', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a', '2021-06-05', '2031-06-05', 'A-IIIc'),
	(gen_random_uuid(), 'A56473821', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c', '2023-12-01', '2033-12-01', 'A-IIa'),
	(gen_random_uuid(), 'B23789012', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f', '2020-08-30', '2030-08-30', 'A-IIb'),
	(gen_random_uuid(), 'A67345098', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a', '2024-04-12', '2034-04-12', 'A-I'),
	(gen_random_uuid(), 'B34152670', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c', '2021-04-01', '2031-04-01', 'A-IIIa'),
	(gen_random_uuid(), 'A89012345', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d', '2023-07-22', '2033-07-22', 'A-IIa'),
	(gen_random_uuid(), 'B45678901', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e', '2020-10-08', '2030-10-08', 'A-IIIc'),
	(gen_random_uuid(), 'A10987654', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9', '2024-01-28', '2034-01-28', 'A-I'),
	(gen_random_uuid(), 'B76543210', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9', '2021-02-14', '2031-02-14', 'A-IIb'),
	(gen_random_uuid(), 'A09876543', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b', '2023-05-03', '2033-05-03', 'A-IIa'),
	(gen_random_uuid(), 'B54321098', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0', '2020-12-10', '2030-12-10', 'A-IIIa'),
	(gen_random_uuid(), 'A21098765', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4', '2024-03-05', '2034-03-05', 'A-I'),
	(gen_random_uuid(), 'B65432109', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a', '2021-09-17', '2031-09-17', 'A-IIb'),
	(gen_random_uuid(), 'A32109876', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8', '2023-08-07', '2033-08-07', 'A-IIa'),
	(gen_random_uuid(), 'B87654321', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3', '2020-07-29', '2030-07-29', 'A-IIIc'),
	(gen_random_uuid(), 'A13579246', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2', '2024-06-15', '2034-06-15', 'A-I')
ON CONFLICT (license_number) DO NOTHING;

-- Registered vehicles (plates updated to format NNNN-LL)
INSERT INTO registered_vehicles (plate, color, model, brand, registered_owner_id)
VALUES
	('0670-EZ', 'Rojo', 'Bajaj RE', 'Toyota', 'bc73683a-883d-4b5a-a050-8b573986935d'),
	('4582-AR', 'Azul', 'Honda TUK', 'Toyota', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d'),
	('1203-SD', 'Verde', 'TVS King', 'Toyota', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b'),
	('7856-MG', 'Amarillo', 'Piaggio Ape', 'Toyota', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f'),
	('0192-LF', 'Negro', 'Bajaj Maxima', 'Toyota', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a'),
	('9012-JL', 'Blanco', 'Honda TUK', 'Toyota', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a'),
	('5647-CM', 'Rojo', 'TVS King', 'Toyota', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c'),
	('2378-PS', 'Azul', 'Bajaj RE', 'Toyota', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f'),
	('6734-EP', 'Verde', 'Piaggio Ape', 'Toyota', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a'),
	('3415-RG', 'Amarillo', 'Honda TUK', 'Toyota', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c'),
	('8901-MR', 'Negro', 'TVS King', 'Toyota', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d'),
	('4567-SH', 'Blanco', 'Bajaj Maxima', 'Toyota', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e'),
	('1098-AG', 'Rojo', 'Piaggio Ape', 'Toyota', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9'),
	('7654-AM', 'Azul', 'Honda TUK', 'Toyota', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9'),
	('0987-IO', 'Verde', 'TVS King', 'Toyota', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b'),
	('5432-DJ', 'Amarillo', 'Bajaj RE', 'Toyota', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0'),
	('2109-PN', 'Negro', 'Piaggio Ape', 'Toyota', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4'),
	('6543-MC', 'Blanco', 'TVS King', 'Toyota', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a'),
	('3210-RV', 'Rojo', 'Honda TUK', 'Toyota', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8'),
	('8765-DM', 'Azul', 'Bajaj Maxima', 'Toyota', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3'),
	('1357-NR', 'Verde', 'TVS King', 'Toyota', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2')
ON CONFLICT (plate) DO NOTHING;

INSERT INTO soat_policies (id, insurance_policy, expiration_date, vehicle_plate, registered_driver_id)
VALUES
	(gen_random_uuid(), 'SOAT-0670-EZ-2025', '2026-11-01', '0670-EZ', 'bc73683a-883d-4b5a-a050-8b573986935d'),
	(gen_random_uuid(), 'SOAT-4582-AR-2025', '2026-11-01', '4582-AR', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d'),
	(gen_random_uuid(), 'SOAT-1203-SD-2025', '2026-11-01', '1203-SD', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b'),
	(gen_random_uuid(), 'SOAT-7856-MG-2025', '2026-11-01', '7856-MG', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f'),
	(gen_random_uuid(), 'SOAT-0192-LF-2025', '2026-11-01', '0192-LF', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a'),
	(gen_random_uuid(), 'SOAT-9012-JL-2025', '2026-11-01', '9012-JL', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a'),
	(gen_random_uuid(), 'SOAT-5647-CM-2025', '2026-11-01', '5647-CM', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c'),
	(gen_random_uuid(), 'SOAT-2378-PS-2025', '2026-11-01', '2378-PS', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f'),
	(gen_random_uuid(), 'SOAT-6734-EP-2025', '2026-11-01', '6734-EP', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a'),
	(gen_random_uuid(), 'SOAT-3415-RG-2025', '2026-11-01', '3415-RG', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c'),
	(gen_random_uuid(), 'SOAT-8901-MR-2025', '2026-11-01', '8901-MR', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d'),
	(gen_random_uuid(), 'SOAT-4567-SH-2025', '2026-11-01', '4567-SH', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e'),
	(gen_random_uuid(), 'SOAT-1098-AG-2025', '2026-11-01', '1098-AG', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9'),
	(gen_random_uuid(), 'SOAT-7654-AM-2025', '2026-11-01', '7654-AM', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9'),
	(gen_random_uuid(), 'SOAT-0987-IO-2025', '2026-11-01', '0987-IO', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b'),
	(gen_random_uuid(), 'SOAT-5432-DJ-2025', '2026-11-01', '5432-DJ', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0'),
	(gen_random_uuid(), 'SOAT-2109-PN-2025', '2026-11-01', '2109-PN', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4'),
	(gen_random_uuid(), 'SOAT-6543-MC-2025', '2026-11-01', '6543-MC', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a'),
	(gen_random_uuid(), 'SOAT-3210-RV-2025', '2026-11-01', '3210-RV', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8'),
	(gen_random_uuid(), 'SOAT-8765-DM-2025', '2026-11-01', '8765-DM', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3'),
	(gen_random_uuid(), 'SOAT-1357-NR-2025', '2026-11-01', '1357-NR', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2')
ON CONFLICT (insurance_policy) DO NOTHING;

-- Technical reviews (simulated). Insert one review for every registered vehicle,
-- linking to `motorcycles` and `drivers` when possible.
INSERT INTO technical_reviews (id, vehicle_plate, motorcycle_id, driver_id, review_date, expires_at, passed, notes)
SELECT
	gen_random_uuid() AS id,
	rv.plate AS vehicle_plate,
	m.id AS motorcycle_id,
	COALESCE(d.id, drl.driver_id) AS driver_id,
	(CURRENT_DATE - INTERVAL '6 months')::date AS review_date,
	(CURRENT_DATE + INTERVAL '6 months')::date AS expires_at,
	TRUE AS passed,
	'Simulated technical review (pass)' AS notes
FROM registered_vehicles rv
LEFT JOIN motorcycles m ON m.plate = rv.plate
LEFT JOIN drivers d ON d.id = m.driver_id
LEFT JOIN driver_registry_link drl ON drl.registered_driver_id = rv.registered_owner_id
ON CONFLICT DO NOTHING;