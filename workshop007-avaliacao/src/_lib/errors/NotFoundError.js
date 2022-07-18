const CODE = 'NOT_FOUND_ERROR';

const create = ({ resource }) => {
  const notFoundError = new Error(`${resource} could not be found`);

  notFoundError.meta = {
    resource,
  };

  notFoundError.code = CODE;

  return notFoundError;
};

const is = (error) => error.code === CODE;

const NotFoundError = {
  is,
  create,
};

module.exports = { NotFoundError };
