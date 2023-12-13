import { asFunction, createContainer } from "awilix";
import { makeAwesomeApiFetchExchangeRate } from "./modules/exchangeRate/infrastructure/AwesomeApiFetchExchangeRate";
import { FetchExchangeRate } from "./modules/exchangeRate/domain/FetchExchangeRate";
import {
  AwesomeApiExchangeRateSdk,
  makeAwesomeApiExchangeRateSdk,
} from "./lib/awesomeApiExchangeRateSdk";

type Registry = {
  fetchExchangeRate: FetchExchangeRate;
  awesomeApiExchangeRateSdk: AwesomeApiExchangeRateSdk;
};

const awilixContainer = createContainer<Registry>();

awilixContainer.register({
  fetchExchangeRate: asFunction(makeAwesomeApiFetchExchangeRate),
  awesomeApiExchangeRateSdk: asFunction(makeAwesomeApiExchangeRateSdk),
});

export const container = awilixContainer.cradle;
