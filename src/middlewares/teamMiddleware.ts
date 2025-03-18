import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class TeamValidation {
  // Middleware to find a user by email
  static findMenberByEmail = [
    check('email')
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

};

export default TeamValidation;
