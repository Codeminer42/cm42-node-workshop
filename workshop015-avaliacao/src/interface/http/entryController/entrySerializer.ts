import { Entry } from '../../../domain/entries/Entry';
import { Ledger } from '../../../domain/ledger/Ledger';

const entrySerializer = (entry: Entry.Type & { ledger: Ledger.Type | null }) => {
  return {
    id: entry.id,
    ledger: entry.ledger?.name,
    currency: entry.value.currency,
    amount: convertToDecimal(entry.value.amount),
    type: entry.type,
    date: entry.date.toISOString(),
  };
};

const convertToDecimal = (amount: number) => {
  return amount / 100;
};

export { entrySerializer };
