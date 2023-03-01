const pinoLogger = require("../lib/pinoLogger");

module.exports = function (app) {
  app.locals.logger = pinoLogger;
};
