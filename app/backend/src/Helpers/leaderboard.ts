import IMatch from '../interfaces/matchInterface';
import ILeaderboard, {
  IScore,
  ITotalScore,
  ITotalTeamScores,
} from '../interfaces/leaderboardInterface';

const getScores = (matches: IMatch[]) => matches.map((item) => ({
  name: item.homeTeam.teamName,
  goalsFavor: item.homeTeamGoals,
  goalsOwn: item.awayTeamGoals,
  win: item.homeTeamGoals > item.awayTeamGoals ? 1 : 0,
  lose: item.homeTeamGoals < item.awayTeamGoals ? 1 : 0,
  draw: item.homeTeamGoals === item.awayTeamGoals ? 1 : 0,
}));

const getTotalScores = (scores: IScore[]) => (
  Object.values(scores.reduce<ITotalTeamScores>((acc, curr) => ({
    ...acc,
    [curr.name]: {
      name: curr.name,
      totalGoalsFavor: curr.goalsFavor + (acc[curr.name] ? acc[curr.name].totalGoalsFavor : 0),
      totalGoalsOwn: curr.goalsOwn + (acc[curr.name] ? acc[curr.name].totalGoalsOwn : 0),
      totalWins: curr.win + (acc[curr.name] ? acc[curr.name].totalWins : 0),
      totalLosses: curr.lose + (acc[curr.name] ? acc[curr.name].totalLosses : 0),
      totalDraws: curr.draw + (acc[curr.name] ? acc[curr.name].totalDraws : 0),
      totalGames: 1 + (acc[curr.name] ? acc[curr.name].totalGames : 0),
    },
  }), {}))
);

const balanceAndEfficiency = (totalScores: ITotalScore[]) => (
  totalScores.map<ILeaderboard>((item) => ({
    name: item.name,
    totalPoints: (item.totalWins * 3) + item.totalDraws,
    totalGames: item.totalGames,
    totalVictories: item.totalWins,
    totalDraws: item.totalDraws,
    totalLosses: item.totalLosses,
    goalsFavor: item.totalGoalsFavor,
    goalsOwn: item.totalGoalsOwn,
    goalsBalance: item.totalGoalsFavor - item.totalGoalsOwn,
    efficiency: Number(((((item.totalWins * 3) + item.totalDraws) / (item.totalGames * 3)) * 100)
      .toFixed(2)),
  }))
);

const getLeaderBoard = (matches: IMatch[]) => {
  const scores = getScores(matches);
  const totalScores = getTotalScores(scores);
  const results = balanceAndEfficiency(totalScores);

  results.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
  ));

  return results;
};

export default getLeaderBoard;
