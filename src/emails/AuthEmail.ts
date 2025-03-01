import { transport } from '../config/nodemailer';

type TSendConfirmationEmail = {
  name: string
  email: string,
  token: string
}

export class AuthEmail {

  // Send a confirmation email to the user
  static async sendCreateEmail({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: 'TrelloFake',
      to: email,
      subject: 'Confirma tu cuenta en TrelloFake',
      text: `Hola ${name}, 
      ¡Bienvenido a TrelloFake! Tu cuenta ha sido creada con éxito. 
      Para completar tu registro y acceder a todas las funcionalidades, confirma tu cuenta haciendo clic en el siguiente enlace:
      ${process.env.FRONTEMD_URL}/auth/confirm-account
      También puedes ingresar el siguiente código de confirmación en la aplicación: ${token}
      Ten en cuenta que este código expirará en 10 minutos.
      Si no has solicitado esta cuenta, ignora este mensaje.
      Saludos, 
      El equipo de TrelloFake`,

      html: `
        <p>Hola <strong>${name}</strong>,</p> 
        <p>¡Bienvenido a <strong>TrelloFake</strong>! Tu cuenta ha sido creada con éxito.</p>
        <p>Para completar tu registro y acceder a todas las funcionalidades, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
        <p>
          <a href="${process.env.FRONTEMD_URL}/auth/confirm-account" style="background-color:#6C63FF; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
          Confirmar cuenta
          </a>
        </p>
        <h2 style="text-align:left; color:#333;">${token}</h2>
        <p>Este código expirará en <strong>10 minutos</strong>.</p>
        <p>Si no has solicitado esta cuenta, puedes ignorar este mensaje.</p>
        <p>Saludos,<br>El equipo de TrelloFake</p>
      `
    })
  }

  // Send a confirmation email to the user
  static async sendResendConfirmationEmail({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: 'TrelloFake',
      to: email,
      subject: '!Confirma tu cuenta en TrelloFake para acceder!',
      text: `Hola ${name}, 
      Notamos que intentaste iniciar sesión en TrelloFake, pero tu cuenta aún no ha sido confirmada. 
      Para activarla y acceder a todas las funcionalidades, confirma tu cuenta haciendo clic en el siguiente enlace:
      ${process.env.FRONTEMD_URL}/auth/confirm-account
      Tambien puedes ingresar el siguiente código de confirmación en la aplicación: ${token}
      Ten en cuenta que este código expirará en 10 minutos.
      Si no has solicitado esta cuenta, puedes ignorar este mensaje.
      Saludos, 
      El equipo de TrelloFake`,

      html: `
        <p>Hola <strong>${name}</strong>,</p> 
        <p>Notamos que intentaste iniciar sesión en <strong>TrelloFake</strong>, pero tu cuenta aún no ha sido confirmada.</p>
        <p>Para activarla y acceder a todas las funcionalidades, confirma tu cuenta haciendo clic en el siguiente botón:</p>
        <p>
          <a href="${process.env.FRONTEMD_URL}/auth/confirm-account" style="background-color:#6C63FF; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
          Confirmar cuenta
          </a>
        </p>
        <h2 style="text-align:left; color:#333;">${token}</h2>
        <p>Este código expirará en <strong>10 minutos</strong>.</p>
        <p>Si no has solicitado esta confirmación de cuenta, puedes ignorar este mensaje.</p>
        <p>Saludos,<br><strong>El equipo de TrelloFake</strong></p>
      `
    });
  }

  // Send a new confirmation token to confirm the account
  static async sendNewConfirmationToken({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: 'TrelloFake',
      to: email,
      subject: '¡Nuevo código de confirmación para TrelloFake!',
      text: `Hola ${name}, 
      Has solicitado un nuevo código de confirmación para activar tu cuenta en TrelloFake. 
      Para completarlo, confirma tu cuenta haciendo clic en el siguiente enlace:
      ${process.env.FRONTEMD_URL}/auth/confirm-account
      También puedes ingresar el siguiente código de confirmación en la aplicación: ${token}
      Ten en cuenta que este código expirará en 10 minutos.
      Si no has solicitado este código, puedes ignorar este mensaje.
      Saludos, 
      El equipo de TrelloFake`,

      html: `
        <p>Hola <strong>${name}</strong>,</p> 
        <p>Has solicitado un nuevo código de confirmación para activar tu cuenta en <strong>TrelloFake</strong>.</p>
        <p>Para completar el proceso, confirma tu cuenta haciendo clic en el siguiente botón:</p>
        <p>
          <a href="${process.env.FRONTEMD_URL}/auth/confirm-account" style="background-color:#6C63FF; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
          Confirmar cuenta
          </a>
        </p>
        <h2 style="text-align:left; color:#333;">${token}</h2>
        <p>Este código expirará en <strong>10 minutos</strong>.</p>
        <p>Si no has solicitado este código, puedes ignorar este mensaje.</p>
        <p>Saludos,<br><strong>El equipo de TrelloFake</strong></p>
      `
    });
  }

  // Send a forgot password email
  static async sendForgotPasswordEmail({ name, email, token }: TSendConfirmationEmail) {
    await transport.sendMail({
      from: 'TrelloFake',
      to: email,
      subject: 'Recupera tu contraseña en TrelloFake',
      text: `Hola ${name}, 
      Has solicitado restablecer tu contraseña en TrelloFake. 
      Para continuar con el proceso, utiliza el siguiente código de verificación en la aplicación: 
      ${token}
      También puedes restablecer tu contraseña haciendo clic en el siguiente enlace:
      ${process.env.FRONTEMD_URL}/auth/forgot-password
      Ten en cuenta que este código expirará en 10 minutos.
      Si no has solicitado este restablecimiento, puedes ignorar este mensaje.
      Saludos, 
      El equipo de TrelloFake`,

      html: `
        <p>Hola <strong>${name}</strong>,</p> 
        <p>Has solicitado restablecer tu contraseña en <strong>TrelloFake</strong>.</p>
        <p>Para continuar con el proceso, utiliza el siguiente código de verificación en la aplicación:</p>
        <h2 style="text-align:left; color:#333;">${token}</h2>
        <p>O puedes restablecer tu contraseña haciendo clic en el siguiente botón:</p>
        <p>
          <a href="${process.env.FRONTEMD_URL}/auth/forgot-password" style="background-color:#6C63FF; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
          Restablecer contraseña
          </a>
        </p>
        <p>Este código expirará en <strong>10 minutos</strong>.</p>
        <p>Si no has solicitado este restablecimiento, puedes ignorar este mensaje.</p>
        <p>Saludos,<br><strong>El equipo de TrelloFake</strong></p>
      `
    });
  }
}