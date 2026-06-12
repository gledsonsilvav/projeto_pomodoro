import { Router } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthenticatedRequest } from '../middlewares/auth';

export const settingsRouter = Router();

settingsRouter.get('/', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  let settings = await prisma.settings.findUnique({
    where: { userId },
  });

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        userId,
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      },
    });
  }

  return res.json(settings);
});

settingsRouter.put('/', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const { workTime, shortBreakTime, longBreakTime } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  const settings = await prisma.settings.upsert({
    where: { userId },
    update: {
      workTime: Number(workTime),
      shortBreakTime: Number(shortBreakTime),
      longBreakTime: Number(longBreakTime),
    },
    create: {
      userId,
      workTime: Number(workTime),
      shortBreakTime: Number(shortBreakTime),
      longBreakTime: Number(longBreakTime),
    },
  });

  return res.json(settings);
});
