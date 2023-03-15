import { Router } from 'express';

import { exchangeRatesController } from './exchangeRatesController';
import { entryController } from './entryController';
import { balanceController } from './balanceController';

export const router = () => {
  const mainRouter = Router();
  const apiRouter = Router();

  apiRouter.use('/exchange_rates', exchangeRatesController());
  apiRouter.use('/entries', entryController());
  apiRouter.use('/balance', balanceController());

  mainRouter.use('/api', apiRouter);

  return mainRouter;
};
