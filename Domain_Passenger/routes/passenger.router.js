// routes/passengerRoutes.js
import express from 'express';
import { registerPassenger } from '../../controllers/passenger/passengerController.js';

const router = express.Router();

router.post('/register', registerPassenger);

export default router;