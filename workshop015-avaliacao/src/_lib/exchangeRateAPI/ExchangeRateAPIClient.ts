import Axios from 'axios';

export type ExchangeRateApiClient = {
  getLatest(): Promise<SupportedRates>;
};

type Dependencies = {
  apiURL: string;
};

const SUPPORTED_CURRENCIES = ['USD', 'BRL', 'EUR'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

type SupportedRates = Record<SupportedCurrency, number>;

type LatestResponse = {
  rates: SupportedRates;
};

const makeExchangeRateApiClient = ({ apiURL }: Dependencies): ExchangeRateApiClient => {
  const httpClient = Axios.create({
    baseURL: apiURL,
  });

  return {
    async getLatest() {
      const response = await httpClient.get<LatestResponse>('/latest', {
        params: {
          base: 'USD',
          symbols: SUPPORTED_CURRENCIES.join(','),
          places: 2,
        },
      });

      return response.data.rates;
    },
  };
};

export { makeExchangeRateApiClient };
