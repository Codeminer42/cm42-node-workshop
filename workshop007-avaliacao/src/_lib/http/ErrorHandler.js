const { ValidationError, BusinessError, NotFoundError } = require('../errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _req, res, _next) => {
  if (ValidationError.is(error)) {
    if (error.meta.target === 'body') {
      res.status(422).json({
        error: {
          type: 'ValidationError',
          message: 'Validation Error',
          details: error.meta.error.details.map((detail) => detail.message),
        },
      });
      return;
    }
    res.status(400).json({
      error: {
        type: 'BadRequest',
        message: 'Missing parameters',
        details: error.meta.error.details.map((detail) => detail.message),
      },
    });
    return;
  }

  if (BusinessError.is(error)) {
    res.status(409).json({
      error: {
        type: 'BusinessError',
        message: 'Business Error',
        details: error.meta.details,
      },
    });
    return;
  }

  if (NotFoundError.is(error)) {
    res.status(404).json({
      error: {
        type: 'NotFoundError',
        message: error.message,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      type: 'InternalError',
      message: error.message,
    },
  });
};

module.exports = { errorHandler };
