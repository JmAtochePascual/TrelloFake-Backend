import mongoose, { Schema, Document, Types } from "mongoose";
import Note from "./NoteModel";

// Create the diccionary for the task status
const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

// Create the type for the task status
export type TaskStatusType = typeof taskStatus[keyof typeof taskStatus];

// Create the types for the task model
export type TaskType = Document & {
  name: string;
  description: string;
  status: TaskStatusType;
  project: Types.ObjectId;
  completedBy: {
    user: Types.ObjectId,
    status: TaskStatusType
  }[];
  notes: Types.ObjectId[];
}

// Create the schema for the task model
const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  },
  project: {
    type: Types.ObjectId,
    ref: "Project",
  },
  completedBy: [
    {
      user: {
        type: Types.ObjectId,
        ref: "User",
        default: null
      },
      status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
      }
    }
  ],
  notes: [
    {
      type: Types.ObjectId,
      ref: "Note"
    }
  ]
}, {
  timestamps: true
});

// Middleware to delete notes when a task is deleted
TaskSchema.pre("deleteOne", { document: true }, async function () {
  const taskId = this._id;
  if (!taskId) return;
  await Note.deleteMany({ task: taskId });
});

// Create the model
const Task = mongoose.model<TaskType>("Task", TaskSchema);
export default Task;