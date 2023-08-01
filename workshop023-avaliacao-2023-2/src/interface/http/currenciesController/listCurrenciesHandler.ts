import { handler } from '../../../_lib/http';
import { Money } from '../../../domain/Money';

const listCurrenciesHandler = handler(() => async (_, res) => {
  res.json({
    currencies: Money.ALLOWED_CURRENCIES,
  });
});

export { listCurrenciesHandler };
