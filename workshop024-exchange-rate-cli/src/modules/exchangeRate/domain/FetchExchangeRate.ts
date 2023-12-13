import { ExchangeRate } from "./ExchangeRate";

type FetchExchangeRateArgs = Pick<
  ExchangeRate.Type,
  "fromCurrency" | "toCurrency"
>;

export type FetchExchangeRate = (
  args: FetchExchangeRateArgs
) => Promise<ExchangeRate.Type>;
