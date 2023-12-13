import { AwesomeApiExchangeRateSdk } from "../../../lib/awesomeApiExchangeRateSdk";
import { FetchExchangeRate } from "../domain/FetchExchangeRate";
import { deserializeAwesomeApiExchangeRate } from "./DeserializeAwesomeApiExchangeRate";

type Dependencies = {
  awesomeApiExchangeRateSdk: AwesomeApiExchangeRateSdk;
};

export const makeAwesomeApiFetchExchangeRate =
  ({ awesomeApiExchangeRateSdk }: Dependencies): FetchExchangeRate =>
  async ({ fromCurrency, toCurrency }) => {
    const [serializedExchangeRate] = await awesomeApiExchangeRateSdk.lookup({
      from: fromCurrency,
      to: toCurrency,
      quantity: 1,
    });

    const exchangeRate = deserializeAwesomeApiExchangeRate(
      serializedExchangeRate
    );

    return exchangeRate;
  };
