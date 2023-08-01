import { Money } from '../domain/Money';

type Balance = {
  [c in Money.AllowedCurrencies]: number;
};

type BalanceQuery = (ledgerName?: string) => Promise<Balance>;

export { BalanceQuery, Balance };
