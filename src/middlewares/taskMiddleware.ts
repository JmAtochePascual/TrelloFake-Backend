import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import Task, { TaskType } from '../models/TaskModel';

declare global {
  namespace Express {
    interface Request {
      task: TaskType;
    }
  }
}

class TaskValidation {
  // Middleware to validate task creation
  static createTask = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('name')
      .notEmpty().withMessage('El nombre de la tarea es requerido'),

    check('description')
      .notEmpty().withMessage('La descripción es requerida'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate get task by ID
  static getAllTask = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate get task by ID
  static getTask = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('taskId')
      .isMongoId().withMessage('ID de tarea inválida'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Midedleware to validate update task by ID
  static updateTask = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('taskId')
      .isMongoId().withMessage('ID de tarea inválida'),

    check('name')
      .notEmpty().withMessage('El nombre de la tarea es requerido'),

    check('description')
      .notEmpty().withMessage('La descripción es requerida'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate update task status
  static updateStatus = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('taskId')
      .isMongoId().withMessage('ID de tarea inválida'),

    check('status')
      .notEmpty().withMessage('El estado es requerido')
      .isIn(['pending', 'onHold', 'inProgress', 'underReview', 'completed']).withMessage('Estado inválido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate delete task by ID
  static deleteTask = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('taskId')
      .isMongoId().withMessage('ID de tarea inválida'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate task exists by ID
  static taskExists = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const { project } = req;

    try {
      const task = await Task.findById(taskId)
        .populate('project')
        .populate({ path: 'completedBy.user', select: 'id name email' })
        .populate({ path: 'notes', populate: { path: 'createBy', select: 'id name email' } })

      // Check if the task exists
      if (!task) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      // Check if the task belongs to the project
      if (task.project.id.toString() !== project.id.toString()) {
        res.status(400).json({ message: "Acción no valida" });
        return;
      }

      req.task = task;
      next();
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la tarea" });
    }
  };

  // Middleware to validate task authorization
  static hasAuhtorization = async (req: Request, res: Response, next: NextFunction) => {
    const project = req.project;
    const userId = req.userId;

    try {
      if (project.manager!.toString() !== userId.toString()) {
        res.status(403).json({ message: "Acción no valida" });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Error al intentar autorizar la tarea" });
    }
  };
}

export default TaskValidation;