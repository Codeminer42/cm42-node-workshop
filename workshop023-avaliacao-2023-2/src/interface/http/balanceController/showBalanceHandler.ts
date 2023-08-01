import { z } from 'zod';
import { handler } from '../../../_lib/http';
import { makeValidator } from '../../../_lib/http/RequestValidation';
import { balanceSerializer } from './balanceSerializer';

const { getQuery } = makeValidator({
  query: z.object({
    ledger: z.string().optional(),
  }),
});

const showBalanceHandler = handler(({ balanceQuery }) => async (req, res) => {
  const { ledger } = getQuery(req);

  const balance = await balanceQuery(ledger);

  const serializedBalance = balanceSerializer(balance);

  res.status(200).json(serializedBalance);
});

export { showBalanceHandler };
