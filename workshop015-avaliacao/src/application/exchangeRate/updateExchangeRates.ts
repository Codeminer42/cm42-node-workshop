import { ExchangeRate } from '../../domain/exchangeRate/ExchangeRate';
import { ExchangeRateRepository } from '../../domain/exchangeRate/ExchangeRateRepository';
import { ExchangeRateService } from '../../domain/exchangeRate/ExchangeRateService';

type Dependencies = {
  exchangeRateService: ExchangeRateService;
  exchangeRateRepository: ExchangeRateRepository;
};

export const makeUpdateExchangeRates =
  ({ exchangeRateService, exchangeRateRepository }: Dependencies) =>
  async () => {
    const latestRates = await exchangeRateService.getRates();

    const savedRates = await exchangeRateRepository.all();

    const ratesUpdatePromises = savedRates.map((exchangeRate) => {
      const newRate = latestRates[`${exchangeRate.originCurrency}-${exchangeRate.destinationCurrency}`];

      if (newRate) {
        const newExchangeRate = ExchangeRate.create({
          originCurrency: exchangeRate.originCurrency,
          destinationCurrency: exchangeRate.destinationCurrency,
          rate: newRate,
        });

        return exchangeRateRepository.store(newExchangeRate);
      }
    });

    await Promise.all(ratesUpdatePromises);
  };
