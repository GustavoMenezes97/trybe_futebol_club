import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import TeamService from '../services/team.service';

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

  static async createMatch(req: Request, res: Response) {
    const payload = req.body;

    const team = await TeamService.getTeamById(payload.homeTeamId);

    if (!team) {
      return team;
    }

    const newMatch = await MatchService.createMatch(payload);

    return res.status(201).json(newMatch);
  }

  static async updateMatchInProgress(req: Request, res: Response) {
    const id = Number(req.params.id);

    const updatedMatch = await MatchService.updateMatchInProgress(id);

    return res.status(200).json(updatedMatch);
  }

  static async updateMatchGoals(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await MatchService.updateMatchGoals(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json(updatedMatch);
  }
}
