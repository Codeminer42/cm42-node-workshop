import { handler } from '../../../_lib/http';

const listLedgersHandler = handler(({ listLedgerNamesQuery }) => async (_, res) => {
  res.json({
    ledgers: await listLedgerNamesQuery(),
  });
});

export { listLedgersHandler };
