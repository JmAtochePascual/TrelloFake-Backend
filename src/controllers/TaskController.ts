import { Request, Response } from 'express';
import Task from '../models/TaskModel';

class TaskController {

  // Method to create a task
  static async createTask(req: Request, res: Response) {
    const { project } = req;

    try {
      // Create the task
      const task = new Task(req.body);
      task.project = project.id;

      // Save the task and the project
      project.tasks.push(task.id);

      await Promise.allSettled([task.save(), project.save()]);
      res.status(201).json({ message: "Tarea creada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear la tarea" });
    }
  }

  // Method to get all tasks of a project
  static async getAllTasks(req: Request, res: Response) {
    const { project } = req;
    try {
      const tasks = await Task.find({ project: project.id }).populate('project');
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas" });
    }
  }

  // Method to get a task by ID
  static async getTask(req: Request, res: Response) {
    const { task } = req;

    try {
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la tarea" });
    }
  }

  // Method to update a task by ID
  static async updateTask(req: Request, res: Response) {
    const { task } = req;

    try {
      // Update the task
      task.name = req.body.name;
      task.description = req.body.description;

      await task.save();
      res.status(200).json({ message: "Tarea actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  }

  // Method to update the status of a task
  static async updateStatus(req: Request, res: Response) {
    const { task } = req;

    try {
      // Update the task status
      task.status = req.body.status;

      const data = {
        user: req.userId,
        status: req.body.status
      };

      task.completedBy.push(data);

      await task.save();
      res.status(200).json({ message: "Estado de la tarea actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el estado de la tarea" });
    }
  }

  // Method to delete a task by ID
  static async deleteTask(req: Request, res: Response) {
    const { task } = req;
    const { project } = req;

    try {
      // Remove the task from the project
      project.tasks = project.tasks.filter(taskIdRef => taskIdRef && taskIdRef.toString() !== task.id);

      // Delete the task
      await Promise.allSettled([task.deleteOne(), project.save()]);
      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  }
}

export default TaskController;