const { ValidationError } = require('../errors/ValidationError');

const makeValidator = (schemas) => {
  const createValidator = (key) => (req) => {
    if (!schemas[key]) {
      return req[key];
    }

    const { value, error } = schemas[key].validate(req[key], { abortEarly: false });

    if (error) {
      throw ValidationError.create({ target: key, error });
    }

    return value;
  };

  return {
    getBody: createValidator('body'),
    getParams: createValidator('params'),
    getQuery: createValidator('query'),
  };
};

module.exports = { makeValidator };
