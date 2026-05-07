import express from 'express';
import cors from 'cors';
import { tasksRouter } from './routes/tasks.routes'; // Verifique se o nome do arquivo está correto

const app = express();

// Middlewares obrigatórios
app.use(cors());
app.use(express.json()); 

// REGISTRO DAS ROTAS
// Esta linha diz: "Tudo que começar com /tasks, envie para o tasksRouter"
app.use('/tasks', tasksRouter);

// Rota de teste simples (acesse http://localhost:3333 no navegador)
app.get('/', (req, res) => {
  return res.json({ message: "API está online!" });
});

export { app };

import { settingsRouter } from './routes/settings.routes'; // 1. Importar

// ... outras linhas ...

app.use('/settings', settingsRouter); // 2. Registrar