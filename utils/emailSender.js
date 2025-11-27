import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendResetTokenEmail = async (to, token) => {
  dotenv.config();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // tu correo
      pass: process.env.APP_PASS    // contraseña o app password
    }
  });

  const mailOptions = {
    from: 'Mototaxi App <no-reply@mototaxi.com>',
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