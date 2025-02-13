import express from 'express';
import { connectDB } from './data/dataBase';

const app = express();

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;