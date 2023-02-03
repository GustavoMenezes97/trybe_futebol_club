import getLeaderBoard from '../Helpers/leaderboard';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import IMatch from '../interfaces/matchInterface';

export default class LearderboardService {
  static async getHomeLeaderboard() {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown as IMatch[];

    return getLeaderBoard(matches);
  }
}
