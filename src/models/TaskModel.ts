import mongoose, { Schema, Document, Types } from "mongoose";

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
  }
}, {
  timestamps: true
});

// Create the model
const Task = mongoose.model<TaskType>("Task", TaskSchema);
export default Task;