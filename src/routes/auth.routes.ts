import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { prisma } from '../lib/prisma';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(400).json({
      error: 'E-mail já cadastrado',
    });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    8,
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      settings: {
        create: {},
      },
    },
  });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      error: 'Email ou senha inválidos',
    });
  }

  const passwordMatches =
    await bcrypt.compare(
      password,
      user.password,
    );

  if (!passwordMatches) {
    return res.status(401).json({
      error: 'Email ou senha inválidos',
    });
  }

  const token = jwt.sign(
    {},
    process.env.JWT_SECRET ||
      'pomodoro_secret',
    {
      subject: String(user.id),
      expiresIn: '7d',
    },
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

authRouter.post(
  '/forgot-password',
  async (req, res) => {
    const { email } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    const token =
      crypto.randomBytes(20).toString(
        'hex',
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: token,
        resetPasswordExp: new Date(
          Date.now() + 30 * 60 * 1000,
        ),
      },
    });

    return res.json({
      resetToken: token,
    });
  },
);

authRouter.post(
  '/reset-password',
  async (req, res) => {
    const { token, password } = req.body;

    const user =
      await prisma.user.findFirst({
        where: {
          resetPasswordToken: token,
          resetPasswordExp: {
            gt: new Date(),
          },
        },
      });

    if (!user) {
      return res.status(400).json({
        error:
          'Token inválido ou expirado',
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 8);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExp: null,
      },
    });

    return res.json({
      message:
        'Senha redefinida com sucesso',
    });
  },
);