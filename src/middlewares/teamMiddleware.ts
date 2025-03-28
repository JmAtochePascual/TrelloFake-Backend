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

  // Middleware to add a member to the team
  static addMemberToTeam = [
    check('id')
      .isMongoId().withMessage('ID inválido'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to delete a member from the team
  static removeMemberFromTeam = [
    check('memberId')
      .isMongoId().withMessage('memberId inválido'),
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
