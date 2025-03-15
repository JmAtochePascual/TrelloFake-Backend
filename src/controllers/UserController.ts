import { Request, Response } from "express";
import User from "../models/UserModel";
import { hashPassword } from "../utils/auth";

class UserController {

  // Create a new user
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (user) {
        res.status(409).json({ message: "El usuario ya existe" });
        return;
      }

      // Create the user
      const newUser = new User({ name, email, password });

      // Hash the password
      newUser.password = await hashPassword(password);

      // Save the user
      await newUser.save();
      res.status(201).json({ message: "Revisa tu correo electrónico para confirmar" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  }

  // Get a user by ID
  static async getUser(req: Request, res: Response) {
    try {
      res.send("Obtener un usuario");
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  // Update a user by ID
  static async updateUser(req: Request, res: Response) {
    try {
      res.send("Usuario actualizado correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  }

  // Delete a user by ID
  static async deleteUser(req: Request, res: Response) {
    try {
      res.send("Usuario eliminado correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }

  // Login a user
  static async login(req: Request, res: Response) {
    try {
      res.send("Login a user");
    } catch (error) {
      res.status(500).json({ message: "Error al login el usuario" });
    }
  }

  // Logout a user
  static async logout(req: Request, res: Response) {
    try {
      res.send("Logout a user");
    } catch (error) {
      res.status(500).json({ message: "Error al logout el usuario" });
    }
  }

}

export default UserController;