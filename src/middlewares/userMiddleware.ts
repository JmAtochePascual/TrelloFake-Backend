import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import User from '../models/UserModel';

declare global {
  namespace Express {
    interface Request {
      userId: Types.ObjectId;
    }
  }
}

class UserValidation {

  // Middleware to validate user creation
  static createAccount = [
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
  static confirmAccount = [
    check('token')
      .notEmpty().withMessage('El token es requerido')
      .isNumeric().withMessage('El token debe ser numérico')
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
      .isNumeric().withMessage('El token debe ser numérico')
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
      .notEmpty().withMessage('El token es requerido')
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

  // Middleware to user autenticated
  static authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    const { trelloToken } = req.cookies;

    try {
      // Check if the token is provided
      if (!trelloToken) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      // Decode the token
      const decoded = jwt.verify(trelloToken, process.env.JWT_SECRET!) as { id: Types.ObjectId };
      const id = decoded.id;

      // Find the user
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      req.userId = user.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Error al autenticar el usuario' });
    }
  }
};

export default UserValidation;
