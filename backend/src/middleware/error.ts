import { NextFunction, Request, Response } from 'express';

export function notFoundMiddleware(_req: Request, res: Response) {
  res.status(404).json({ error: { message: 'Not Found' } });
}

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message || 'Internal Server Error';
  res.status(status).json({ error: { message } });
}


