import { BaseError, Exception } from './BaseError';

namespace BusinessError {
  const type = Symbol();
  const code = 'BusinessError';

  type Props = {
    details?: any[];
  };

  export const create = ({ message, details }: Props & { message: string }): Exception<Props> =>
    new BaseError<Props>({ type, code, message, meta: { details } });

  export const is = (err: any): err is Exception<Props> => err.type === type;
}

export { BusinessError };
