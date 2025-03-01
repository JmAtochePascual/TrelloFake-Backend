import { Request, Response } from "express";
import User from "../models/UserModel"
import Token from "../models/TokenModel";
import { hashPassword, comparePassword } from '../utils/auth';
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";


class AuthController {

  //  Create a new user
  static async createAccount(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body

      // Validate duplicate email
      const user = await User.findOne({ email })
      if (user) {
        res.status(409).json({ message: 'El email ya esta registrado' })
        return;
      }

      // Create a user
      const newUser = new User(req.body)

      // Hash the password
      newUser.password = await hashPassword(password)

      // Create a token
      const token = new Token({
        token: generateToken(),
        user: newUser.id
      });

      // Send the email
      await AuthEmail.sendCreateEmail({ name, email, token: token.token });

      // Save the user and the token
      await Promise.allSettled([newUser.save(), token.save()])
      res.status(201).json({ message: 'Cuenta creada correctamente, revisa tu email' })
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cuenta' })
    }
  }

  // Login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return;
      }

      // Check if the user is confirmed
      if (!user.confirm) {

        // Create a token
        const token = new Token({
          token: generateToken(),
          user: user.id
        });

        await AuthEmail.sendResendConfirmationEmail({ name: user.name, email, token: token.token });

        await token.save()
        res.status(403).json({ message: 'Cuenta no confirmada, hemos enviado un email de confirmación' })
        return;
      }

      // Check the password 
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Contraseña incorrecta' })
        return;
      }

      res.status(200).json({ message: 'Logueado correctamente' });
    } catch (error) {
      console.log(error)
    }
  }

  // Confirm an account by token
  static async confirmAccount(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const tokenDB = await Token.findOne({ token });

      if (!tokenDB) {
        res.status(404).json({ message: 'Token no encontrado' })
        return;
      }

      // Search the user
      const user = await User.findById(tokenDB.user);

      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return;
      }

      // Confirm the account
      user.confirm = true
      await Promise.allSettled([user.save(), tokenDB.deleteOne()])
      res.status(200).json({ message: 'Cuenta confirmada correctamente' })
    } catch (error) {
      console.log(error)
    }
  }

  // Resend confirmation token
  static async resendConfirmationToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return;
      }

      // Check if the user is confirmed
      if (user.confirm) {
        res.status(403).json({ message: 'La cuenta ya esta confirmada' })
        return;
      }

      // Create a new token
      const token = new Token({
        token: generateToken(),
        user: user.id
      });

      // Send the email
      await AuthEmail.sendNewConfirmationToken({ name: user.name, email: user.email, token: token.token });
      await token.save()
      res.status(200).json({ message: 'Se envió un nuevo token de confirmación, revisa tu email' })
    } catch (error) {
      console.log(error)
    }
  }

  // Forgot password
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return;
      }

      // Create a new token
      const token = new Token({
        token: generateToken(),
        user: user.id
      });

      // Send the email
      await AuthEmail.sendForgotPasswordEmail({ name: user.name, email: user.email, token: token.token });
      await token.save()
      res.status(200).json({ message: 'Revisa tu email y sigue las instrucciones' })
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthController