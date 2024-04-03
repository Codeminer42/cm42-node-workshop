import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";

import { config } from "../config/index.js";
import {
  TorrentEntity,
  TorrentFileEntity,
} from "../torrents/infrastructure/TorrentEntity.js";

export default defineConfig({
  dbName: config.database.name,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  entities: [TorrentEntity, TorrentFileEntity],
  extensions: [Migrator],
  debug: true,
  migrations: {
    path: "./src/database/migrations",
    pathTs: "./src/database/migrations",
  },
});
