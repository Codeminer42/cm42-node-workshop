import { AwesomeApiExchangeRate } from "../../../lib/awesomeApiExchangeRateSdk";
import { ExchangeRate } from "../domain/ExchangeRate";

export const deserializeAwesomeApiExchangeRate = (
  serializedExchangeRate: AwesomeApiExchangeRate
): ExchangeRate.Type => ({
  fromCurrency: serializedExchangeRate.code,
  toCurrency: serializedExchangeRate.codein,
  value: Number(serializedExchangeRate.ask),
  maximum: Number(serializedExchangeRate.high),
  minimum: Number(serializedExchangeRate.low),
  updatedAt: new Date(Number(serializedExchangeRate.timestamp) * 1000),
});
