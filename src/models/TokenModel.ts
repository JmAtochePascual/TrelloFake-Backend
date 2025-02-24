import mongoose, { Schema, Document, Types } from "mongoose";

export type TUser = Document & {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m'
  }
}, {
  timestamps: true
});

const Token = mongoose.model<TUser>("Token", TokenSchema);
export default Token;