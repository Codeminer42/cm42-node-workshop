const pino = require("pino");

module.exports = function (app) {
  const pinoOptions =
    process.env.NODE_ENV !== "production"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
          },
        }
      : undefined;

  app.locals.logger = pino({ level: process.env.LOG_LEVEL, ...pinoOptions });
};
