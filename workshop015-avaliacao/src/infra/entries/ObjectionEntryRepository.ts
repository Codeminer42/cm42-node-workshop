import { Entry } from '../../domain/entries/Entry';
import { EntryRepository } from '../../domain/entries/EntryRepository';
import { Id } from '../../domain/Id';
import { Ledger } from '../../domain/ledger/Ledger';
import { EntryModel } from '../database/models/EntryModel';
import { ObjectionEntryDataMapper } from './ObjectionEntryDataMapper';

const makeObjectionEntryRepository = (): EntryRepository => ({
  getNextId() {
    return Id.create();
  },

  async store(entry: Entry.Type) {
    const createEntry = await EntryModel.query().insert(ObjectionEntryDataMapper.toData(entry)).returning('*');

    return ObjectionEntryDataMapper.toEntity(createEntry);
  },

  async find(page?: number) {
    const query = EntryModel.query().orderBy('created_at', 'asc');

    const entries = page != null ? (await query.page(page as number, 7).execute()).results : await query.execute();

    return entries.map(ObjectionEntryDataMapper.toEntity);
  },

  async findByLedgerId(ledgerId: Ledger.Type['id']) {
    const query = EntryModel.query().where({ ledger_id: ledgerId }).orderBy('created_at', 'asc');

    const entries = await query.execute();

    return entries.map(ObjectionEntryDataMapper.toEntity);
  },
});

export { makeObjectionEntryRepository };
