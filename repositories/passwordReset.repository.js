import pool from '../config/dbConfig.js';
import crypto from 'crypto';

// Generate token and store it
export const createPasswordResetToken = async (user_id) => {
  const token = crypto.randomBytes(3).toString('hex');
  const expires_at = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  await pool.query(
    `INSERT INTO password_resets (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [user_id, token, expires_at]
  );

  return token;
};

// Validate token by user_id and token
export const verifyPasswordResetToken = async (email, token) => {
  const result1 = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const idUser = result1.rows[0].id;

  const result = await pool.query(
    `SELECT * FROM password_resets WHERE user_id = $1 AND token = $2 AND expires_at > NOW()`,
    [idUser, token]
  );
  return result.rows.length > 0;
};

// Update password and clean up
export const updateUserPassword = async (email, hashedPassword) => {
  const userId = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );
  const user_id = userId.rows[0].id;
  await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedPassword, user_id]);
  await pool.query(`DELETE FROM password_resets WHERE user_id = $1`, [user_id]);
};