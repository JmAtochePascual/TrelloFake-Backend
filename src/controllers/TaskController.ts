import { Request, Response } from 'express';
import Task from '../models/TaskModel';

class TaskController {

  // Create a new task to a project
  static createTask = async (req: Request, res: Response) => {
    const { project } = req;

    try {
      const newTask = new Task({ ...req.body, project: project.id });
      project.tasks.push(newTask.id);
      await Promise.allSettled([newTask.save(), project.save()]);
      res.status(201).json(newTask);

    } catch (error) {
      console.error(error);
    }
  }
}

export default TaskController;