import { Request, Response } from "express";
import Note, { NoteType } from "../models/NoteModel";

class NoteController {

  // Create a note
  static createNote = async (req: Request<{}, {}, NoteType>, res: Response) => {
    const { content } = req.body;

    const note = new Note({
      content,
      createBy: req.userId,
      task: req.task.id
    });

    // Save the note and the task
    req.task.notes.push(note.id);

    try {
      await Promise.allSettled([note.save(), req.task.save()]);
      res.status(201).json({ message: "Nota creada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear la nota" });
    }
  }
}

export default NoteController;
