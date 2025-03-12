import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { TaskType } from "./TaskModel";
import { TUser } from "./UserModel";

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
  }
}, {
  timestamps: true
});

// Creates the model
const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;