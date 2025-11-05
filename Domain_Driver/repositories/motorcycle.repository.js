import pool from '../../config/dbConfig.js';

export const registerMotorcycle = async ({ driver_id, plate, color, soat, license }) => {
  const result = await pool.query(
    `INSERT INTO motorcycles (driver_id, plate, color, soat, license)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [driver_id, plate, color, soat, license]
  );
  return result.rows[0];
};

export const getMotorcycleByDriver = async (driver_id) => {
  const result = await pool.query(
    `SELECT * FROM motorcycles WHERE driver_id = $1`,
    [driver_id]
  );
  return result.rows[0];
};