import { Factory } from 'fishery';

import { Id } from '../../domain/Id';
import { Balance } from '../../queries/BalanceQuery';
import { BalanceSnapshotModel, BalanceSnapshotSchema } from '../../infra/database/models/BalanceSnapshotModel';
import { balanceSnapshotEntryFactory } from './BalanceSnapshotEntryFactory';

type FactoryOverrides = Partial<BalanceSnapshotSchema> & { balance?: Balance };

const makeBalanceSnapshotFactory = () => async (overrides?: FactoryOverrides) => {
  const factory = Factory.define<BalanceSnapshotSchema>(({ onCreate }) => {
    onCreate((balanceSnapshot) => BalanceSnapshotModel.query().insert(balanceSnapshot).returning('*').execute());

    return {
      id: Id.create(),
      ledger_id: Id.create(),
      created_at: new Date(),
    };
  });

  const { balance: balanceOverride = {}, ...snapshotOverrides } = overrides || {};

  const snapshot = await factory.create(snapshotOverrides);

  for (const [currency, amount] of Object.entries(balanceOverride)) {
    await balanceSnapshotEntryFactory({
      balance_snapshot_id: snapshot.id,
      currency,
      amount,
    });
  }

  return snapshot;
};

const balanceSnapshotFactory = makeBalanceSnapshotFactory();

export { balanceSnapshotFactory };
