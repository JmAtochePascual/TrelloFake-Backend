import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import Task, { TaskType } from "./TaskModel";
import { UserType } from "./UserModel";
import Note from "./NoteModel";

// Creates the types for the project model
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<TaskType & Document>[];
  manager: PopulatedDoc<UserType & Document>;
  team: PopulatedDoc<UserType & Document>[];
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
  tasks: [{
    type: Types.ObjectId,
    ref: 'Task',
    required: true
  }],
  manager: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  team: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }]
}, {
  timestamps: true
});

// Middleware to delete tasks when a project is deleted
ProjectSchema.pre("deleteOne", { document: true }, async function () {
  const projectId = this._id;
  if (!projectId) return;

  const tasks = await Task.find({ project: projectId });

  // Delete the notes associated with the tasks
  for (const task of tasks) {
    await Note.deleteMany({ task: task.id });
  }
  await Task.deleteMany({ project: projectId });
});

// Creates the model
const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;