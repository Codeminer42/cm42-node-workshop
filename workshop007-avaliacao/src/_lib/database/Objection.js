const Knex = require('knex');
const { Model } = require('objection');

const connectDatabase = ({ config, logger }) => {
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

module.exports = { connectDatabase };
