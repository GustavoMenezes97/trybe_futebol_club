// Recebi ajuda dos alunos Peter Fritz T22B e Vinícius Barbosa T22B

import IMatch from '../interfaces/matchInterface';
import ILeaderboard, {
  IScore,
  ITotalScore,
  ITotalTeamScores,
} from '../interfaces/leaderboardInterface';

const getScores = (matches: IMatch[], teamLocation: 'away' | 'home'): IScore[] => (
  matches.map((item) => {
    const opponentLocation = teamLocation === 'home' ? 'away' : 'home';

    return {
      name: item[`${teamLocation}Team`].teamName,
      teamLocation,
      goalsFavor: item[`${teamLocation}TeamGoals`],
      goalsOwn: item[`${opponentLocation}TeamGoals`],
      win: item[`${teamLocation}TeamGoals`] > item[`${opponentLocation}TeamGoals`] ? 1 : 0,
      lose: item[`${teamLocation}TeamGoals`] < item[`${opponentLocation}TeamGoals`] ? 1 : 0,
      draw: item[`${teamLocation}TeamGoals`] === item[`${opponentLocation}TeamGoals`] ? 1 : 0,
    };
  })
);

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

const getLeaderBoard = (matches: IMatch[], teamLocation?: 'away' | 'home') => {
  let scores = [...getScores(matches, 'home'), ...getScores(matches, 'away')];

  if (teamLocation) {
    scores = scores.filter((item) => (
      item.teamLocation === teamLocation
    ));
  }

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
