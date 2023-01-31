import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAllTeams(_req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const team = await TeamService.getTeamById(id);

    return res.status(200).json(team);
  }
}
