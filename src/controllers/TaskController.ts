import { Request, Response } from 'express';
import Task from '../models/TaskModel';

class TaskController {

  // Create a new task to a project
  static createTask = async (req: Request, res: Response) => {
    try {
      const newTask = new Task({ ...req.body, project: req.project.id });
      req.project.tasks.push(newTask.id);
      await Promise.allSettled([newTask.save(), req.project.save()]);
      res.status(201).json({ message: "Tarea creada correctamente" });
    } catch (error) {
      console.error(error);
    }
  }

  // Get all tasks from a project
  static getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate('project');
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  // Get a task by ID from a project
  static getTask = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.task);
    } catch (error) {
      console.error(error);
    }
  }

  // Update a task by ID from a project
  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.status(200).json({ message: "Tarea actualizada correctamente" })
    } catch (error) {
      console.error(error);
    }
  }

  // Update status of a task from a project
  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      // Update the status of a task
      req.task.status = req.body.status;
      await req.task.save();
      res.status(200).json({ message: "Estado actualizado correctamente" });
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a task by ID from a project
  static deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    try {
      // Delete the reference of the task from the project
      req.project.tasks = req.project.tasks.filter((task) => task!.id.toString() !== taskId);
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      console.error(error);
    }
  }
}

export default TaskController;