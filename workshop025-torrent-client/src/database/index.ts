import { MikroORM } from "@mikro-orm/postgresql";

import config from "./config.js";

const databaseHandler = MikroORM.initSync(config);

export const entityManager = databaseHandler.em;

export const database = {
  start: async () => {
    await databaseHandler.connect();
    await databaseHandler.schema.refreshDatabase();
  },

  shutdown: async () => {
    await databaseHandler.close();
  },
};
