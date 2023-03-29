import { Router } from 'express';
import { handler } from '../../../_lib/http';
import { exchangeRateSerializer } from './exchangeRateSerializer';

const exchangeRatesController = () => {
  const exchangeRatesRouter = Router();

  const ratesHandler = handler(({ exchangeRateRepository }) => async (req, res) => {
    const rates = await exchangeRateRepository.all();
    const serializedRates = exchangeRateSerializer(rates);
    res.status(200).json(serializedRates);
  });

  exchangeRatesRouter.get('/', ratesHandler);

  return exchangeRatesRouter;
};

export { exchangeRatesController };
