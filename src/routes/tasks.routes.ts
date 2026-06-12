import { Router } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthenticatedRequest } from '../middlewares/auth';

export const tasksRouter = Router();

function serializeTask(task: any) {
  return {
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate ? task.completeDate.toString() : null,
    interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
  };
}

tasksRouter.get('/', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: {
        startDate: 'desc',
      },
    });

    return res.json(tasks.map(serializeTask));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

tasksRouter.post('/', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const { name, duration, type, startDate } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        userId,
        name: String(name),
        duration: Number(duration),
        type: String(type),
        startDate: BigInt(startDate),
      },
    });

    return res.status(201).json(serializeTask(task));
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar tarefa. Verifique os dados.' });
  }
});

tasksRouter.patch('/:id/complete', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { completeDate } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        completeDate: BigInt(completeDate),
      },
    });

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'Tarefa não pertence ao usuário autenticado' });
    }

    return res.json(serializeTask(task));
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao concluir tarefa' });
  }
});

tasksRouter.patch('/:id/interrupt', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { interruptDate } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        interruptDate: BigInt(interruptDate),
      },
    });

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'Tarefa não pertence ao usuário autenticado' });
    }

    return res.json(serializeTask(task));
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao interromper tarefa' });
  }
});

tasksRouter.delete('/', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    await prisma.task.deleteMany({
      where: { userId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao limpar histórico' });
  }
});
