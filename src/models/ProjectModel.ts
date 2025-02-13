import mongoose, { Schema, Document } from "mongoose";

// Creates the types for the project model
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
}

// Creates the schema for the project model
const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    trim: true,
    required: true
  },
  clientName: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
});

// Creates the model
export const Project = mongoose.model<ProjectType>("Project", ProjectSchema);