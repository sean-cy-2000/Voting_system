import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);

app.listen(PORT, () => {
  console.log(`正在執行： ${PORT}`);
});

