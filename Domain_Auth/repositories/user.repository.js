import pool from '../../config/dbConfig.js';

export const createUser = async ({ name, last_name, dni, age, email, phone, password, role }) => {
  const id = crypto.randomUUID(); 
  const result = await pool.query(
    `INSERT INTO users (id, name, last_name, dni, phone, email, age, password, role)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [id, name, last_name, dni, phone, email, age, password, role]
  );
  console.log("resultado:......",result);
  return result.rows[0];
};

/* export const logIn = async (email, password) => {
  const result = await pool.query(
    `SELECT name, last_name, email, password, role FROM users WHERE email = $1`,
  );
} */

export const findUserByDNI = async (dni) => {
  const result = await pool.query(`SELECT * FROM users WHERE dni = $1`, [dni]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const findUserByPhone = async (phone) => {
  const result = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
  return result.rows[0];
};

export const findUserByEmailOrPhone = async (identifier) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 OR phone = $1',
    [identifier]
  );
  return result.rows[0];
};