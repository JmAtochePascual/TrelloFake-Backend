import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class TaskValidation {
  // Middleware to validate task creation
  static validateCreateTask = [
    check('name')
      .notEmpty().withMessage('Task name is required'),

    check('description')
      .notEmpty().withMessage('Task description is required'),

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
  static validateGetTaskById = [
    check('taskId')
      .isMongoId().withMessage('Invalid task taskId'),

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
  static validateUpdateTask = [
    check('taskId')
      .isMongoId().withMessage('Invalid task taskId'),

    check('name')
      .notEmpty().withMessage('Task name is required'),

    check('description')
      .notEmpty().withMessage('Task description is required'),

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
  static validateDeleteTask = [
    check('taskId')
      .isMongoId().withMessage('Invalid task taskId'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];
}

export default TaskValidation;