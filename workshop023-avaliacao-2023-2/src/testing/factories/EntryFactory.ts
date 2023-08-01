import { Factory } from 'fishery';
import Chance from 'chance';

import { EntryModel, EntrySchema } from '../../infra/database/models/EntryModel';
import { LedgerModel } from '../../infra/database/models/LedgerModel';
import { Id } from '../../domain/Id';

const makeEntryFactory = (chance: Chance.Chance) => async (entryCount: number, overrides?: Partial<EntrySchema>) => {
  const factory = Factory.define<EntrySchema>(({ onCreate }) => {
    onCreate((entry) => EntryModel.query().insert(entry).execute());

    return {
      id: Id.create(),
      ledger_id: Id.create(),
      kind: chance.pickone([1, 2]),
      amount: chance.integer({ min: 1_00, max: 1000_00 }),
      currency_symbol: chance.pickone(['USD', 'BRL', 'EUR']),
      created_at: new Date(),
    };
  });

  for (let i = 0; i < entryCount; i++) {
    const ledgerName = chance.pickone(['entertainment', 'house', 'work', 'other']);
    const ledger = await findOrCreateLedger(ledgerName);

    await factory.create({ ledger_id: ledger.id, ...overrides });
  }
};

const findOrCreateLedger = async (ledgerName: string) => {
  const ledger = await LedgerModel.query().findOne('name', ledgerName);

  if (!ledger) {
    return LedgerModel.query().insert({ id: Id.create(), name: ledgerName });
  }

  return ledger;
};

const makeEntryFactoryWithSeed = (randomSeed: number | string) => {
  const chance = new Chance(randomSeed);

  return makeEntryFactory(chance);
};

const entryFactory = makeEntryFactory(Chance());

export { makeEntryFactoryWithSeed, entryFactory };
