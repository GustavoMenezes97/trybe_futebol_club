import CustomError from '../Helpers/customError';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch, { IMatchGoals } from '../interfaces/matchInterface';

export default class MatchService {
  static async getMatches(): Promise<IMatch[]> {
    const allMatches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }

  static async createMatch(payload: IMatch): Promise<IMatch> {
    const newMatch = await Match.create({
      homeTeamId: payload.homeTeamId,
      homeTeamGoals: payload.homeTeamGoals,
      awayTeamId: payload.awayTeamId,
      awayTeamGoals: payload.awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }

  static async updateMatchInProgress(id: number): Promise<object> {
    const updatedMatch = await Match.update(
      { inProgress: false },
      { where: { id, inProgress: true } },
    );

    if (updatedMatch[0] === 0) {
      throw new CustomError(404, 'Partida já finalizada ou id não encontrado');
    }

    return { message: 'Finished' };
  }

  static async updateMatchGoals(id: number, hTeamGoals: number, aTeamGoals: number):
  Promise<IMatchGoals> {
    const updatedMatch = await Match.update(
      {
        homeTeamGoals: hTeamGoals,
        awayTeamGoals: aTeamGoals,
      },
      { where: { id } },
    );

    if (updatedMatch[0] === 0) {
      throw new CustomError(404, 'Resultado não alterado ou id não encontrado');
    }

    return {
      homeTeamGoals: hTeamGoals,
      awayTeamGoals: aTeamGoals,
    };
  }
}
