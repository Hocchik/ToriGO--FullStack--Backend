import express from 'express';
import { registerUser, registerDriver, loginUser, selectActiveRole } from '../controllers/auth.controller.js';
import { verifyLicense, verifySoat } from '../../Domain_Driver/repositories/driver.repository.js';
import { authenticate } from '../middlewares/auth.middleware.js';

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
 * @desc Registrar nuevo pasajero
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route POST /api/auth/register/driver
 * @desc Registrar nuevo conductor (verifica licencia y SOAT antes de crear usuario)
 * @access Public
 * @body { name, last_name, dni, plate, license_number, license_expiration_date, insurance_policy_number, insurance_policy_expiration_date, email, phone, password }
 * @returns { status, valid, data }
 */
router.post('/register/driver', registerDriver);

/**
 * @route POST /api/auth/verify-license
 * @desc Verifica la licencia de conducir
 * @access Public
 * @body { license_number, license_expiration_date }
 */
router.post('/verify-license', async (req, res) => {
	const { license_number, license_expiration_date, name, last_name } = req.body;
	const result = await verifyLicense(license_number, license_expiration_date, name, last_name);
	res.status(result.valid ? 200 : 400).json(result);
});

/**
 * @route POST /api/auth/verify-soat
 * @desc Verifica el SOAT
 * @access Public
 * @body { insurance_policy_number, insurance_policy_expiration_date }
 */
router.post('/verify-soat', async (req, res) => {
	const { insurance_policy_number, insurance_policy_expiration_date, plate } = req.body;
	const result = await verifySoat(insurance_policy_number, insurance_policy_expiration_date, plate);
	res.status(result.valid ? 200 : 400).json(result);
});




export default router;