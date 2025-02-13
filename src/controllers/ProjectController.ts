import { Request, Response } from 'express';
import Project from '../models/ProjectModel';

class ProjectController {
  // Method to create a project
  static createProject = async (req: Request, res: Response) => {
    try {
      const newProject = await Project.create(req.body);
      res.status(201).json(newProject);
    } catch (error) {
      console.log(error);
    }
  }

  // Get all projects
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
    }
  }

  // Get a project by id
  static getProjectById = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProjectController;