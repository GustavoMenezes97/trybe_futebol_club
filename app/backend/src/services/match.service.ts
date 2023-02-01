// import CustomError from '../Helpers/customError';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/matchInterface';

export default class MatchService {
  static async getMatches(): Promise<IMatch[]> {
    const allMatches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown as IMatch[];
    return allMatches;
  }
}