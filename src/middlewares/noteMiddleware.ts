import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class NoteValidation {

  // Middleware to validate create note
  static createNote = [
    check('content')
      .notEmpty().withMessage('El contenido es requerido'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];

  // Middleware to validate delete note
  static deleteNote = [
    check('noteId')
      .notEmpty().withMessage('El ID de la nota es requerido'),

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

export default NoteValidation;