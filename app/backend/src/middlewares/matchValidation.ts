import { NextFunction, Request, Response } from 'express';
import CustomError from '../Helpers/customError';

function matchValidation(req: Request, _res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    throw new CustomError(422, 'It is not possible to create a match with two equal teams');
  }

  next();
}

export default matchValidation;
