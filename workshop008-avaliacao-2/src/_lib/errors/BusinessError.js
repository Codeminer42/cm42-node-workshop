const CODE = 'BUSINESS_ERROR';

const create = ({ error, details }) => {
  const businessError = new Error(error.message);

  businessError.meta = {
    error,
    details,
  };

  businessError.code = CODE;

  return businessError;
};

const is = (error) => error.code === CODE;

const BusinessError = {
  is,
  create,
};

module.exports = { BusinessError };
