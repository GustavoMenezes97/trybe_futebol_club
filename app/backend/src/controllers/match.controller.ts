import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchService.getMatches();

    if (inProgress) {
      const booleanProgress = inProgress === 'true';

      const filteredMatches = matches.filter((item) =>
        item.inProgress === booleanProgress);

      return res.status(200).json(filteredMatches);
    }

    return res.status(200).json(matches);
  }
}
