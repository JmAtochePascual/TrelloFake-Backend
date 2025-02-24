import mongoose, { Schema, Document, Types } from "mongoose";

export type TUser = Document & {
  email: string;
  password: string;
  name: string;
  confirm: boolean;
}

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  confirm: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model<TUser>("User", UserSchema);
export default User;