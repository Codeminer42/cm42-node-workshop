const CODE = 'VALIDATION_ERROR';

const create = ({ target, error }) => {
  const validationError = new Error(error.message);

  validationError.meta = {
    target,
    error,
  };

  validationError.code = CODE;

  return validationError;
};

const is = (error) => error.code === CODE;

const ValidationError = {
  is,
  create,
};

module.exports = { ValidationError };
