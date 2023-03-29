import { Money } from '../Money';

namespace ExchangeRate {
  export type Type = Readonly<{
    originCurrency: Money.AllowedCurrencies;
    destinationCurrency: Money.AllowedCurrencies;
    rate: number;
  }>;

  export const create = (self: Type): Type => self;
}

export { ExchangeRate };
