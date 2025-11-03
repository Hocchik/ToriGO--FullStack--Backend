import fs from 'fs';
import path from 'path';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import pool from './config/dbConfig.js';
import authRoutes from './routes/auth/auth.routes.js';
import tripRoutes from './routes/trip/trip.routes.js';
import motorcycleRoutes from './routes/driver/motorcycle.routes.js';
import passwordRoutes from './routes/auth/password.routes.js';
import testRoutes from './routes/dbTest.routes.js';

import swaggerUi from 'swagger-ui-express';

const swaggerPath = path.resolve('./test/swagger/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas HTTP
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/test', testRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
//const pgpInstance = pgp();
//const db = pgp('postgresql://localhost:5432/mototaxi_app?postgres');