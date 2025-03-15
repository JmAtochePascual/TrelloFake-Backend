import mongoose, { Schema, Document, Types } from "mongoose";


// Create the types for the User model
export type UserType = Document & {
  name: string;
  email: string;
  password: string;
  confirmed: boolean;
}

// Create the schema for the task model
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// Create the model
const User = mongoose.model<UserType>("User", UserSchema);
export default User;