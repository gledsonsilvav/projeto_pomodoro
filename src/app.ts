import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth.routes';
import { settingsRouter } from './routes/settings.routes';
import { tasksRouter } from './routes/tasks.routes';
import { authMiddleware } from './middlewares/auth';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/settings', authMiddleware, settingsRouter);
app.use('/tasks', authMiddleware, tasksRouter);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});
