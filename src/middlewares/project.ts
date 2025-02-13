import { Request, Response, NextFunction } from 'express';
import Project from '../models/ProjectModel';
import { ProjectType } from '../models/ProjectModel';

// Extend the Request interface to include the project property
declare global {
  namespace Express {
    interface Request {
      project: ProjectType;
    }
  }
}

// Validate if the project exists
export const validateProjectExists = async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    console.log(project);

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    console.error(error);
  }
};