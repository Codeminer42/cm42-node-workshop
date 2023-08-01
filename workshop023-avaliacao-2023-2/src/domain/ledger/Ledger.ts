import { Entry } from '../entries/Entry';
import { Money } from '../Money';

type CreateEntryData = {
  entryId: string;
  currency: string;
  amount: number;
  type: 'in' | 'out';
};

namespace Ledger {
  export type Type = Readonly<{
    id: string;
    name: string;
  }>;

  export const create = (self: Type): Type => self;

  export const createEntry = (ledger: Type, { entryId, currency, amount, type }: CreateEntryData): Entry.Type =>
    Entry.create({
      id: entryId,
      ledgerId: ledger.id,
      type: type,
      value: Money.create(currency, amount),
    });
}

export { Ledger };
