import { ExchangeRate } from '../../../domain/exchangeRate/ExchangeRate';

const exchangeRateSerializer = (exchangeRates: ExchangeRate.Type[]) => {
  return exchangeRates.reduce(
    (acc, exchangeRate) => ({
      ...acc,
      [`${exchangeRate.originCurrency}-${exchangeRate.destinationCurrency}`]: exchangeRate.rate,
    }),
    {}
  );
};

export { exchangeRateSerializer };
