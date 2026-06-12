import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  sub: string;
};

export type AuthenticatedRequest = Request & {
  userId?: number;
};

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'pomodoro_secret',
    ) as JwtPayload;

    req.userId = Number(decoded.sub);

    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
