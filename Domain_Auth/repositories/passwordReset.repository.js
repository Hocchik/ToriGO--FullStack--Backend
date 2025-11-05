import pool from '../../config/dbConfig.js';
import crypto from 'crypto';

// Generate token and store it
export const createPasswordResetToken = async (user_id) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires_at = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  await pool.query(
    `INSERT INTO password_resets (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [user_id, token, expires_at]
  );

  return token;
};

// Validate token by user_id and token
export const verifyPasswordResetToken = async (user_id, token) => {
  const result = await pool.query(
    `SELECT * FROM password_resets WHERE user_id = $1 AND token = $2 AND expires_at > NOW()`,
    [user_id, token]
  );
  return result.rows.length > 0;
};

// Update password and clean up
export const updateUserPassword = async (user_id, hashedPassword) => {
  await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedPassword, user_id]);
  await pool.query(`DELETE FROM password_resets WHERE user_id = $1`, [user_id]);
};