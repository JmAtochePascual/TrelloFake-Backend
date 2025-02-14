import { Request, Response, NextFunction } from 'express';
import Task, { TaskType } from '../models/TaskModel';

// Extend the Request interface to include the task property
declare global {
  namespace Express {
    interface Request {
      task: TaskType;
    }
  }
}

// Validate if a task exists
const validateTaskExistsById = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId).where({ project: req.project.id }).populate('project');

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    req.task = task;
    next();

  } catch (error) {
    console.error(error);
  }
};

export default validateTaskExistsById;