import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import CustomError from '../Helpers/customError';

const SECRET = process.env.JWT_SECRET;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const payload = jwt.verify(authorization, SECRET as string);

    req.body.user = payload;
    next();
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
};

export default auth;
