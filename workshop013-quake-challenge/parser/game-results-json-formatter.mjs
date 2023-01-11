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
  transform(gameState, encoding, callback) {
    // if (gameState.games.length === 0) return callback(null, "");
    const totalKillsPerGame = gameState.games
      .map(formatGamePlayers)
      // .join("\n")
      // .concat("\n");
    // callback(null, "\u001Bc" + totalKillsPerGame);
    callback(null, totalKillsPerGame);
  },
});


export const jsonFormatter = new Transform({
  objectMode: true,
  transform(totalKillsPerGame, encoding, callback) {
    callback(null, JSON.stringify(totalKillsPerGame, null, 2));
  },
}); 
