import { Entry } from '../../domain/entries/Entry';
import { Money } from '../../domain/Money';
import { EntrySchema } from '../database/models/EntryModel';

enum EntryTypeMap {
  'in' = 1,
  'out' = 2,
}

const ObjectionEntryDataMapper = {
  toEntity(data: EntrySchema): Entry.Type {
    return {
      id: data.id,
      ledgerId: data.ledger_id,
      type: EntryTypeMap[data.kind] as 'in' | 'out',
      value: {
        currency: data.currency_symbol.toUpperCase() as Money.AllowedCurrencies,
        amount: data.amount,
      },
      date: data.created_at,
    };
  },

  toData(entity: Entry.Type) {
    return {
      id: entity.id,
      ledger_id: entity.ledgerId,
      kind: EntryTypeMap[entity.type],
      amount: entity.value.amount,
      currency_symbol: entity.value.currency,
      created_at: entity.date,
    };
  },
};

export { ObjectionEntryDataMapper };
