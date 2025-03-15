import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class UserValidation {

  // Middleware to validate user creation
  static createUser = [
    check('name')
      .notEmpty().withMessage('El nombre de usuario es requerido'),

    check('email')
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),

    check('password')
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    check('confirmPassword')
      .notEmpty().withMessage('La confirmación de contraseña es requerida')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Las contraseñas no coinciden'),
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

export default UserValidation;
