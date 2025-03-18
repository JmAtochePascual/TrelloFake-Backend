import { Request, Response } from "express";
import User from "../models/UserModel";

class TeamController {

  // Method to find a user by email
  static async findMenberByEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      // Find the user
      const user = await User.findOne({ email }).select("id name email");

      // Check if the user exists
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el miembro del equipo" });
    }
  }
};

export default TeamController;