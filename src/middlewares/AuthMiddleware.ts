import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class AuthValidation {
  // Middleware to validate user creation
  static validateCreateAccount = [
    check('name')
      .notEmpty().withMessage('El nombre es requerido'),

    check('email')
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('El email no es valido'),

    check('password')
      .notEmpty().withMessage('El password es requerido')
      .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres'),

    check('password_confirm')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Los passwords no coinciden');
        }
        return true;
      }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate token
  static validateConfirmAccount = [
    check('token')
      .notEmpty().withMessage('El token es requerido')
      .isNumeric().withMessage('El token debe ser un numero'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ]

  // Middleware to validate login
  static validateLogin = [
    check('email')
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('El email no es valido'),

    check('password')
      .notEmpty().withMessage('El password es requerido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ]

  // Middleware to validate resend confirmation token
  static validateResendConfirmationToken = [
    check('email')
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('El email no es valido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ]

  // Middleware to forgot password
  static validateForgotPassword = [
    check('email')
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('El email no es valido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ]

  // Middleware to change password
  static validateChangePassword = [
    check('token')
      .notEmpty().withMessage('El token es requerido')
      .isNumeric().withMessage('El token debe ser un número'),

    check('password')
      .notEmpty().withMessage('El password es requerido')
      .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres'),

    check('password_confirm')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Los passwords no coinciden');
        }
        return true;
      }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ]
}

export default AuthValidation;