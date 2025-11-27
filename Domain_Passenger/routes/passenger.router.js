// routes/passengerRoutes.js
import express from 'express';
import { registerPassenger } from '../controllers/passenger.controller.js';

const router = express.Router();

router.post('/register', registerPassenger);

export default router;