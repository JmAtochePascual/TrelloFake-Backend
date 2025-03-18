import { Request, Response } from "express";
import User from "../models/UserModel";
import Project from "../models/ProjectModel";

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

  // Method to add a user to the team
  static async addMemberToTeam(req: Request, res: Response) {
    const { id } = req.body;

    try {
      // Check if user exists
      const user = await User.findById(id).select("id");
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      };

      // Check if the user is already in the team
      if (req.project.team.includes(user.id)) {
        res.status(400).json({ message: "El usuario ya está en el equipo" });
        return;
      }

      // Add user to team
      req.project.team.push(id);
      await req.project.save();

      res.status(200).json({ message: "Miembro agregado al equipo correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al agregar el miembro al equipo" });
    }
  }

  // Method to delete a user from the team
  static async removeMemberFromTeam(req: Request, res: Response) {
    const { id } = req.body;

    try {
      // Check if the user is already in the team
      if (!req.project.team.includes(id)) {
        res.status(400).json({ message: "El usuario no está en el equipo" });
        return;
      }

      // Remove user from team
      req.project.team = req.project.team.filter((member) => member && member.toString() !== id.toString());
      await req.project.save();

      res.status(200).json({ message: "Miembro eliminado del equipo correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el miembro del equipo" });
    }
  }
};

export default TeamController;