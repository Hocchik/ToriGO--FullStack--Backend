--Registros de conductores de la bd de la sunarp

insert into registered_drivers (id, dni, name, last_name) values('bc73683a-883d-4b5a-a050-8b573986935d', '06702426', 'eusebio', 'zari'); 
insert into registered_drivers (id, dni, name, last_name) values('7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d', '45821093', 'alberto', 'ruiz');
insert into registered_drivers (id, dni, name, last_name) values('1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b', '12039487', 'sofía', 'díaz');
insert into registered_drivers (id, dni, name, last_name) values('8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f', '78564129', 'manuel', 'gutiérrez');
insert into registered_drivers (id, dni, name, last_name) values('2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a', '01928374', 'laura', 'fernández');
insert into registered_drivers (id, dni, name, last_name) values('5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a', '90123456', 'javier', 'lópez');
insert into registered_drivers (id, dni, name, last_name) values('3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c', '56473821', 'clara', 'martínez');
insert into registered_drivers (id, dni, name, last_name) values('9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f', '23789012', 'pablo', 'sánchez');
insert into registered_drivers (id, dni, name, last_name) values('4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a', '67345098', 'elena', 'pérez');
insert into registered_drivers (id, dni, name, last_name) values('0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c', '34152670', 'ricardo', 'garcía');
insert into registered_drivers (id, dni, name, last_name) values('6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d', '89012345', 'maría', 'rodríguez');
insert into registered_drivers (id, dni, name, last_name) values('f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e', '45678901', 'sergio', 'hernández');
insert into registered_drivers (id, dni, name, last_name) values('a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9', '10987654', 'ana', 'gómez');
insert into registered_drivers (id, dni, name, last_name) values('5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9', '76543210', 'antonio', 'morales');
insert into registered_drivers (id, dni, name, last_name) values('b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b', '09876543', 'irene', 'ortega');
insert into registered_drivers (id, dni, name, last_name) values('e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0', '54321098', 'david', 'jiménez');
insert into registered_drivers (id, dni, name, last_name) values('3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4', '21098765', 'patricia', 'navarro');
insert into registered_drivers (id, dni, name, last_name) values('8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a', '65432109', 'miguel', 'castro');
insert into registered_drivers (id, dni, name, last_name) values('1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8', '32109876', 'rocío', 'vega');
insert into registered_drivers (id, dni, name, last_name) values('7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3', '87654321', 'daniel', 'mendoza');
insert into registered_drivers (id, dni, name, last_name) values('4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2', '13579246', 'nuria', 'ramos');

