import { Factory } from 'fishery';
import Chance from 'chance';

import { Id } from '../../domain/Id';
import {
  BalanceSnapshotEntryModel,
  BalanceSnapshotEntrySchema,
} from '../../infra/database/models/BalanceSnapshotEntryModel';
import { Money } from '../../domain/Money';

const makeBalanceSnapshotEntryFactory =
  (chance: Chance.Chance) => async (overrides?: Partial<BalanceSnapshotEntrySchema>) => {
    const factory = Factory.define<BalanceSnapshotEntrySchema>(({ onCreate }) => {
      onCreate((balanceSnapshotEntry) =>
        BalanceSnapshotEntryModel.query().insert(balanceSnapshotEntry).returning('*').execute()
      );

      return {
        balance_snapshot_id: Id.create(),
        amount: chance.integer({ min: 100, max: 99999 }),
        currency: chance.pickone(Array.from(Money.ALLOWED_CURRENCIES)),
      };
    });

    return factory.create(overrides);
  };

const makeBalanceSnapshotEntryFactoryWithSeed = (randomSeed: number | string) => {
  const chance = new Chance(randomSeed);

  return makeBalanceSnapshotEntryFactory(chance);
};

const balanceSnapshotEntryFactory = makeBalanceSnapshotEntryFactory(Chance());

export { makeBalanceSnapshotEntryFactoryWithSeed, balanceSnapshotEntryFactory };
