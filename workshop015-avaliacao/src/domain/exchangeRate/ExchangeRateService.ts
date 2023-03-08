import { Money } from '../Money';

export type ExchangeRateService = {
  getRates(): Promise<Money.AllowedRates>;
};
