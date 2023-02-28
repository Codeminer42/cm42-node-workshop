const { default: pino } = require("pino");

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

module.exports = pino({ level: process.env.LOG_LEVEL, ...pinoOptions });
