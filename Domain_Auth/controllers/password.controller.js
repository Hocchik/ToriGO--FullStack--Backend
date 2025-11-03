import { findUserByEmail } from '../repositories/user.repository.js';
import { createPasswordResetToken, verifyPasswordResetToken, updateUserPassword } from '../../repositories/passwordReset.repository.js';
import { sendResetTokenEmail } from '../utils/emailSender.js';
import bcrypt from 'bcrypt';

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const token = await createPasswordResetToken(user.id);
    await sendResetTokenEmail(email, token);

    res.status(200).json({ message: 'Código enviado al correo electrónico' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo enviar el código de recuperación' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await verifyPasswordResetToken(user.id, token);
    if (!valid) return res.status(400).json({ error: 'Token inválido o expirado' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, hashedPassword);

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar la contraseña' });
  }
};