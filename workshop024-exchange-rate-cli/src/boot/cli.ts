import { build } from "gluegun";
import { ExchangeRateLookupCommand } from "../modules/exchangeRate/interface/cli/LookupCommand";

type Dependencies = {
  exchangeRateLookupCommand: ExchangeRateLookupCommand;
};

export const makeStartCli =
  ({ exchangeRateLookupCommand }: Dependencies) =>
  () =>
    build()
      .src(__dirname)
      .defaultCommand(exchangeRateLookupCommand)
      .create()
      .run();

export type StartCli = ReturnType<typeof makeStartCli>;