--Registros de licencias de los conductores de la sunarp
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('f0d7e6c5-a4b3-4f2d-9e8c-7b6a5d4c3b2a', 'A06702426', 'bc73683a-883d-4b5a-a050-8b573986935d', '2023-01-15', '2033-01-15', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('c9b8a7d6-e5f4-4d3c-2b1a-0f9e8d7c6b5a', 'B45821093', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d', '2021-11-01', '2031-11-01', 'A-IIIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('d4e5f6a7-a8b9-4c0d-e1f2-03a4b5c6d7e8', 'A12039487', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b', '2023-09-10', '2033-09-10', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('a3b2c1d0-e4f5-4a6b-c7d8-e9f0a1b2c3d4', 'B78564129', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f', '2020-03-25', '2030-03-25', 'A-IIb');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('b5c6d7e8-f9a0-4b1c-d2e3-f4a5b6c7d8e9', 'A01928374', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a', '2024-02-18', '2034-02-18', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('f0e9d8c7-b6a5-44d3-c2b1-a0f9e8d7c6b5', 'B90123456', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a', '2021-06-05', '2031-06-05', 'A-IIIc');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6', 'A56473821', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c', '2023-12-01', '2033-12-01', 'A-IIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('c7d6e5f4-a3b2-4c1d-e0f9-a8b7c6d5e4f3', 'B23789012', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f', '2020-08-30', '2030-08-30', 'A-IIb');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('d2e3f4a5-b6c7-4d8e-f9a0-b1c2d3e4f5a6', 'A67345098', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a', '2024-04-12', '2034-04-12', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('e9f0a1b2-c3d4-4e5f-a6b7-c8d9e0f1a2b3', 'B34152670', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c', '2021-04-01', '2031-04-01', 'A-IIIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('a4b5c6d7-e8f9-4a0b-c1d2-e3f4a5b6c7d8', 'A89012345', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d', '2023-07-22', '2033-07-22', 'A-IIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('b0c1d2e3-f4a5-4b6c-d7e8-f9a0b1c2d3e4', 'B45678901', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e', '2020-10-08', '2030-10-08', 'A-IIIc');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('c5d6e7f8-a9b0-4c1d-e2f3-a4b5c6d7e8f9', 'A10987654', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9', '2024-01-28', '2034-01-28', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('d0e1f2a3-b4c5-4d6e-f7a8-b9c0d1e2f3a4', 'B76543210', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9', '2021-02-14', '2031-02-14', 'A-IIb');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('e5f6a7b8-c9d0-4e1f-a2b3-c4d5e6f7a8b9', 'A09876543', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b', '2023-05-03', '2033-05-03', 'A-IIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('f0a1b2c3-d4e5-4f6a-b7c8-d9e0f1a2b3c4', 'B54321098', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0', '2020-12-10', '2030-12-10', 'A-IIIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('a5b6c7d8-e9f0-4a1b-c2d3-e4f5a6b7c8d9', 'A21098765', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4', '2024-03-05', '2034-03-05', 'A-I');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('b0c1d2e3-f4a5-4b6c-d7e8-f9a0b1c2d3e4', 'B65432109', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a', '2021-09-17', '2031-09-17', 'A-IIb');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('c5d6e7f8-a9b0-4c1d-e2f3-a4b5c6d7e8f9', 'A32109876', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8', '2023-08-07', '2033-08-07', 'A-IIa');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('d0e1f2a3-b4c5-4d6e-f7a8-b9c0d1e2f3a4', 'B87654321', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3', '2020-07-29', '2030-07-29', 'A-IIIc');
insert into drivers_license (id, license_number, id_registered_driver, issue_date, expiration_date, license_type) values('e5f6a7b8-c9d0-4e1f-a2b3-c4d5e6f7a8b9', 'A13579246', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2', '2024-06-15', '2034-06-15', 'A-I');

--Registros de vehiculos
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('EZ-0670', 'Rojo', 'Bajaj RE', 'Toyota', 'bc73683a-883d-4b5a-a050-8b573986935d');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('AR-4582', 'Azul', 'Honda TUK', 'Toyota', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('SD-1203', 'Verde', 'TVS King', 'Toyota', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('MG-7856', 'Amarillo', 'Piaggio Ape', 'Toyota', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('LF-0192', 'Negro', 'Bajaj Maxima', 'Toyota', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('JL-9012', 'Blanco', 'Honda TUK', 'Toyota', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('CM-5647', 'Rojo', 'TVS King', 'Toyota', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('PS-2378', 'Azul', 'Bajaj RE', 'Toyota', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('EP-6734', 'Verde', 'Piaggio Ape', 'Toyota', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('RG-3415', 'Amarillo', 'Honda TUK', 'Toyota', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('MR-8901', 'Negro', 'TVS King', 'Toyota', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('SH-4567', 'Blanco', 'Bajaj Maxima', 'Toyota', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('AG-1098', 'Rojo', 'Piaggio Ape', 'Toyota', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('AM-7654', 'Azul', 'Honda TUK', 'Toyota', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('IO-0987', 'Verde', 'TVS King', 'Toyota', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('DJ-5432', 'Amarillo', 'Bajaj RE', 'Toyota', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('PN-2109', 'Negro', 'Piaggio Ape', 'Toyota', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('MC-6543', 'Blanco', 'TVS King', 'Toyota', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('RV-3210', 'Rojo', 'Honda TUK', 'Toyota', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('DM-8765', 'Azul', 'Bajaj Maxima', 'Toyota', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3');
INSERT INTO registered_vehicles (plate, color, model, brand, driver_id) VALUES('NR-1357', 'Verde', 'TVS King', 'Toyota', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2');

--soats
INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-EZ-0670-2025', '2026-11-01', 'EZ-0670', 'bc73683a-883d-4b5a-a050-8b573986935d');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-AR-4582-2025', '2026-11-01', 'AR-4582', '7e8e5d3c-9a2f-4c1b-b4d0-5e3a8f7c9b2d');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-SD-1203-2025', '2026-11-01', 'SD-1203', '1a6c4b9f-3d8e-4a7d-8f0c-2b5e1d4a6f3b');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-MG-7856-2025', '2026-11-01', 'MG-7856', '8c0e7f2a-6b4d-4e9c-a1f2-7d3c0b9e8a1f');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-LF-0192-2025', '2026-11-01', 'LF-0192', '2d5b6a8e-1f7c-402d-9b3a-6c8d5e0f7b9a');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-JL-9012-2025', '2026-11-01', 'JL-9012', '5f4a1e9d-0c3b-47e2-8d1a-4b6c7e2d9f8a');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-CM-5647-2025', '2026-11-01', 'CM-5647', '3b7d0c6e-5a1f-49b3-c0d2-8e9f1a7b6d5c');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-PS-2378-2025', '2026-11-01', 'PS-2378', '9e2a8d1c-7f5b-46a0-d8c3-1b0e9c4d2a7f');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-EP-6734-2025', '2026-11-01', 'EP-6734', '4c5f3e7b-2d6a-41f9-a3e1-0b9c8d7e6f5a');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-RG-3415-2025', '2026-11-01', 'RG-3415', '0a9b8c7d-e6f5-48d1-b2c4-3a5f7e1b9d0c');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-MR-8901-2025', '2026-11-01', 'MR-8901', '6d8e9f0a-b1c2-43e4-c5d6-7e8f9a0b1c2d');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-SH-4567-2025', '2026-11-01', 'SH-4567', 'f1e0d3c2-a4b5-47f6-98d7-5c6b7a8d9f0e');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-AG-1098-2025', '2026-11-01', 'AG-1098', 'a2b3c4d5-e6f7-40a1-b2c3-d4e5f6a7b8c9');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-AM-7654-2025', '2026-11-01', 'AM-7654', '5c6b7a8d-9f0e-44c1-d2b3-a4e5f6d7c8b9');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-IO-0987-2025', '2026-11-01', 'IO-0987', 'b9d8c7a6-f5e4-41d3-a2b1-0c9d8e7f6a5b');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-DJ-5432-2025', '2026-11-01', 'DJ-5432', 'e4d5c6b7-a8f9-42e1-b3d4-c5a6b7e8d9f0');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-PN-2109-2025', '2026-11-01', 'PN-2109', '3a5f7e1b-9d0c-45b6-c7d8-e9f0a1b2c3d4');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-MC-6543-2025', '2026-11-01', 'MC-6543', '8b9c0d1e-2f3a-48d0-9c1b-7e6f5d4c3b2a');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-RV-3210-2025', '2026-11-01', 'RV-3210', '1d2c3b4a-5e6f-49e0-a1b2-c3d4e5f6a7b8');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-DM-8765-2025', '2026-11-01', 'DM-8765', '7f6e5d4c-3b2a-46f1-b0c9-a8d7e6f5d4c3');

INSERT INTO soat_policies (id_soat, insurance_policy, expiration_date, vehicle_plate, driver_id) 
VALUES(gen_random_uuid(), 'SOAT-NR-1357-2025', '2026-11-01', 'NR-1357', '4e3d2c1b-0a9f-43e2-b5c6-d7a8e9f0b1c2');