import { cleanEnv, host, port, str } from "envalid";

const envSpec = {
  PORT: port({ devDefault: 3000 }),
  HOST: host({ devDefault: "0.0.0.0" }),
  DATABASE_NAME: str({ devDefault: "torrente_dev" }),
  DATABASE_HOST: host({ devDefault: "localhost" }),
  DATABASE_PORT: port({ devDefault: 5432 }),
  DATABASE_USER: str({ devDefault: "torrente" }),
  DATABASE_PASSWORD: str({ devDefault: "70rr3n73" }),
  TORRENT_STORAGE_PATH: str({ devDefault: "/app/.storage" }),
};

const env = cleanEnv(process.env, envSpec);

export const config = {
  http: {
    port: env.PORT,
    host: env.HOST,
  },
  database: {
    name: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
  },
  torrent: {
    storagePath: env.TORRENT_STORAGE_PATH,
  },
};
