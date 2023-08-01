import Express, { Request, Router } from 'express';
import bodyParser from 'body-parser';
import httpLogger from 'pino-http';
import { AddressInfo } from 'net';
import cors from 'cors';

import { Logger } from '../logger';
import { Config } from '../../config';
import { errorHandler } from './ErrorHandler';

const initializeServer = async ({
  config,
  logger,
  router,
  container,
}: {
  config: Config;
  logger: Logger;
  router: () => Router;
  container: Request['container'];
}) => {
  const server = Express();

  server.use(cors());

  server.use((req, _, next) => {
    req.container = container;

    next();
  });
  server.use(httpLogger({ logger }));

  server.use(bodyParser.json());

  server.use(router());

  server.use(errorHandler);

  const initializationContext = { server };

  if (config.env !== 'test') {
    return new Promise((resolve, reject) => {
      const httpServer = server.listen(config.http.port, () => {
        const { address, port } = <AddressInfo>httpServer.address();
        logger.info(`Server: LISTENING on ${address}:${port}.`);
        resolve(initializationContext);
      });

      httpServer.on('error', reject);
    });
  }

  return initializationContext;
};

export { initializeServer };
