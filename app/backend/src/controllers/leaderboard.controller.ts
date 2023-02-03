import { Request, Response } from 'express';
import LearderboardService from '../services/leaderboard.service';

export default class LearderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response) {
    const matches = await LearderboardService.getHomeLeaderboard();

    return res.status(200).json(matches);
  }
}
