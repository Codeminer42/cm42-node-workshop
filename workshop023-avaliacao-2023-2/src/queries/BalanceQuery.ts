import { Money } from '../domain/Money';

type Balance = Partial<{
  [c in Money.AllowedCurrencies]: number;
}>;

type BalanceQuery = (ledgerName?: string) => Promise<Balance>;

export { BalanceQuery, Balance };
