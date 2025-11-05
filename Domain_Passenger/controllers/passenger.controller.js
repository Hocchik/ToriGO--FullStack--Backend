// controllers/passengerController.js
import { createPassenger, findPassengerByDNI } from '../models/Passenger.js';

export const registerPassenger = async (req, res) => {
  try {
    const { nombre, dni, edad, email, password, tutor_id } = req.body;

    // Validación de edad
    if (edad < 18 && !tutor_id) {
      return res.status(400).json({ error: 'Menores deben tener tutor registrado' });
    }

    const existing = await findPassengerByDNI(dni);
    if (existing) {
      return res.status(409).json({ error: 'DNI ya registrado' });
    }

    const newPassenger = await createPassenger({ nombre, dni, edad, email, password, tutor_id });
    res.status(201).json(newPassenger);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar pasajero' });
  }
};