import { Request } from 'express';
import { AnyZodObject, z } from 'zod';
import { ValidationError } from '../errors/ValidationError';

type ValidationSchemas = {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
};

type ValidationType<T> = T extends AnyZodObject ? z.infer<NonNullable<T>> : any;

type ValidationHelpers<T extends ValidationSchemas> = {
  getBody(req: Request): ValidationType<T['body']>;
  getParams(req: Request): ValidationType<T['params']>;
  getQuery(req: Request): ValidationType<T['query']>;
};

const makeValidator = <T extends ValidationSchemas>(schemas: T): ValidationHelpers<typeof schemas> => {
  const createValidator = (key: keyof ValidationSchemas) => (req: Request) => {
    if (!schemas[key]) {
      return req[key];
    }

    const result = (schemas[key] as AnyZodObject).safeParse(req[key]);

    if (!result.success) {
      throw ValidationError.create({ target: key, error: result.error });
    }

    return result.data;
  };

  return {
    getBody: createValidator('body'),
    getParams: createValidator('params'),
    getQuery: createValidator('query'),
  };
};

export { makeValidator };
