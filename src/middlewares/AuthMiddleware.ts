import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class AuthValidation {
  // Middleware to validate user creation
  static validateCreateUser = [
    check('name')
      .notEmpty().withMessage('User name is required'),

    check('email')
      .notEmpty().withMessage('User email is required')
      .isEmail().withMessage('Invalid email'),

    check('password')
      .notEmpty().withMessage('User password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    check('password_confirm')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
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
      .notEmpty().withMessage('Token is required'),

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
      .notEmpty().withMessage('User email is required')
      .isEmail().withMessage('Invalid email'),

    check('password')
      .notEmpty().withMessage('User password is required'),

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