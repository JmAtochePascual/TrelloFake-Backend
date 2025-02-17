import express from 'express';
import cors from 'cors';
import connectDB from './data/dataBase';
import projectRoutes from './routes/projectRoutes';
import { CorsOptions } from 'cors';

const app = express();

// Connect to the database
connectDB();

// Enable CORS
const corsList = [process.env.FRONTEMD_URL];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || corsList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

// Enable express.json
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;