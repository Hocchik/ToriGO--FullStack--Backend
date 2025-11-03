import * as authService from '../../services/auth.service.js';

// Registro de pasajeros
export const registerUser = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Registro de conductores
export const registerDriver = async (req, res) => {
  try {
    const result = await authService.registerDriver(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Inicio de sesión (para pasajeros y conductores)
export const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const selectActiveRole = async (req, res) => {
  try {
    const result = await authService.selectActiveRole(req.user, req.body.role);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to switch role' });
  }
};