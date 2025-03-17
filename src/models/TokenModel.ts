import mongoose, { Schema, Document, Types } from "mongoose";


// Create the types for the Token model
export type TokenType = Document & {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

// Create the schema for the token model
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
    default: () => Date.now(),
    expires: "10m"
  }
}, {
  timestamps: true
});

// Create the model
const Token = mongoose.model<TokenType>("Token", TokenSchema);
export default Token;