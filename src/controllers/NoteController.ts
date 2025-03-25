import { Request, Response } from "express";
import Note, { NoteType } from "../models/NoteModel";
import { Types } from "mongoose";

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

  // Delete a note
  static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;

    try {
      const note = await Note.findById(noteId);

      // Check if the note exists
      if (!note) {
        res.status(404).json({ message: "Nota no encontrada" });
        return;
      };

      // Check if user is the creator of the note
      if (note.createBy.toString() !== req.userId.toString()) {
        res.status(401).json({ message: "No tienes permiso para eliminar esta nota" });
        return;
      };

      // Remove the note from the task
      req.task.notes = req.task.notes.filter((note) => note.id.toString() !== noteId.toString());

      // Delete the note
      await Promise.allSettled([note.deleteOne(), req.task.save()]);
      res.status(200).json({ message: "Nota eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la nota" });
    }
  }
}

export default NoteController;
