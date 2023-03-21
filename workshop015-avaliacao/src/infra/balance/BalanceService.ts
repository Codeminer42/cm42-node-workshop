import { EntryRepository } from "../../domain/entries/EntryRepository";
import { Ledger } from "../../domain/ledger/Ledger"
import { LedgerRepository } from "../../domain/ledger/LedgerRepository";
import { Money } from "../../domain/Money";
import { NotFoundError } from "../../_lib/errors";

type Dependencies = {
  entryRepository: EntryRepository;
  ledgerRepository: LedgerRepository;
}

const makeBalanceService = ({ entryRepository, ledgerRepository }: Dependencies) => {
  const getEntries = async (ledgerName?: Ledger.Type['name']) => {
      if (ledgerName) {
        const ledger = await ledgerRepository.getByName(ledgerName);

        if (!ledger) throw NotFoundError.create(`Ledger ${ledgerName} does not exist`);

        return entryRepository.findByLedgerId(ledger.id);
      }

      return entryRepository.find();
  };
  
  return {
    async getBalance(ledgerName?: Ledger.Type['name']) {
      const entries = await getEntries(ledgerName);

      const initialBalance = Money.ALLOWED_CURRENCIES.reduce((acc, currency) => ({
        ...acc,
        [currency]: 0,
      }), {} as Record<Money.AllowedCurrencies, number>);

      const balance = entries.reduce((acc, entry) => {
        const { amount, currency } = entry.value;

        if (entry.type === 'in') acc[currency] += amount;
        if (entry.type === 'out') acc[currency] -= amount;
        
        return acc;
      }, initialBalance);

      return balance;
    }
  }
}

export { makeBalanceService };