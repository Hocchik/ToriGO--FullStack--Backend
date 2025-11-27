import { findUserByEmail } from '../../repositories/user.repository.js';
import { createPasswordResetToken, verifyPasswordResetToken, updateUserPassword } from '../../repositories/passwordReset.repository.js';
import { sendResetTokenEmail } from '../../utils/emailSender.js';
import bcrypt from 'bcrypt';

export const requestPasswordReset = async (req, res) => {
  try {
    const {email} = req.body;

    console.log(`Este es el emailllll: ${email}`)
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

export const verifyToken = async (req, res) => {
  try{
    const {email, token} = req.body;

    const valid = await verifyPasswordResetToken(email, token);
    if (!valid) return res.status(400).json({ error: 'Token inválido o expirado' });

    return res.status(200).json({message:"Token verificado con exito"})

  }catch(e){
    console.error(`Error de verificacion de token: ${e}`);
    res.status(500).json({ error: 'No se pudo verificar el token' });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(email, hashedPassword);

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo actualizar la contraseña' });
  }
};