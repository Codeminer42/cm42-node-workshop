const promiseChain = (promiseCreators) =>
  promiseCreators.reduce((result, promiseCreator) => result.then(promiseCreator), Promise.resolve());

module.exports = { promiseChain };
