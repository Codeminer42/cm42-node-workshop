import { StartCli } from "./cli";

type Dependencies = {
  startCli: StartCli;
};

export const makeBoot =
  ({ startCli }: Dependencies) =>
  () => {
    startCli();
  };

export type Boot = ReturnType<typeof makeBoot>;
