import pool from '../config/dbConfig.js';

export const createPassenger = async ({ user_id, guardian_id = null }) => {
  const result = await pool.query(
    `INSERT INTO passengers (user_id, guardian_id) VALUES ($1, $2) RETURNING *`,
    [user_id, guardian_id]
  );
  return result.rows[0];
};

// Puedes agregar más funciones aquí según lo necesites