import { Container } from '../container';
import { Logger } from '../_lib/logger';

export const initializeBackgroundJobs = async ({ container, logger }: { container: Container; logger: Logger }) => {
  container.scheduler.addJob('UpdateExchangeRates', '*/5 * * * *', () => container.updateExchangeRates());

  logger.info('BackgroundJobs: Started background jobs');
};
