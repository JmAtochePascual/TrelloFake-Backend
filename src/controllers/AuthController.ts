import User from "../models/UserModel"
import { Request, Response } from "express";
import { hashPassword } from "../utils/auth";
import Token from "../models/TokenModel";
import { generateToken } from "../utils/token";


class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const { email, password } = req.body

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

      // Save the user and the token
      await Promise.allSettled([newUser.save(), token.save()])
      res.status(201).json({ message: 'Cuenta creada correctamente, revisa tu email para confirmar' })
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cuenta' })
    }
  }
}

export default AuthController