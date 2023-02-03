import { Request, Response } from 'express';
import LearderboardService from '../services/leaderboard.service';

export default class LearderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response) {
    const matches = await LearderboardService.getHomeLeaderboard();

    return res.status(200).json(matches);
  }

  static async getAwayLeaderboard(_req: Request, res: Response) {
    const matches = await LearderboardService.getAwayLeaderboard();

    return res.status(200).json(matches);
  }

  static async getAllLeaderboard(_req: Request, res: Response) {
    const matches = await LearderboardService.getAllLeaderboard();

    return res.status(200).json(matches);
  }
}
