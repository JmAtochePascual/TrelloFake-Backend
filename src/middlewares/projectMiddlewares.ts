import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class ProjectValidation {
  // Middleware to validate project creation
  static createProject = [
    check('projectName')
      .notEmpty().withMessage('El nombre del proyecto es requerido'),

    check('clientName')
      .notEmpty().withMessage('El nombre del cliente es requerido'),

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

  // Middleware to validate get project by id
  static getProject = [
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

  // Middleware to validate update project by id
  static updateProject = [
    check('projectId')
      .isMongoId().withMessage('ID de proyecto inválido'),

    check('projectName')
      .notEmpty().withMessage('El nombre del proyecto es requerido'),

    check('clientName')
      .notEmpty().withMessage('El nombre del cliente es requerido'),

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

  // Middleware to validate delete project by id
  static deleteProject = [
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