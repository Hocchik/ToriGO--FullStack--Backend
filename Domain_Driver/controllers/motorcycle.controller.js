import { registerMotorcycle, getMotorcycleByDriver } from '../../repositories/motorcycle.repository.js';

export const createMotorcycle = async (req, res) => {
  try {
    const { driver_id, plate, color, soat, license } = req.body;
    const moto = await registerMotorcycle({ driver_id, plate, color, soat, license });
    res.status(201).json({ message: 'Motorcycle registered', moto });
  } catch (err) {
    res.status(500).json({ error: 'Motorcycle registration failed' });
  }
};

export const getDriverMotorcycle = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const moto = await getMotorcycleByDriver(driver_id);
    if (!moto) return res.status(404).json({ error: 'No motorcycle found' });
    res.status(200).json({ moto });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch motorcycle' });
  }
};