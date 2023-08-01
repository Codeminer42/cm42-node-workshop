import { z } from 'zod';
import { Money } from '../../../domain/Money';
import { handler } from '../../../_lib/http';
import { makeValidator } from '../../../_lib/http/RequestValidation';
import { entrySerializer } from './entrySerializer';

const defaultPageErrorMessage = 'Page should be a positive integer';

const { getQuery } = makeValidator({
  query: z.object({
    page: z.optional(
      z.coerce
        .number({ invalid_type_error: defaultPageErrorMessage })
        .int({ message: defaultPageErrorMessage })
        .nonnegative({ message: defaultPageErrorMessage })
    ),
    in_currency: z.optional(z.string().regex(Money.CURRENCY_REGEX, { message: 'Invalid currency' })),
  }),
});

const listEntryHandler = handler(({ entryRepository, ledgerRepository }) => async (req, res) => {
  const { page, in_currency } = getQuery(req);

  const entries = await entryRepository.find(page);

  let result = await Promise.all(
    entries.map((entry) => ledgerRepository.findById(entry.ledgerId).then((ledger) => ({ ...entry, ledger })))
  );

  if (in_currency) {
    const exchange = Money.exchangeFor(in_currency.toUpperCase() as Money.AllowedCurrencies);

    result = result.map((entry) => ({ ...entry, value: exchange(entry.value) }));
  }

  res.json(result.map(entrySerializer));
});

export { listEntryHandler };
