import { Id } from '../../domain/Id';
import { Ledger } from '../../domain/ledger/Ledger';
import { LedgerRepository } from '../../domain/ledger/LedgerRepository';
import { LedgerModel } from '../database/models/LedgerModel';
import { ObjectionLedgerDataMapper } from './ObjectionLedgerDataMapper';

const makeObjectionLedgerRepository = (): LedgerRepository => ({
  getNextId() {
    return Id.create();
  },

  async findById(id: string) {
    const ledger = await LedgerModel.query().findById(id);

    if (!ledger) {
      return null;
    }

    return ObjectionLedgerDataMapper.toEntity(ledger);
  },

  async store(ledger: Ledger.Type) {
    const createdLedger = await LedgerModel.query().insert(ObjectionLedgerDataMapper.toData(ledger)).returning('*');

    return ObjectionLedgerDataMapper.toEntity(createdLedger);
  },

  async getAll() {
    const data = await LedgerModel.query();

    return data.map(ObjectionLedgerDataMapper.toEntity);
  },

  async getByName(name: string) {
    const data = await LedgerModel.query().findOne({ name });

    if (!data) {
      return null;
    }

    return ObjectionLedgerDataMapper.toEntity(data);
  },
});

export { makeObjectionLedgerRepository };
