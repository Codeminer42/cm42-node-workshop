import { Transform } from "node:stream";

const gameState = {
  currentGame: -1,
  games: [],
};

const formatGamePlayers = ({ totalKills, players }, index) => {
  const playersFormatted = Object.entries(players).reduce(
    (acc, [id, value]) => {
      const playerLabel = `${id}: ${value.totalKills}`;

      if (acc) return `${acc}, ${playerLabel}`;
      return `${acc}${playerLabel}`;
    },
    ""
  );

  return `#GAME: ${index} | Players: ${playersFormatted} | Total Kills: ${totalKills}`;
};

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const line = chunk.toString().trim();
    const [, ...parts] = line.split(" ");
    const [action, ...actionData] = parts.join(" ").split(": ");

    if (action === "InitGame") {
      gameState.currentGame += 1;
      gameState.games.push({
        totalKills: 0,
        players: {},
      });
    }

    if (action === "ClientConnect") {
      const [playerId] = actionData;

      gameState.games[gameState.currentGame].players[playerId] = {
        totalKills: 0,
      };
    }

    if (action === "Kill") {
      const [killerId] = actionData[0].split(" ");

      if (gameState.games[gameState.currentGame].players[killerId]) {
        gameState.games[gameState.currentGame].players[
          killerId
        ].totalKills += 1;
      }
      gameState.games[gameState.currentGame].totalKills += 1;
    }

    if (action === "Shutdown") {
      callback(null, `\nGAME OVER\n`);
      return;
    }

    const totalKillsPerGame = gameState.games
      .map(formatGamePlayers)
      .join("\n")
      .concat("\n");

    callback(null, "\u001Bc" + totalKillsPerGame);
  },
});

export default transformStream;
