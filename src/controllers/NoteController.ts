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

  // Get all notes of a task
  static getNotes = async (req: Request, res: Response) => {
    try {
      const notes = await Note.find({ task: req.task.id });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las notas" });
    }
  }
}

export default NoteController;
