import mongoose, { Schema, Document, Types } from "mongoose";

// Create the types for the Note model
export type NoteType = Document & {
  content: string
  createBy: Types.ObjectId
  task: Types.ObjectId
}

// Create the schema for the Note model
const NoteSchema: Schema = new Schema({
  content: {
    type: String,
    required: true
  },
  createBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  task: {
    type: Types.ObjectId,
    ref: "Task",
    required: true
  }
}, {
  timestamps: true
});

// Create the model
const Note = mongoose.model<NoteType>("Note", NoteSchema);
export default Note;
