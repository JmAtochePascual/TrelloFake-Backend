import { transport } from '../config/nodemailer';

type TSendConfirmationEmail = {
  name: string
  email: string,
  token: string
}

export class AuthEmail {

  // Send a confirmation email to the user
  static async sendConfirmationEmail({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: '"UpTask MERN" <info@jmcode.dev>',
      to: email,
      subject: 'Cuenta creada correctamente',
      text: `Hola ${name}, \n\n Te has registrado correctamente en UpTask. \n\n
        Puedes iniciar sesión en https://uptask-mern.jmcode.dev/ \n\n
        Si no has creado esta cuenta, ignora este mensaje.`,
      html: `<p> Hola ${name}, \n\n Te has registrado correctamente en UpTask. \n\n
        Puedes iniciar sesión en https://uptask-mern.jmcode.dev/ \n\n
        Si no has creado esta cuenta, ignora este mensaje.</p>

        <p>Visita el siguiente enlace:</p>

        <a href="${process.env.FRONTEMD_URL}/auth/confirm-account">Confirmar cuenta</a>

        <p>Ingresa el código de confirmación <b>${token}</b></p>
        
        <p>Este token expirará en 10 minutos</p>
        `
    })
  }

  static async sendForgotPasswordEmail({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: '"UpTask MERN" <info@jmcode.dev>',
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Hola ${name}, \n\n 
        Ya puedes recuperar tu contraseña \n\n
        Si no has solicitado este cambio, ignora este mensaje.`,
      html: `<p> Hola ${name}, \n\n 
        Ya puedes recuperar tu contraseña \n\n
        Si no has solicitado este cambio, ignora este mensaje.</p>

        <p>Visita el siguiente enlace:</p>

        <a href="${process.env.FRONTEMD_URL}/auth/new-password">Reestablecer contraseña</a>

        <p>Ingresa el código de confirmación <b>${token}</b></p>
        
        <p>Este token expirará en 10 minutos</p>
        `
    })
  }
}