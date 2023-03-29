import { Factory } from 'fishery';
import Chance from 'chance';

import { ExchangeRateModel, ExchangeRateSchema } from '../../infra/database/models/ExchangeRateModel';

const makeExchangeRateFactory =
  (chance: Chance.Chance) => async (exchangeRateCount: number, overrides?: Partial<ExchangeRateSchema>) => {
    const factory = Factory.define<ExchangeRateSchema>(({ onCreate }) => {
      onCreate((exchangeRate) => ExchangeRateModel.query().insert(exchangeRate).returning('*').execute());

      return {
        origin_currency: chance.pickone(['USD', 'BRL', 'EUR']),
        destination_currency: chance.pickone(['USD', 'BRL', 'EUR']),
        rate: chance.floating({ fixed: 2, min: 0.2, max: 5 }),
      };
    });

    for (let i = 0; i < exchangeRateCount; i++) {
      await factory.create(overrides);
    }
  };

const makeExchangeRateFactoryWithSeed = (randomSeed: number | string) => {
  const chance = new Chance(randomSeed);

  return makeExchangeRateFactory(chance);
};

const exchangeRateFactory = makeExchangeRateFactory(Chance());

export { makeExchangeRateFactoryWithSeed, exchangeRateFactory };
