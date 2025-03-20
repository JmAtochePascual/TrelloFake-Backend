import type { Request, Response } from "express";
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
      res.status(500).json({ message: "Error al buscar el usuario" });
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
        res.status(409).json({ message: "El usuario ya está en el proyecto" });
        return;
      }

      // Add user to team
      req.project.team.push(user.id);
      await req.project.save();

      res.status(200).json({ message: "Miembro agregado al proyecto correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al agregar el miembro al proyecto" });
    }
  }

  // Method to get all members of the team
  static async getTeam(req: Request, res: Response) {
    try {
      // Get the project by ID
      const project = await Project.findById(req.project.id).populate({
        path: "team",
        select: "id name email"
      });

      // Check if the project exists
      if (!project) {
        res.status(404).json({ message: "Proyecto no encontrado" });
        return;
      }

      res.status(200).json(project.team);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el equipo" });
    }
  }

  // Method to delete a user from the team
  static async removeMemberFromTeam(req: Request, res: Response) {
    const { memberId } = req.params as { memberId: any };

    try {
      // Check if the user is already in the team
      if (!req.project.team.includes(memberId)) {
        res.status(400).json({ message: "El usuario no está en el proyecto" });
        return;
      }

      // Remove user from team
      req.project.team = req.project.team.filter((member) => member && member.toString() !== memberId.toString());
      await req.project.save();

      res.status(200).json({ message: "Miembro eliminado del proyecto correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el miembro del proyecto" });
    }
  }
};

export default TeamController;