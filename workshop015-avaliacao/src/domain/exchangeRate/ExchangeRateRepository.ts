import { ExchangeRate } from './ExchangeRate';

interface ExchangeRateRepository {
  all(): Promise<ExchangeRate.Type[]>;
  store(exchangeRate: ExchangeRate.Type): Promise<ExchangeRate.Type>;
}

export { ExchangeRateRepository };
