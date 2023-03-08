import { NextFunction, Request, Response } from 'express';
import { ValidationError, BusinessError, NotFoundError, BaseError } from '../errors';
import { logger } from '../logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error);

  if (ValidationError.is(error)) {
    res.status(422).json({
      error: {
        type: 'ValidationError',
        message: 'Validation Error',
        details: error.meta.error.errors.map((detail: Record<string, any>) => detail.message),
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
    },
  });
};

export { errorHandler };
