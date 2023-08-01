import { Ledger } from '../../domain/ledger/Ledger';
import { LedgerSchema } from '../database/models/LedgerModel';

const ObjectionLedgerDataMapper = {
  toEntity: (data: LedgerSchema) => {
    return Ledger.create({
      id: data.id,
      name: data.name,
    });
  },

  toData: (ledger: Ledger.Type) => {
    return {
      id: ledger.id,
      name: ledger.name,
    };
  },
};

export { ObjectionLedgerDataMapper };
