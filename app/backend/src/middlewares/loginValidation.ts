import { NextFunction, Request, Response } from 'express';

function loginValidation(req: Request, res: Response, next: NextFunction): void | Response {
  const login = req.body;

  if (!login.email || !login.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
}

export default loginValidation;
