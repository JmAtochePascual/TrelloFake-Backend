import express from 'express';
import connectDB from './data/dataBase';
import projectRoutes from './routes/projectRoutes';

const app = express();

// Connect to the database
connectDB();

// Enable express.json
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;