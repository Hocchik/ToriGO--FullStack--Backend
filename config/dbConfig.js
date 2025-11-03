import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mototaxi_app',
  password: process.env.DB_PASS || 'pokemike2005', //coloquen su contraseña que iniciaron sesion en el user(postgres)
  port: process.env.PORT_DB || 5432,
});

export default pool;