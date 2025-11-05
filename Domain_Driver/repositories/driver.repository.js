import pool from '../../config/dbConfig.js';
import crypto from 'crypto';

export const createDriver = async (driver) => {
  const {user_id, license_number, plate} = driver;
  const id = crypto.randomUUID();
  const result = await pool.query(
    `INSERT INTO drivers (license, plate, id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [license_number, plate, id, user_id]
  );
  return result.rows[0];
};

export const finbyId = async (id) => {
  const result = await pool.query(
    `SELECT id FROM drivers WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// Puedes agregar más funciones aquí según lo necesites

export const validateDriverData = async(dni, license_number, plate, name, last_name) => {
  // Validar que el DNI del conductor exista
  const driverResult = await pool.query(
    `SELECT * FROM registered_drivers WHERE dni = $1 AND name = $2 AND last_name = $3`,
    [dni, name, last_name]
  );

  if (driverResult.rowCount === 0) {
    throw new Error(
      "Los datos proporcionados (dni, nombre y apellido) no figuran en la base de datos de la SUNARP. Verifique que los datos sean correctos."
    );
  }

  // Validar que la licencia del conductor esté registrada en la bd
  const driverId = driverResult.rows[0].id;

  const driverLicenseResult = await pool.query(
    `SELECT * FROM drivers_license WHERE id_registered_driver = $1 AND license_number = $2`,
    [driverId, license_number]
  );

  if(driverLicenseResult.rowCount === 0) {
    throw new Error(`El conductor con id ${driverId} no tiene licencia de conducir registrada`)
  }

  // Validar que la licencia no haya vencido
  const licenseExpirationDate = new Date(driverLicenseResult.rows[0].expiration_date);
  const currentDate = new Date();
  
  // Establecer ambas fechas (actual y la fecha de expiracion de la licencia)
  // para una mejor comparacion
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const expiration = new Date(licenseExpirationDate.getFullYear(), licenseExpirationDate.getMonth(), licenseExpirationDate.getDate());

  if (expiration < today) {
    throw new Error(`La licencia ${license} venció el ${licenseExpirationDate.toLocaleDateString()}`);
  }

  // Validar que la placa del vehiculo le pertenezca al conductor

  const vehicleResult = await pool.query(
    `SELECT * FROM registered_vehicles WHERE driver_id = $1 AND plate = $2`,
    [driverId, plate]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error('La placa no pertenece a la licencia proporcionada.');
  }

  // Todo correcto
  return true;
}