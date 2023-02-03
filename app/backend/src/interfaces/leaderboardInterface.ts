export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface IScore {
  name: string;
  goalsFavor: number;
  goalsOwn: number;
  win: number;
  lose: number;
  draw: number;
}

export interface ITotalScore {
  name: string;
  totalGoalsFavor: number;
  totalGoalsOwn: number;
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  totalGames: number;
}

export interface ITotalTeamScores { [key: string]: ITotalScore }
