import EventEmitter from 'events';

import schedule from 'node-schedule';
import { Logger } from '../logger';

export type Scheduler = {
  addJob: (name: string, cronRule: string, handler: () => void | Promise<void>) => EventEmitter;
};

export const makeScheduler = ({ logger }: { logger: Logger }): Scheduler => {
  return {
    addJob(name, cronRule, handler) {
      return schedule.scheduleJob(name, cronRule, handler).on('run', () => logger.info(`Job ${name} executed`));
    },
  };
};
