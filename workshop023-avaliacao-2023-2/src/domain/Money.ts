import { BusinessError } from '../_lib/errors';

namespace Money {
  export const EXCHANGE_RATES = {
    'BRL-EUR': 0.18,
    'USD-BRL': 5.33,
    'USD-EUR': 0.95,
  };

  export const ALLOWED_CURRENCIES = ['BRL', 'USD', 'EUR'] as const;

  export type AllowedCurrencies = typeof ALLOWED_CURRENCIES[number];

  export const CURRENCY_REGEX = new RegExp(`^(${ALLOWED_CURRENCIES.join('|')})$`, 'i');

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

  export const exchangeFor = (currency: AllowedCurrencies) => {
    assertValidCurrency(currency);

    const rates = Object.entries(EXCHANGE_RATES).reduce<
      Partial<Record<`${AllowedCurrencies}-${AllowedCurrencies}`, number>>
    >(
      (acc, [key, rate]) => ({
        ...acc,
        [`${key.split('-').reverse().join('-')}`]: 1 / rate,
      }),
      { ...EXCHANGE_RATES, [`${currency}-${currency}`]: 1 }
    );

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
