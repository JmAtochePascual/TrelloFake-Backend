import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User, { TUser } from '../models/UserModel';

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}

// Check if the user is authenticated with cookies
export const validateAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwtTrelloFake;

    if (!token) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { id } = decoded as { id: Types.ObjectId };

    // Check if the user exists
    const user = await User.findById(id).select('_id name email');
    if (!user) {
      res.status(500).json({ message: 'No autorizado' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el token' });
  }
};