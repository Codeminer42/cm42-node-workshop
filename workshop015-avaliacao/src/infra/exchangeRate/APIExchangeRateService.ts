import { ExchangeRateService } from '../../domain/exchangeRate/ExchangeRateService';
import { Money } from '../../domain/Money';
import { ExchangeRateApiClient, SupportedCurrency } from '../../_lib/exchangeRateAPI/ExchangeRateAPIClient';

type Dependencies = {
  exchangeRateAPIClient: ExchangeRateApiClient;
};

const makeAPIExchangeRateService = ({ exchangeRateAPIClient }: Dependencies): ExchangeRateService => {
  return {
    async getRates() {
      const ratesBasedInUSD = await exchangeRateAPIClient.getLatest();

      const currencySymbols = Object.keys(ratesBasedInUSD) as SupportedCurrency[];

      return currencySymbols.reduce((rates, symbolFrom) => {
        return currencySymbols.reduce((rates, symbolTo) => {
          return {
            ...rates,
            [`${symbolFrom}-${symbolTo}`]: Number((ratesBasedInUSD[symbolFrom] / ratesBasedInUSD[symbolTo]).toFixed(2)),
          };
        }, rates);
      }, {} as Money.AllowedRates);
    },
  };
};

export { makeAPIExchangeRateService };
