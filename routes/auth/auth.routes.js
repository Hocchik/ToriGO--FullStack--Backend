import express from 'express';
import { registerUser, registerDriver, loginUser, selectActiveRole } from '../../controllers/auth/auth.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return roles or token
 * @access Public
 */
router.post('/login', loginUser);
/*

router.post('/select-role', authenticate, selectActiveRole);
*/

/**
 * @route POST /api/auth/register
 * @desc Register new user with role
 * @access Public
 */

//Ruta para registrar pasajeros
router.post('/register', registerUser);


// Ruta para registrar conductores
router.post('/register/driver', registerDriver);


export default router;