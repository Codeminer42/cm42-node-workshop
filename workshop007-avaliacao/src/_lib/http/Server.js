const Express = require('express');
const bodyParser = require('body-parser');
const httpLogger = require('pino-http');
const { errorHandler } = require('./ErrorHandler');
const { setupSwagger } = require('./Swagger');

const initializeServer = async ({ config, logger, router }) => {
  const server = Express();

  setupSwagger({ server, config });

  server.use(httpLogger({ logger }));

  server.use(bodyParser.json());

  server.use(router());

  server.use(errorHandler);

  const initializionContext = { server };

  if (config.env !== 'test') {
    return new Promise((resolve, reject) => {
      const httpServer = server.listen(config.http.port, () => {
        const { address, port } = httpServer.address();
        logger.info(`Server: LISTENING on ${address}:${port}.`);
        resolve(initializionContext);
      });

      httpServer.on('error', reject);
    });
  }

  return initializionContext;
};

module.exports = { initializeServer };
