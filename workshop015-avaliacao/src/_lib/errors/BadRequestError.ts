import { BaseError, Exception } from './BaseError';

namespace BadRequestError {
  const type = Symbol();
  const code = 'BadRequestError';

  export const create = (message: string): Exception => new BaseError({ type, code, message });

  export const is = (err: any): err is Exception => err.type === type;
}

export { BadRequestError };
