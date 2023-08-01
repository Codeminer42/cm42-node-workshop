import { ListLedgerNamesQuery } from '../../queries/ListLedgerNamesQuery';
import { LedgerModel } from '../database/models/LedgerModel';

const makeObjectionListLedgerNamesQuery = (): ListLedgerNamesQuery => async () => {
  const ledgersWithNames = await LedgerModel.query().select('name');

  return ledgersWithNames.map((ledger) => ledger.name);
};

export { makeObjectionListLedgerNamesQuery };
