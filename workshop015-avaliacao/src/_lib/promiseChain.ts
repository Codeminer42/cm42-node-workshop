const promiseChain = (promiseCreators: ((...args: any[]) => Promise<any>)[]) =>
  promiseCreators.reduce<Promise<Record<string, any>>>(
    (result, promiseCreator) => result.then(promiseCreator),
    Promise.resolve({})
  );

export { promiseChain };
