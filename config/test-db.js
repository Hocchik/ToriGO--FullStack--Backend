import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mototaxi_app',
  password: process.env.DB_PASS || 'admin123', //coloquen su contraseña que iniciaron sesion en el user(postgres)
  port: process.env.PORT_DB || 5432,
});

pool.query('SELECT NOW()')
  .then(res => {
    console.log('Conexión exitosa:', res.rows[0]);
    pool.end();
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });