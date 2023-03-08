import { Router } from 'express';

import { exchangeRatesController } from './exchangeRatesController';
import { entryController } from './entryController';

export const router = () => {
  const mainRouter = Router();
  const apiRouter = Router();

  apiRouter.use('/exchange_rates', exchangeRatesController());
  apiRouter.use('/entries', entryController());

  mainRouter.use('/api', apiRouter);

  return mainRouter;
};
