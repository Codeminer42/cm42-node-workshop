import { Transform } from "node:stream";

const formatGamePlayers = ({ totalKills, players }, index) => {
  const playersFormatted = Object.entries(players).map(
    ([id, { name, totalKills }]) => {
      return { id, name, kills: totalKills };
    }
  );

  return JSON.stringify(
    {
      game: index,
      players: playersFormatted,
      totalKills,
    },
    null,
    " "
  );
};

const gameStateFormatStream = new Transform({
  objectMode: true,
  transform(gameState, encoding, callback) {
    const totalKillsPerGame = gameState.games
      .map(formatGamePlayers)
      .join("\n")
      .concat("\n");

    callback(null, "\u001Bc" + totalKillsPerGame);
  },
});

export default gameStateFormatStream;
