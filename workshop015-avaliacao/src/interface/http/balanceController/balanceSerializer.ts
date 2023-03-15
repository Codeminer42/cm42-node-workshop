import { Money } from "../../../domain/Money";

const balanceSerializer = (balance: Record<Money.AllowedCurrencies, number>) => {
  const currencySymbols = Object.keys(balance) as Money.AllowedCurrencies[];

  return currencySymbols.reduce((acc, currencySymbol) => ({
    ...acc,
    [currencySymbol]: convertToDecimal(balance[currencySymbol]),
  }), {})
};

const convertToDecimal = (amount: number) => {
  return amount / 100;
}

export { balanceSerializer }