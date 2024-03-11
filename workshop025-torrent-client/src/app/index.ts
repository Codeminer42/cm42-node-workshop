import { database } from "../database/index.js";
import { httpServer } from "../http/index.js";

const start = async () => {
  await database.start();
  await httpServer.start();
};

const shutdown = async () => {
  await httpServer.shutdown();
  await database.start();
};

export const app = { start, shutdown };
