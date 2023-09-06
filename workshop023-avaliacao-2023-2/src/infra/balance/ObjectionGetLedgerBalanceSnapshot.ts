import { Ledger } from '../../domain/ledger/Ledger';
import { Balance } from '../../queries/BalanceQuery';
import { BalanceSnapshotEntryModel } from '../database/models/BalanceSnapshotEntryModel';
import { BalanceSnapshotModel } from '../database/models/BalanceSnapshotModel';
import { BalanceSnapshot } from './BalanceSnapshot';

type SnapshotWithEntriesQueryResult = Array<
  Pick<BalanceSnapshotModel, 'created_at'> & Pick<BalanceSnapshotEntryModel, 'amount' | 'currency'>
>;

export const makeObjectionGetLedgerBalanceSnapshot = (): GetLedgerBalanceSnapshot => async (ledgerId) => {
  const snapshotWithEntries = (await BalanceSnapshotModel.query()
    .select(['created_at', 'amount', 'currency'])
    .joinRelated('balance_snapshot_entries')
    .where('ledger_id', ledgerId ?? null)) as unknown as SnapshotWithEntriesQueryResult;

  if (snapshotWithEntries.length === 0) return null;

  const balance = snapshotWithEntries.reduce(
    (queryResult, currencyBalance) => ({
      ...queryResult,
      [currencyBalance.currency]: Number(currencyBalance.amount),
    }),
    {} as Balance
  );

  return { createdAt: snapshotWithEntries[0].created_at, balance };
};

export type GetLedgerBalanceSnapshot = (
  ledgerId?: Ledger.Type['id']
) => Promise<Pick<BalanceSnapshot.Type, 'createdAt' | 'balance'> | null>;
