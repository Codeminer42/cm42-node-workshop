import { Router } from 'express';
import { Money } from '../../../domain/Money';
import { handler } from '../../../_lib/http';

const exchangeRatesController = () => {
  const exchangeRatesRouter = Router();

  const ratesHandler = handler(({ exchangeRateService }) => async (req, res) => {
    const rates = await exchangeRateService.getRates();
    res.status(200).json(rates);
  });

  exchangeRatesRouter.get('/', ratesHandler);

  return exchangeRatesRouter;
};

export { exchangeRatesController };
