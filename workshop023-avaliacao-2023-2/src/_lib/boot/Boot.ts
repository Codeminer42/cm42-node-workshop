import { promiseChain } from '../promiseChain';

const prepareBoot = (bootSteps: (() => Promise<any>)[]) => () => promiseChain(bootSteps.map(bootStep));

const bootStep = (stepFn: () => Promise<any>) => (bootContext: any) =>
  Promise.resolve(stepFn()).then((stepContext = {}) => ({
    ...bootContext,
    ...stepContext,
  }));

export { prepareBoot };
