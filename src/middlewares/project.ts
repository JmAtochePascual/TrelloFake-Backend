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
const validateIfProjectExistsById = async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate('tasks');

    if (!project) {
      res.status(404).json({ message: 'Proyecto no encontrado' });
      return;
    }

    // Check if the user is the manager of the project
    if (project.manager!.toString()! !== req.user.id.toString()) {
      res.status(403).json({ message: 'No cuentas con los permisos necesarios' });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    console.error(error);
  }
};

export default validateIfProjectExistsById;