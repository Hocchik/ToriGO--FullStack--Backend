import pool from '../../config/dbConfig.js';

export const getUserRoles = async (user_id) => {
  const roles = [];

  const passenger = await pool.query(`SELECT id FROM passengers WHERE user_id = $1`, [user_id]);
  if (passenger.rows.length > 0) roles.push('passenger');

  const driver = await pool.query(`SELECT id FROM drivers WHERE user_id = $1`, [user_id]);
  if (driver.rows.length > 0) roles.push('driver');

  return roles;
};