import { Request, Response } from 'express';
import Project from '../models/ProjectModel';

class ProjectController {
  // Method to create a project
  static createProject = async (req: Request, res: Response) => {
    try {
      await Project.create(req.body);
      res.send('Project created successfully');
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProjectController;