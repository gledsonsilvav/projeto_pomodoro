import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const tasksRouter = Router();

// GET /tasks - Lista todo o histórico de tarefas
tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { 
        startDate: 'desc' 
      },
    });

    // Converte BigInt para String para o JSON não dar erro
    const serializedTasks = tasks.map(task => ({
      ...task,
      startDate: task.startDate.toString(),
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
      } as any, // 'as any' resolve o erro visual de "id missing" no VS Code
    });

    return res.status(201).json({
      ...task,
      startDate: task.startDate.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar tarefa. Verifique os dados.' });
  }
});

// DELETE /tasks - Limpa o histórico
tasksRouter.delete('/', async (req, res) => {
  try {
    await prisma.task.deleteMany();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao limpar histórico' });
  }
});