import { Request, Response } from "express";
import Project from "../models/ProjectModel";

class ProjectController {
  // Method to create a project
  static createProject = async (req: Request, res: Response) => {
    try {
      await Project.create(req.body);
      res.status(201).json({ message: "Proyecto creado correctamente" });
    } catch (error) {
      console.log(error);
    }
  };

  // Get all projects
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  // Get a project by id
  static getProjectById = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.project);
    } catch (error) {
      console.log(error);
    }
  };

  // Update a project by id
  static updateProjectById = async (req: Request, res: Response) => {
    try {
      req.project.projectName = req.body.projectName;
      req.project.clientName = req.body.clientName;
      req.project.description = req.body.description;
      await req.project.save();
      res.status(200).json({ message: "Proyecto actualizado" });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a project by id
  static deleteProjectById = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne();
      res.status(200).json({ message: "Proyecto eliminado" });
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProjectController;
