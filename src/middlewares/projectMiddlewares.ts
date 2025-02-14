import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class ProjectValidation {
  // Middleware to validate project creation
  static validateCreateProject = [
    check('projectName')
      .notEmpty().withMessage('Project name is required'),

    check('clientName')
      .notEmpty().withMessage('Client name is required'),

    check('description')
      .notEmpty().withMessage('description is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate get project by id
  static validateGetProjectById = [
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

  // Middleware to validate update project by id
  static validateUpdateProjectById = [
    check('projectId')
      .isMongoId().withMessage('Invalid project id'),

    check('projectName')
      .notEmpty().withMessage('Project name is required'),

    check('clientName')
      .notEmpty().withMessage('Client name is required'),

    check('description')
      .notEmpty().withMessage('description is required'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate delete project by id
  static validateDeleteProjectById = [
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
}

export default ProjectValidation;