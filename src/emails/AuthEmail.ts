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

        <a href="https://uptask-mern.jmcode.dev/confirmar/${token}">Confirmar cuenta</a>

        <p>Ingresa el código de confirmación <b>${token}</b></p>
        
        <p>Este token expirará en 10 minutos</p>
        `
    })
  }
}