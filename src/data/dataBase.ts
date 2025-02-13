import mongoose from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";

dotenv.config();

// Create the connection to the database
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.BATABASE_URL}`);
    const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
    exit(1);
  }
}

export default connectDB;