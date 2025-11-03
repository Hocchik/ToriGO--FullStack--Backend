-- public.registered_drivers definition

-- Drop table

-- DROP TABLE public.registered_drivers;

CREATE TABLE public.registered_drivers (
	dni text NULL,
	"name" text NULL,
	last_name text NULL,
	id uuid NOT NULL,
	CONSTRAINT registered_drivers_pkey PRIMARY KEY (id)
);


-- public.test definition

-- Drop table

-- DROP TABLE public.test;

CREATE TABLE public.test (
	flag bool NULL
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	dni text NULL,
	phone text NOT NULL,
	email text NOT NULL,
	age int4 NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	id uuid NOT NULL,
	"name" text NOT NULL,
	last_name text NOT NULL,
	CONSTRAINT users_dni_key UNIQUE (dni),
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_phone_key UNIQUE (phone),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.drivers definition

-- Drop table

-- DROP TABLE public.drivers;

CREATE TABLE public.drivers (
	license text NOT NULL,
	plate text NOT NULL,
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT drivers_license_key UNIQUE (license),
	CONSTRAINT drivers_pkey PRIMARY KEY (id),
	CONSTRAINT drivers_plate_key UNIQUE (plate),
	CONSTRAINT drivers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.drivers_license definition

-- Drop table

-- DROP TABLE public.drivers_license;

CREATE TABLE public.drivers_license (
	id uuid NOT NULL,
	license_number text NOT NULL,
	id_registered_driver uuid NOT NULL,
	issue_date date NOT NULL,
	expiration_date date NOT NULL,
	license_type text NULL,
	CONSTRAINT drivers_license_pkey PRIMARY KEY (id, id_registered_driver),
	CONSTRAINT fk_id_registered_driver FOREIGN KEY (id_registered_driver) REFERENCES public.registered_drivers(id)
);


-- public.motorcycles definition

-- Drop table

-- DROP TABLE public.motorcycles;

CREATE TABLE public.motorcycles (
	plate text NOT NULL,
	color text NULL,
	soat text NULL,
	id uuid NOT NULL,
	driver_id uuid NOT NULL,
	CONSTRAINT motorcycles_pkey PRIMARY KEY (id),
	CONSTRAINT motorcycles_plate_key UNIQUE (plate),
	CONSTRAINT motorcycles_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.drivers(id)
);


-- public.passengers definition

-- Drop table

-- DROP TABLE public.passengers;

CREATE TABLE public.passengers (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT passengers_pkey PRIMARY KEY (id),
	CONSTRAINT passengers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.registered_vehicles definition

-- Drop table

-- DROP TABLE public.registered_vehicles;

CREATE TABLE public.registered_vehicles (
	plate text NOT NULL,
	brand text NOT NULL,
	driver_id uuid NOT NULL,
	CONSTRAINT registered_vehicles_pkey PRIMARY KEY (plate),
	CONSTRAINT registered_vehicles_id_fkey FOREIGN KEY (driver_id) REFERENCES public.registered_drivers(id)
);


-- public.soat_policies definition

-- Drop table

-- DROP TABLE public.soat_policies;

CREATE TABLE public.soat_policies (
	id_soat uuid NOT NULL,
	insurance_policy varchar(50) NOT NULL,
	expiration_date date NOT NULL,
	vehicle_plate varchar(10) NOT NULL,
	driver_id uuid NOT NULL,
	CONSTRAINT soat_policies_insurance_policy_key UNIQUE (insurance_policy),
	CONSTRAINT soat_policies_pkey PRIMARY KEY (id_soat),
	CONSTRAINT fk_driver_id FOREIGN KEY (driver_id) REFERENCES public.registered_drivers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT fk_vehicle_plate FOREIGN KEY (vehicle_plate) REFERENCES public.registered_vehicles(plate) ON DELETE RESTRICT ON UPDATE CASCADE
);


-- public.trips definition

-- Drop table

-- DROP TABLE public.trips;

CREATE TABLE public.trips (
	origin text NULL,
	destination text NULL,
	status text NULL,
	fare numeric NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	id uuid NOT NULL,
	passenger_id uuid NOT NULL,
	driver_id uuid NOT NULL,
	CONSTRAINT trips_pkey PRIMARY KEY (id),
	CONSTRAINT trips_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.drivers(id),
	CONSTRAINT trips_passenger_id_fkey FOREIGN KEY (passenger_id) REFERENCES public.passengers(id)
);