import pool from '../../config/dbConfig.js';
import crypto from 'crypto';

export const createDriver = async (driver) => {
  const { user_id, license_number, plate } = driver;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Insert into drivers table
    const driverRes = await client.query(
      `INSERT INTO drivers (user_id, driver_license) VALUES ($1, $2) RETURNING *`,
      [user_id, license_number]
    );
    const createdDriver = driverRes.rows[0];

    // Insert associated motorcycle (plate belongs to motorcycles table)
    const motoRes = await client.query(
      `INSERT INTO motorcycles (driver_id, plate) VALUES ($1, $2) RETURNING *`,
      [createdDriver.id, plate]
    );
    const createdMotorcycle = motoRes.rows[0];

    await client.query('COMMIT');

    // return combined object for convenience
    return { ...createdDriver, motorcycle: createdMotorcycle };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const findById = async (id) => {
  const result = await pool.query(
    `SELECT id FROM drivers WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const findByUserId = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM drivers WHERE user_id = $1`,
    [user_id]
  );
  return result.rows[0];
};

export const setDriverAvailability = async (driver_id, availability) => {
  const result = await pool.query(
    `UPDATE drivers SET availability = $1 WHERE id = $2 RETURNING *`,
    [availability, driver_id]
  );
  return result.rows[0];
};

// Verifica que la licencia exista y no esté vencida
export const verifyLicense = async (license_number, license_expiration_date, name, last_name) => {
  try {
    // Validación defensiva de parámetros
    if (!name || !last_name) {
      console.error('Faltan nombre o apellido en la petición');
      return { valid: false, error: 'Faltan nombre o apellido en la petición' };
    }
    const firstName = name.split(' ')[0];
    const firstLastName = last_name.split(' ')[0];
    // Buscar licencia y datos del conductor
    const result = await pool.query(
      `SELECT l.expiration_date, d.name, d.last_name FROM drivers_license l JOIN registered_drivers d ON l.registered_driver_id = d.id WHERE l.license_number = $1`,
      [license_number]
    );
    if (result.rowCount === 0) {
      console.error('Licencia no encontrada');
      return { valid: false, error: 'Licencia no encontrada' };
    }
    // Validación defensiva de datos de la base
    const dbName = result.rows[0].name;
    const dbLastName = result.rows[0].last_name;
    if (!dbName || !dbLastName) {
      console.error('Nombre o apellido no encontrados en la base de datos');
      return { valid: false, error: 'Nombre o apellido no encontrados en la base de datos' };
    }
    const dbExpiration = new Date(result.rows[0].expiration_date);
    const inputExpiration = new Date(license_expiration_date);
    // Comparar nombre y apellido
    if (dbName.split(' ')[0] !== firstName || dbLastName.split(' ')[0] !== firstLastName) {
      console.error('Nombre o apellido no coinciden con el registrado en la licencia');
      return { valid: false, error: 'Nombre o apellido no coinciden con el registrado en la licencia' };
    }
    // Comparar solo YYYY-MM-DD
    const dbDateStr = dbExpiration.toISOString().slice(0, 10);
    const inputDateStr = inputExpiration.toISOString().slice(0, 10);
    if (dbDateStr !== inputDateStr) {
      console.error('La fecha de expiración no coincide con la registrada');
      return { valid: false, error: 'La fecha de expiración no coincide con la registrada' };
    }
    if (dbExpiration < new Date()) {
      console.error('La licencia está vencida');
      return { valid: false, error: 'La licencia está vencida' };
    }
    return { valid: true };
  } catch (err) {
    console.error('Error al verificar la licencia:', err);
    return { valid: false, error: 'Error al verificar la licencia' };
  }
};

// Verifica que el SOAT exista y no esté vencido
export const verifySoat = async (insurance_policy_number, insurance_policy_expiration_date, plate) => {
  try {
    const result = await pool.query(
      `SELECT expiration_date, vehicle_plate FROM soat_policies WHERE insurance_policy = $1`,
      [insurance_policy_number]
    );
    if (result.rowCount === 0) {
      console.error('SOAT no encontrado');
      return { valid: false, error: 'SOAT no encontrado' };
    }
    const dbExpiration = new Date(result.rows[0].expiration_date);
    const inputExpiration = new Date(insurance_policy_expiration_date);
    // Comparar placa
    if (result.rows[0].vehicle_plate !== plate) {
      console.log("Placa", plate);
      console.log("Placa registrada", result.rows[0].vehicle_plate);
      console.error('La placa no coincide con la registrada en el SOAT');
      return { valid: false, error: 'La placa no coincide con la registrada en el SOAT' };
    }
    // Comparar solo YYYY-MM-DD
    const dbDateStr = dbExpiration.toISOString().slice(0, 10);
    const inputDateStr = inputExpiration.toISOString().slice(0, 10);
    if (dbDateStr !== inputDateStr) {
      console.error('La fecha de expiración no coincide con la registrada');
      return { valid: false, error: 'La fecha de expiración no coincide con la registrada' };
    }
    if (dbExpiration < new Date()) {
      console.error('El SOAT está vencido');
      return { valid: false, error: 'El SOAT está vencido' };
    }
    return { valid: true };
  } catch (err) {
    console.error('Error al verificar el SOAT:', err);
    return { valid: false, error: 'Error al verificar el SOAT' };
  }
};

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
    `SELECT * FROM drivers_license WHERE registered_driver_id = $1 AND license_number = $2`,
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
    throw new Error(`La licencia ${license_number} venció el ${licenseExpirationDate.toLocaleDateString()}`);
  }

  // Validar que la placa del vehiculo le pertenezca al conductor

  const vehicleResult = await pool.query(
    `SELECT * FROM registered_vehicles WHERE registered_owner_id = $1 AND plate = $2`,
    [driverId, plate]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error('La placa no pertenece a la licencia proporcionada.');
  }

  // Todo correcto
  return true;
}