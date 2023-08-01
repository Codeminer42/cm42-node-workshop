import { Router } from 'express';
import { listCurrenciesHandler } from './listCurrenciesHandler';

const currenciesController = () => {
  const router = Router();

  router.get('/', listCurrenciesHandler);

  return router;
};

export { currenciesController };
