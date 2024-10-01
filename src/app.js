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
  console.log(`正在執行： http://localhost:${PORT}/`);
});

// 前端部份：
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});