import CustomError from '../Helpers/customError';
import Team from '../database/models/Team';

export default class TeamService {
  static async getAllTeams(): Promise<object[]> {
    const allTeams = await Team.findAll();

    return allTeams;
  }

  static async getTeamById(id: number): Promise<object> {
    const team = await Team.findOne({ where: { id } });

    if (team) {
      return team;
    }

    throw new CustomError(401, 'id not found');
  }
}
