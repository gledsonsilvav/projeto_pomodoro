import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const tasksRouter = Router();

// GET /tasks - Lista todo o histórico de tarefas
tasksRouter.get('/', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });

    const serializedTasks = tasks.map((task) => ({
      ...task,
      startDate: task.startDate.toString(),
      completeDate: task.completeDate ? task.completeDate.toString() : null,
      interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
    }));

    return res.json(serializedTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// POST /tasks - Cria uma nova tarefa
tasksRouter.post('/', async (req, res) => {
  const { name, duration, type, startDate } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        name: String(name),
        duration: Number(duration),
        type: String(type),
        startDate: BigInt(startDate),
      },
    });

    return res.status(201).json({
      ...task,
      startDate: task.startDate.toString(),
      completeDate: task.completeDate ? task.completeDate.toString() : null,
      interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar tarefa. Verifique os dados.' });
  }
});

// PATCH /tasks/:id/complete - Marca tarefa como concluída
tasksRouter.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completeDate } = req.body;

  try {
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        completeDate: BigInt(completeDate),
      },
    });

    return res.json({
      ...task,
      startDate: task.startDate.toString(),
      completeDate: task.completeDate ? task.completeDate.toString() : null,
      interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao concluir tarefa' });
  }
});

// PATCH /tasks/:id/interrupt - Marca tarefa como interrompida
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body;

  try {
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        interruptDate: BigInt(interruptDate),
      },
    });

    return res.json({
      ...task,
      startDate: task.startDate.toString(),
      completeDate: task.completeDate ? task.completeDate.toString() : null,
      interruptDate: task.interruptDate ? task.interruptDate.toString() : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao interromper tarefa' });
  }
});

// DELETE /tasks - Limpa o histórico
tasksRouter.delete('/', async (_req, res) => {
  try {
    await prisma.task.deleteMany();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao limpar histórico' });
  }
});