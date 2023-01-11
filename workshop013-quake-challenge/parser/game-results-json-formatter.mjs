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
    const totalKillsPerGame = gameState.games
      .map(formatGamePlayers)
    // callback(null, "\u001Bc" + totalKillsPerGame);
    callback(null, totalKillsPerGame);
  },
});


export const jsonFormatter = new Transform({
  objectMode: true,
  transform(totalKillsPerGame, _encoding, callback) {
    callback(null, JSON.stringify(totalKillsPerGame, null, 2));
  },
}); 
