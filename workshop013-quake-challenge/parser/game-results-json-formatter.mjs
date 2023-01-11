import { Transform } from "node:stream";

const formatGamePlayers = ({ totalKills, players }, index) => {
  const playersFormatted = Object.entries(players).map(
    ([id, { name, totalKills }]) => {
      return { id, name, kills: totalKills };
    }
  );

  return (
    {
      game: index,
      players: playersFormatted,
      totalKills,
    }
  );
};

export const gameResultsFormatter = new Transform({
  objectMode: true,
  transform(gameState, _encoding, callback) {
    const games = gameState.games
      .map(formatGamePlayers);

    const gameResults = {
      games,
    };

    callback(null, gameResults);
  },
});


export const jsonFormatter = new Transform({
  objectMode: true,
  transform(gamesInfo, _encoding, callback) {
    callback(null, JSON.stringify(gamesInfo, null, 2));
  },
}); 
