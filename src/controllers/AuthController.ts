import User from "../models/UserModel"
import { Request, Response } from "express";

class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const newUser = new User(req.body)
      await newUser.save()
      res.send('Cuenta creada correctamente')
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthController