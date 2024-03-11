import { app } from "./app/index.js";

await app.start();

const shutdownAndExit = async () => {
  try {
    await app.shutdown();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdownAndExit);
process.on("SIGTERM", shutdownAndExit);
