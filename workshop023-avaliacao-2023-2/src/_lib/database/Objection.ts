import Knex from 'knex';
import { Model } from 'objection';

export const connectDatabase = ({ config, logger }: { config: any; logger: any }) => {
  const knex = Knex(config.db[config.env]);

  Model.knex(knex);

  knex.on('query', (data) => logger.info(`Database: QUERY ${data.sql}`));

  return knex.raw('SELECT 1').then(
    () => {
      logger.info('Database: CONNECTION CONFIRMED');

      return { knex };
    },
    (error) => {
      logger.error('Unable to connect to database');
      throw error;
    }
  );
};
