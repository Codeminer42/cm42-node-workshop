import { Model } from 'objection';
import { NotFoundError } from '../../_lib/errors';
import { BalanceQuery } from '../../queries/BalanceQuery';
import { EntryModel } from '../database/models/EntryModel';
import { LedgerModel } from '../database/models/LedgerModel';
import { EntryTypeMap } from '../entries/ObjectionEntryDataMapper';
import { Money } from '../../domain/Money';

type ObjectionCurrencyBalance = { currency_symbol: Money.AllowedCurrencies; sum: string };
type ObjectionCurrenciesBalance = ObjectionCurrencyBalance[];

const makeObjectionBalanceQuery = (): BalanceQuery => async (ledgerName) => {
  const ledger = await getLedger(ledgerName);

  const objectionCurrenciesBalance = (await ledgerEntries(ledger)
    .select('currency_symbol')
    .sum(Model.knex().raw(`CASE WHEN kind = ${EntryTypeMap.in} THEN amount ELSE -amount END`))
    .groupBy('currency_symbol')
    .execute()) as unknown as ObjectionCurrenciesBalance;

  return objectionCurrenciesBalance.reduce(
    (queryResult, currencyBalance) => ({
      ...queryResult,
      [currencyBalance.currency_symbol]: Number(currencyBalance.sum),
    }),
    {} as Awaited<ReturnType<BalanceQuery>>
  );
};

const ledgerEntries = (ledger?: LedgerModel) => {
  if (!ledger) {
    return EntryModel.query();
  }

  return EntryModel.query().where('ledger_id', ledger.id);
};

const getLedger = async (ledgerName?: string) => {
  if (!ledgerName) {
    return;
  }

  const ledger = await LedgerModel.query().findOne('name', ledgerName);

  if (!ledger) {
    throw NotFoundError.create(`Ledger ${ledgerName} does not exist`);
  }

  return ledger;
};

export { makeObjectionBalanceQuery };
