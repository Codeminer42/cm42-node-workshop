import { z } from 'zod';
import { Ledger } from '../../../domain/ledger/Ledger';
import { Money } from '../../../domain/Money';
import { handler } from '../../../_lib/http';
import { makeValidator } from '../../../_lib/http/RequestValidation';

const requiredErrorSufix = 'cannot be empty';

const { getBody } = makeValidator({
  body: z.object({
    amount: z
      .number({ required_error: `Amount ${requiredErrorSufix}` })
      .positive({ message: 'Amount should be a positive number' })
      .finite(),
    type: z
      .string({ required_error: `Type ${requiredErrorSufix}` })
      .regex(/^(in|out)$/, { message: 'Invalid entry type' }),
    ledger: z.string({ required_error: `Ledger name ${requiredErrorSufix}` }),
    currency: z
      .string({ required_error: `Currency ${requiredErrorSufix}` })
      .regex(Money.CURRENCY_REGEX, { message: 'Invalid currency' }),
  }),
});

const createEntryHandler = handler(({ ledgerRepository, entryRepository }) => async (req, res) => {
  const makeSureLedgerExists = async (ledgerName: string) => {
    const ledger = await ledgerRepository.getByName(ledgerName);

    if (!ledger) {
      const newLedger = Ledger.create({ id: ledgerRepository.getNextId(), name: ledgerName });

      return await ledgerRepository.store(newLedger);
    }

    return ledger;
  };

  const entryData = getBody(req);

  const ledger = await makeSureLedgerExists(entryData.ledger);

  const entry = Ledger.createEntry(ledger, {
    entryId: entryRepository.getNextId(),
    currency: entryData.currency,
    amount: convertToCents(entryData.amount),
    type: entryData.type as 'in' | 'out',
  });

  await entryRepository.store(entry);

  res.status(201).json({
    success: {
      message: `New entry added to ${ledger.name} ledger`,
    },
  });
});

const convertToCents = (amount: number) => Math.round(amount * 100);

export { createEntryHandler };
