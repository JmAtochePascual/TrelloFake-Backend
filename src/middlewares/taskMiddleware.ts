import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class TaskValidation {
  // Middleware to validate task creation
  static validateCreateTask = [
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

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
  static validateGetAllTask = [
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

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
  static validateGetTask = [
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

    check('taskId')
      .isMongoId().withMessage('Invalid task task id'),

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
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

    check('taskId')
      .isMongoId().withMessage('Invalid task task id'),

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

  // Middleware to validate update task status
  static validateUpdateTaskStatus = [
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

    check('taskId')
      .isMongoId().withMessage('Invalid task taskId'),

    check('status')
      .isIn(['pending', 'onHold', 'inProgress', 'underReview', 'completed']).withMessage('Invalid task status'),

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
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

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