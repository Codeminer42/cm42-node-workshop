import { BusinessError } from '../_lib/errors';

namespace Money {
  export const ALLOWED_CURRENCIES = ['BRL', 'USD', 'EUR'] as const;

  export type AllowedCurrencies = typeof ALLOWED_CURRENCIES[number];

  export const CURRENCY_REGEX = new RegExp(`^(${ALLOWED_CURRENCIES.join('|')})$`, 'i');

  export type AllowedRates = Record<`${AllowedCurrencies}-${AllowedCurrencies}`, number>;

  export type Type = Readonly<{
    currency: AllowedCurrencies;
    amount: number;
  }>;

  export const create = (currency: string, amount: number): Type => {
    currency = currency.toUpperCase();

    assertValidCurrency(currency);

    return {
      currency,
      amount,
    };
  };

  export const exchangeFor = (currency: AllowedCurrencies, rates: AllowedRates) => {
    assertValidCurrency(currency);

    return (money: Type) => {
      const rate = rates[`${money.currency}-${currency}`];

      if (!rate) {
        throw BusinessError.create({ message: `No exchange rate for ${money.currency} to ${currency}` });
      }

      return Money.create(currency, Math.round(money.amount * rate));
    };
  };
}

function assertValidCurrency(currency: unknown): asserts currency is Money.AllowedCurrencies {
  if (!Money.ALLOWED_CURRENCIES.includes(currency as any)) {
    throw BusinessError.create({ message: `Invalid currency: ${currency}` });
  }
}

export { Money };
