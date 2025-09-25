import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';  // <-- add .js here

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Sweets Shop Management System API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const DB_NAME = 'SweetShop';
