// Créditos da customização de erros para o Daniel Outeiro - T23A, com base no site: https://javascript.info/custom-errors

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import customError from '../Helpers/customError';

const handleError: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof customError) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return res.status(500).json({ message: error.message });
};

export default handleError;
