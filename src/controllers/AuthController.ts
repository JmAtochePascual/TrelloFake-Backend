import User from "../models/UserModel"
import { Request, Response } from "express";
import { hashPassword } from "../utils/auth";


class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const newUser = new User(req.body)

      // Hash the password
      newUser.password = await hashPassword(newUser.password)
      await newUser.save()
      res.status(201).json({ message: 'Cuenta creada correctamente, revisa tu email para confirmar' })
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cuenta' })
    }
  }
}

export default AuthController