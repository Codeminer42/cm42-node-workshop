import { type FastifyPluginAsync } from "fastify";

export const routesPlugin: FastifyPluginAsync = async (app) => {
  app.get("/ping", () => ({
    now: Date.now(),
    version: process.env.npm_package_version,
  }));
};
