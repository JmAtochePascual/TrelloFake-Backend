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
            <a href="" 
               style="background-color: #6A4EE9; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
              Confirmar cuenta
            </a>
          </div>
          <p style="text-align: center; font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
            ${token}
          </p>
          <p>Si no has solicitado esta cuenta, puedes ignorar este mensaje de forma segura.</p>
          <p>Atentamente,</p>
          <p><strong>El equipo de Trello Fake</strong></p>
        </div>
      `
    });
  };
};

export default AuthEmail;