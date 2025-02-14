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

  // Get all tasks from a project
  static getAllTasks = async (req: Request, res: Response) => {
    const { project } = req;

    try {
      const tasks = await Task.find({ project: project.id }).populate('project');
      res.status(200).json(tasks);

    } catch (error) {
      console.error(error);
    }
  }

  // Get a task by ID from a project
  static getTaskById = async (req: Request, res: Response) => {
    const { project } = req;
    const { taskId } = req.params;

    try {
      const task = await Task.findById(taskId).where({ project: project.id });

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);

    } catch (error) {
      console.error(error);
    }
  }

  // Update a task by ID from a project
  static updateTask = async (req: Request, res: Response) => {
    const { project } = req;
    const { taskId } = req.params;

    try {
      const task = await Task.findByIdAndUpdate(taskId, req.body).where({ project: project.id });

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);

    } catch (error) {
      console.error(error);
    }
  }

  // Delete a task by ID from a project
  static deleteTask = async (req: Request, res: Response) => {
    const { project } = req;
    const { taskId } = req.params;

    try {
      const task = await Task.findById(taskId).where({ project: project.id });

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      // Delete the reference of the task from the project
      project.tasks = project.tasks.filter((task) => task!.toString() !== taskId);

      await Promise.allSettled([task.deleteOne(), project.save()]);
      res.status(200).json({ message: 'Task deleted' });

    } catch (error) {
      console.error(error);
    }
  }
}

export default TaskController;