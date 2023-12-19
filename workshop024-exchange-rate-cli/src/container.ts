import { asFunction, createContainer } from "awilix";
import { makeAwesomeApiFetchExchangeRate } from "./modules/exchangeRate/infrastructure/AwesomeApiFetchExchangeRate";
import { FetchExchangeRate } from "./modules/exchangeRate/domain/FetchExchangeRate";
import {
  AwesomeApiExchangeRateSdk,
  makeAwesomeApiExchangeRateSdk,
} from "./lib/awesomeApiExchangeRateSdk";
import { StartCli, makeStartCli } from "./boot/cli";
import { Boot } from "./boot";
import {
  ExchangeRateLookupCommand,
  makeExchangeRateLookupCommand,
} from "./modules/exchangeRate/interface/cli/LookupCommand";

type Registry = {
  fetchExchangeRate: FetchExchangeRate;
  awesomeApiExchangeRateSdk: AwesomeApiExchangeRateSdk;
  startCli: StartCli;
  boot: Boot;
  exchangeRateLookupCommand: ExchangeRateLookupCommand;
};

const awilixContainer = createContainer<Registry>();

awilixContainer.register({
  fetchExchangeRate: asFunction(makeAwesomeApiFetchExchangeRate).singleton(),
  awesomeApiExchangeRateSdk: asFunction(
    makeAwesomeApiExchangeRateSdk
  ).singleton(),
  startCli: asFunction(makeStartCli).singleton(),
  boot: asFunction(makeStartCli).singleton(),
  exchangeRateLookupCommand: asFunction(
    makeExchangeRateLookupCommand
  ).singleton(),
});

export const container = awilixContainer.cradle;
