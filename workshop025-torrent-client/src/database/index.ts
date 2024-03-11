import { MikroORM } from "@mikro-orm/postgresql";
import { config } from "../config/index.js";

const databaseHandler = MikroORM.initSync({
  dbName: config.database.name,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  entities: [],
  discovery: {
    warnWhenNoEntities: false,
  },
});

export const database = {
  start: async () => {
    await databaseHandler.connect();
  },

  shutdown: async () => {
    await databaseHandler.close();
  },
};
