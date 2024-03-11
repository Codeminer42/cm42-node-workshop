import { randomUUID } from "node:crypto";

import fastify from "fastify";

import { config } from "../config/index.js";
import { routesPlugin } from "./routes.js";

const server = fastify({
  logger: true,
  genReqId: (req) => {
    const remoteAddress = req.socket.remoteAddress;
    const realIpHeader = req.headers["x-real-ip"];
    const forwardedForHeader = req.headers["x-forwarded-for"];

    const ip = realIpHeader || forwardedForHeader || remoteAddress;

    return `${ip}|${randomUUID()}`;
  },
});

server.setNotFoundHandler((req, res) =>
  res.status(404).send({
    error: {
      message: `Route ${req.url} Not Found`,
    },
  }),
);

await server.register(routesPlugin);

export const httpServer = {
  start: async () => {
    await server.listen({
      host: config.http.host,
      port: config.http.port,
    });
  },

  shutdown: async () => {
    await server.close();
  },
};
