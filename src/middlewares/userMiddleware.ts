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

  // Middleware to valide token
  static confirmUser = [
    check('token')
      .notEmpty().withMessage('El token es requerido')
      .isLength({ min: 6 }).withMessage('El token no es válido'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to reset token
  static resendToken = [
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

  // Middleware to reset token
  static forgotPassword = [
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

  // Middleware to verify forgot password token
  static verifyTokenPassword = [
    check('token')
      .notEmpty().withMessage('El token es requerido')
      .isLength({ min: 6 }).withMessage('El token no es válido'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to update password
  static updatePassword = [
    check('token')
      .isNumeric().withMessage('El token debe ser numérico')
      .isLength({ min: 6 }).withMessage('El token no es válido'),

    check('password')
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    check('confirmPassword')
      .notEmpty().withMessage('La confirmación de contraseña es requerida')
      .custom((value, { req }) => value === req.body.password),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to login a user
  static login = [
    check('email')
      .notEmpty().withMessage('El correo electrónico es requerido')
      .isEmail().withMessage('El correo electrónico no es válido'),

    check('password')
      .notEmpty().withMessage('La contraseña es requerida'),
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
