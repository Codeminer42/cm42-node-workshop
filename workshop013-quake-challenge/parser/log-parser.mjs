import { Transform } from "node:stream";

const initGame = (gameState) => {
  gameState.currentGame += 1;
  gameState.games.push({
    totalKills: 0,
    players: {},
  });
};

const clientConnect = (gameState, actionData) => {
  const [playerId] = actionData;

  gameState.games[gameState.currentGame].players[playerId] = {
    totalKills: 0,
  };
};

const clientUserinfoChanged = (gameState, actionData) => {
  const [playerId, ...playerInfo] = actionData[0].split(" ");
  const [, playerName] = playerInfo.join(" ").split("\\");

  gameState.games[gameState.currentGame].players[playerId].name = playerName;
};

const kill = (gameState, actionData) => {
  const [killerId] = actionData[0].split(" ");

  if (gameState.games[gameState.currentGame].players[killerId]) {
    gameState.games[gameState.currentGame].players[killerId].totalKills += 1;
  }
  gameState.games[gameState.currentGame].totalKills += 1;
};

const createLogParser = () => new Transform({
  objectMode: true,
  construct(callback) {
    this.gameState = {
      currentGame: -1,
      games: [],
    };

    callback();
  },
  transform(chunk, _encoding, callback) {
    const line = chunk.toString().trim();
    const [, ...parts] = line.split(" ");
    const [action, ...actionData] = parts.join(" ").split(": ");

    const actions = {
      InitGame: () => initGame(this.gameState),
      ClientConnect: () => clientConnect(this.gameState, actionData),
      ClientUserinfoChanged: () => clientUserinfoChanged(this.gameState, actionData),
      Kill: () => kill(this.gameState, actionData),
    };

    if (action in actions) actions[action]();

    callback(null, this.gameState);
  }
});

export default createLogParser;
