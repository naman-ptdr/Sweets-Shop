import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import sweetsRoutes from './routes/sweetsRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

app.get('/', (req, res) => res.send('Sweets Shop API running'));

// Only start server if not testing
if (process.env.NODE_ENV !== 'test') {
  import('./config/db.js').then(({ connectDB }) => {
    connectDB().then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
  }).catch(err => console.error('DB import/startup error:', err));
}

export default app;
