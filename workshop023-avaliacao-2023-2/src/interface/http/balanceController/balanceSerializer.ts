import { Balance } from '../../../queries/BalanceQuery';

const balanceSerializer = (balance: Balance) => {
  const balanceEntries = Object.entries(balance).map(([currency_symbol, amount]) => [
    currency_symbol,
    convertToDecimal(amount),
  ]);

  return Object.fromEntries(balanceEntries);
};

const convertToDecimal = (amount: number) => {
  return amount / 100;
};

export { balanceSerializer };
