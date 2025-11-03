export const calculateFare = (origin, destination) => {
  // Simulación: tarifa base + distancia estimada
  const baseFare = 2.5;
  const estimatedDistance = Math.random() * 5 + 1; // km
  const fare = baseFare + estimatedDistance * 1.2;
  return parseFloat(fare.toFixed(2));
};