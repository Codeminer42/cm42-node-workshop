import { Ledger } from '../ledger/Ledger';
import { Entry } from './Entry';

interface EntryRepository {
  getNextId(): string;
  store: (entry: Entry.Type) => Promise<Entry.Type>;
  find: (page?: number) => Promise<Entry.Type[]>;
  findByLedgerId: (ledgerId: Ledger.Type['id']) => Promise<Entry.Type[]>;
}

export { EntryRepository };
