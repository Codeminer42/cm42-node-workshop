import { Factory } from 'fishery';
import Chance from 'chance';

import { Id } from '../../domain/Id';
import { LedgerModel, LedgerSchema } from '../../infra/database/models/LedgerModel';

const makeLedgerFactory = (chance: Chance.Chance) => async (overrides?: Partial<LedgerSchema>) => {
  const factory = Factory.define<LedgerSchema>(({ onCreate }) => {
    onCreate((ledger) => LedgerModel.query().insert(ledger).execute());

    return {
      id: Id.create(),
      name: chance.pickone(['entertainment', 'house', 'work', 'other']),
    };
  });

  return factory.create(overrides);
};

const makeLedgerFactoryWithSeed = (randomSeed: number | string) => {
  const chance = new Chance(randomSeed);

  return makeLedgerFactory(chance);
};

const ledgerFactory = makeLedgerFactory(Chance());

export { makeLedgerFactoryWithSeed, ledgerFactory };
