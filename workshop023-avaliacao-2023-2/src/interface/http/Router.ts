import { Router } from 'express';

import { exchangeRatesController } from './exchangeRatesController';
import { entryController } from './entryController';
import { balanceController } from './balanceController';
import { currenciesController } from './currenciesController';
import { ledgersController } from './ledgersController';

export const router = () => {
  const mainRouter = Router();
  const apiRouter = Router();

  apiRouter.use('/exchange_rates', exchangeRatesController());
  apiRouter.use('/entries', entryController());
  apiRouter.use('/balance', balanceController());
  apiRouter.use('/currencies', currenciesController());
  apiRouter.use('/ledgers', ledgersController());

  mainRouter.use('/api', apiRouter);

  return mainRouter;
};
