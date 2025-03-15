import express from "express";
import cors from "cors";
import connectDB from "./data/dataBase";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouters";

const app = express();

// Connect to the database
connectDB();

// Enable json
app.use(express.json());

// Enable cookies
app.use(cookieParser());

// Enable CORS
const corsList = [process.env.FRONTEMD_URL];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || corsList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Enable morgan
app.use(morgan("dev"));

// Enable express.json
app.use(express.json());

// Router for users
app.use("/api/auth", userRoutes);

// Router for projects
app.use("/api/projects", projectRoutes);

export default app;
