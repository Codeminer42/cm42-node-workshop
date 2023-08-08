import { Ledger } from '../../domain/ledger/Ledger';
import { BalanceSnapshot } from './BalanceSnapshot';

export type GetLedgerBalanceSnapshot = (
  ledgerId?: Ledger.Type['id']
) => Promise<Pick<BalanceSnapshot.Type, 'createdAt' | 'balance'>>;
