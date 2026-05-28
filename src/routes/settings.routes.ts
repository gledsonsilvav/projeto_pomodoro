import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const settingsRouter = Router();

// GET /settings - Busca ou cria as configurações padrão [cite: 141]
settingsRouter.get('/', async (req, res) => {
  let settings = await prisma.settings.findUnique({ where: { id: 1 } });
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: { id: 1, workTime: 25, shortBreakTime: 5, longBreakTime: 15 },
    });
  }
  
  return res.json(settings);
});

// PUT /settings - Atualiza as configurações [cite: 150]
settingsRouter.put('/', async (req, res) => {
  const { workTime, shortBreakTime, longBreakTime } = req.body;
  
  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: { workTime, shortBreakTime, longBreakTime },
    create: { id: 1, workTime, shortBreakTime, longBreakTime },
  });
  
  return res.json(settings);
});