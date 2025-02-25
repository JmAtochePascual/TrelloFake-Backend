import { Request, Response } from "express";
import User from "../models/UserModel"
import Token from "../models/TokenModel";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { transport } from "../config/nodemailer";
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
        user: newUser._id
      });

      // Send the email
      await AuthEmail.sendConfirmationEmail({ name, email, token: token.token });

      // Save the user and the token
      await Promise.allSettled([newUser.save(), token.save()])
      res.status(201).json({ message: 'Cuenta creada correctamente, revisa tu email' })
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cuenta' })
    }
  }
}

export default AuthController