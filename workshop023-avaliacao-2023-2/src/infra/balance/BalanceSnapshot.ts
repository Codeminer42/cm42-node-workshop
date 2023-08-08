import { Ledger } from '../../domain/ledger/Ledger';
import { Balance } from '../../queries/BalanceQuery';

namespace BalanceSnapshot {
  export type Type = Readonly<{
    id: string;
    ledgerId: Ledger.Type['id'] | null;
    createdAt: Date;
    balance: Balance;
  }>;
}

export { BalanceSnapshot };
