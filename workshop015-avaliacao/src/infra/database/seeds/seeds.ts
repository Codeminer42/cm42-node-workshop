import { Knex } from 'knex';
import { Model } from 'objection';
import { Money } from '../../../domain/Money';
import { makeEntryFactoryWithSeed } from '../../../testing/factories/EntryFactory';
import { makeExchangeRateFactoryWithSeed } from '../../../testing/factories/ExchangeRateFactory';

export async function seed(knex: Knex): Promise<void> {
  Model.knex(knex);

  const entryFactory = makeEntryFactoryWithSeed(42);
  const exchangeRateFactory = makeExchangeRateFactoryWithSeed(42);

  // Deletes ALL existing entries and exchange rates
  await knex('entries').del();
  await knex('exchange_rates').del();

  // Inserts seed entries and exchange rates
  await entryFactory(1000);

  await Promise.all(
    Money.ALLOWED_CURRENCIES.flatMap((currencyFrom) => {
      return Money.ALLOWED_CURRENCIES.filter((currency) => currencyFrom !== currency).map((currencyTo) => {
        return exchangeRateFactory(1, { origin_currency: currencyFrom, destination_currency: currencyTo });
      });
    })
  );
}
