import { createPassenger } from '../repositories/passenger.repository.js';

export const registerPassenger = async (req, res) => {
  try {
    // prefer authenticated user id if available
    const user_id = req.user?.userId || req.body.user_id || req.body.userId;
    const guardian_id = req.body.guardian_id || req.body.tutor_id || null;

    if (!user_id) return res.status(400).json({ error: 'user_id is required or authenticate the request' });

    const newPassenger = await createPassenger({ user_id, guardian_id });
    res.status(201).json(newPassenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar pasajero' });
  }
};