const { promiseChain } = require('../promiseChain');

const prepareBoot = (bootSteps) => () => promiseChain(bootSteps.map(bootStep));

const bootStep = (stepFn) => (bootContext) =>
  Promise.resolve(stepFn()).then((stepContext = {}) => ({
    ...bootContext,
    ...stepContext,
  }));

module.exports = { prepareBoot };
