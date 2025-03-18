import { Request, Response } from "express";
import Project from "../models/ProjectModel";

class ProjectController {

  // Method to create a project
  static createProject = async (req: Request, res: Response) => {
    try {
      const project = new Project(req.body);

      // Assign the project to the user who created it
      project.manager = req.userId;

      await project.save();
      res.status(201).json({ message: "Proyecto creado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el proyecto" });
    }
  };

  // Method to get all projects
  static getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({ manager: req.userId }).populate('tasks');
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los proyectos" });
    }
  };

  // Method to get a project
  static getProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId).populate('tasks');

      // Check if the project exists
      if (!project) {
        res.status(404).json({ message: "Proyecto no encontrado" });
        return;
      }

      // Check if the user is the manager of the project
      if (project.manager!.toString() !== req.userId.toString()) {
        res.status(403).json({ message: "No tienes permisos para obtener este proyecto" });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el proyecto" });
    }
  };

  // Method to update a project
  static updateProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findByIdAndUpdate(projectId, req.body, { new: true });

      // Check if the project exists
      if (!project) {
        res.status(404).json({ message: "Proyecto no encontrado" });
        return;
      }

      await project.save();
      res.status(200).json({ message: "Proyecto actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el proyecto" });
    }
  };

  // Method to delete a project
  static deleteProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId);

      // Check if the project exists
      if (!project) {
        res.status(404).json({ message: "Proyecto no encontrado" });
        return;
      }

      await project.deleteOne();
      res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
  };
}

export default ProjectController;
