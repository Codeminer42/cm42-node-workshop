import { Transform } from "node:stream";

const gameState = {
  currentGame: -1,
  games: [],
};

const initGame = () => {
  gameState.currentGame += 1;
  gameState.games.push({
    totalKills: 0,
    players: {},
  });
};

const clientConnect = (actionData) => {
  const [playerId] = actionData;

  gameState.games[gameState.currentGame].players[playerId] = {
    totalKills: 0,
  };
};

const clientUserinfoChanged = (actionData) => {
  const [playerId, ...playerInfo] = actionData[0].split(" ");
  const [, playerName] = playerInfo.join(" ").split("\\");

  gameState.games[gameState.currentGame].players[playerId].name = playerName;
};

const kill = (actionData) => {
  const [killerId] = actionData[0].split(" ");

  if (gameState.games[gameState.currentGame].players[killerId]) {
    gameState.games[gameState.currentGame].players[killerId].totalKills += 1;
  }
  gameState.games[gameState.currentGame].totalKills += 1;
};

const transformStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const line = chunk.toString().trim();
    const [, ...parts] = line.split(" ");
    const [action, ...actionData] = parts.join(" ").split(": ");

    const actions = {
      InitGame: initGame,
      ClientConnect: () => clientConnect(actionData),
      ClientUserinfoChanged: () => clientUserinfoChanged(actionData),
      Kill: () => kill(actionData),
    };

    if (action in actions) actions[action]();

    callback(null, gameState);
  },
});

export default transformStream;
