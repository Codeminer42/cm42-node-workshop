import { type FastifyPluginAsync } from "fastify";
import { ZodError } from "zod";

import { torrentsRoutesPlugin } from "../torrents/interface/http/routes.js";

export const routesPlugin: FastifyPluginAsync = async (app) => {
  app.setNotFoundHandler((request, response) =>
    response.status(404).send({
      error: {
        code: "ROUTE_NOT_FOUND",
        message: `Route ${request.url} Not Found`,
      },
    })
  );

  app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError)
      return response.status(404).send({
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation error",
          details: error.errors,
        },
      });

    return response.status(500).send({
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal server error",
      },
    });
  });

  app.get("/ping", () => ({
    now: Date.now(),
    version: process.env.npm_package_version,
  }));

  app.register(torrentsRoutesPlugin, { prefix: "/torrents" });
};
