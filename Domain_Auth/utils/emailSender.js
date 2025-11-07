import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendResetTokenEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // tu correo
      pass: process.env.APP_PASS, // app password
    }
  });

  const mailOptions = {
    from: 'ToriGo <no-reply@mototaxi.com>',
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Hola,</p>
      <p>Has solicitado recuperar tu contraseña. Usa el siguiente código para continuar:</p>
      <h2>${token}</h2>
      <p>Este código expira en 15 minutos.</p>
      <p>Si no solicitaste esto, ignora este mensaje.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};