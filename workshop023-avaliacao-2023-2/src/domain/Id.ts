import { randomUUID } from 'crypto';
import { z } from 'zod';

export namespace Id {
  export const schema = z.string().uuid();

  export const create = () => randomUUID();
}
