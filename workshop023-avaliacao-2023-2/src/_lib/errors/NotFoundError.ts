import { BaseError, Exception } from './BaseError';

namespace NotFoundError {
  const type = Symbol();
  const code = 'NotFoundError';

  export const create = (message: string): Exception => new BaseError({ type, code, message });

  export const is = (err: any): err is Exception => err.type === type;
}

export { NotFoundError };
