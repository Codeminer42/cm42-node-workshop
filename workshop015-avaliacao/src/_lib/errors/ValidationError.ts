import { ZodError } from 'zod';
import { BaseError, Exception } from './BaseError';

namespace ValidationError {
  const type = Symbol();
  const code = 'ValidationError';

  type Props = {
    readonly target: string;
    readonly error: ZodError;
  };

  export const create = ({ error, target }: Props): Exception<Props> =>
    new BaseError<Props>({ type, code, message: error.message, meta: { target, error } });

  export const is = (err: any): err is Exception<Props> => err.type === type;
}

export { ValidationError };
