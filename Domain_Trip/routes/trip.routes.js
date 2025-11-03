import express from 'express';
import { requestTrip, acceptTrip, completeTrip, getUserTrips } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/accept', acceptTrip);
router.post('/complete', completeTrip);
router.get('/history', getUserTrips);
router.post('/request', requestTrip);

const isDriverValid = async (driverId) => {
  const driver = await Driver.findById(driverId);
  return driver.soatValid && driver.breveteValid && driver.age >= 18;
};

router.post('/trip/start', async (req, res) => {
    const valid = await isDriverValid(req.body.driverId);
  if (!valid) return res.status(403).json({ error: 'Conductor no cumple requisitos legales' });
  const { driverId, passengerId, origin, destination } = req.body;
  const trip = await Trip.create({
    driverId,
    passengerId,
    origin,
    destination,
    status: 'active',
    startedAt: new Date(),
  });
  res.json(trip);
});


export default router;