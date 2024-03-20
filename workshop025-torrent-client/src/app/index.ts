import { database } from "../database/index.js";
import { httpServer } from "../http/index.js";
import { p2p } from "../p2p/index.js";

const start = async () => {
  await database.start();
  await httpServer.start();
};

const shutdown = async () => {
  await httpServer.shutdown();
  await database.shutdown();
  await p2p.shutdown();
};

export const app = { start, shutdown };
