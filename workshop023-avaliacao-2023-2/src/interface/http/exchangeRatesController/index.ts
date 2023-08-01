import { Router } from 'express';
import { Money } from '../../../domain/Money';

const exchangeRatesController = () => {
  const exchangeRatesRouter = Router();

  exchangeRatesRouter.get('/', (_, res) => {
    res.status(200).json(Money.EXCHANGE_RATES);
  });

  return exchangeRatesRouter;
};

export { exchangeRatesController };
