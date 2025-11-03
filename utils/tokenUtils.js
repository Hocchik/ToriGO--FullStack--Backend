import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret'; // Puedes mover esto a una variable de entorno

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};