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

export const createJsonFormatter = () => new Transform({
  objectMode: true,
  transform(gameState, _encoding, callback) {
    const games = gameState.games
      .map(formatGamePlayers);

    callback(null, JSON.stringify({ games }, null, 2));
  },
});
