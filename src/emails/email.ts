import transporter from "../config/transporter";

type TAuthEmail = {
  email: string;
  name: string;
  token: string
}

class AuthEmail {

  // Email to create an user
  static async sendCreateUserEmail({ email, name, token }: TAuthEmail) {
    await transporter.sendMail({
      from: '"Trello Fake" <trello@fake.com>',
      to: email,
      subject: "Verificación de cuenta en Trello Fake",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #6A4EE9; text-align: center;">Bienvenido a Trello Fake</h2>
          <p>Estimado/a ${name},</p>
          <p>Gracias por registrarte en Trello Fake. Para completar el proceso de verificación y activar tu cuenta, sigue estos pasos:</p>
          <ul>
            <li>Haz clic en el siguiente botón para acceder a la página de confirmación.</li>
            <li>Introduce el siguiente código de verificación en la página correspondiente:</li>
          </ul>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEMD_URL}/auth/confirm-user" 
               style="background-color: #6A4EE9; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
              Confirmar cuenta
            </a>
          </div>
          <p style="text-align: center; font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
            ${token}
          </p>
          <p>Si no has solicitado esta cuenta, puedes ignorar este mensaje de forma segura.</p>
          <p style="font-size: 12px; color: #777;">Atentamente,</p>
          <p style="font-size: 12px; color: #777;"><strong>El equipo de Trello Fake</strong></p>
        </div>
      `
    });
  };

  // Email to inform the user that his login attempt was successful
  static async sendUnverifiedLoginEmail({ email, name, token }: TAuthEmail) {
    await transporter.sendMail({
      from: '"Trello Fake" <trello@fake.com>',
      to: email,
      subject: "Intento de inicio de sesión en Trello Fake",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #E94E4E; text-align: center;">Verificación pendiente</h2>
          <p>Estimado/a ${name},</p>
          <p>Hemos detectado un intento de inicio de sesión en Trello Fake, pero tu cuenta aún no ha sido confirmada.</p>
          <p>Para poder acceder a tu cuenta, es necesario completar la verificación. Sigue estos pasos:</p>
          <ul>
            <li>Haz clic en el siguiente botón para acceder a la página de confirmación.</li>
            <li>Introduce el código de verificación en la página correspondiente:</li>
          </ul>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEMD_URL}/auth/confirm-user" 
               style="background-color: #6A4EE9; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
              Confirmar cuenta
            </a>
          </div>
          <p style="text-align: center; font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
            ${token}
          </p>
          <p>Si no has intentado iniciar sesión, puedes ignorar este mensaje.</p>
          <p style="font-size: 12px; color: #777;">Atentamente,</p>
          <p style="font-size: 12px; color: #777;"><strong>El equipo de Trello Fake</strong></p>
        </div>
      `
    });
  };
};

export default AuthEmail;