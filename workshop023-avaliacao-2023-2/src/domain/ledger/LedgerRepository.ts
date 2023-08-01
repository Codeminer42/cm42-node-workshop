import { Ledger } from './Ledger';

interface LedgerRepository {
  getNextId(): string;
  findById(id: string): Promise<Ledger.Type | null>;
  store(ledger: Ledger.Type): Promise<Ledger.Type>;
  getAll(): Promise<Ledger.Type[]>;
  getByName(name: string): Promise<Ledger.Type | null>;
}

export { LedgerRepository };
