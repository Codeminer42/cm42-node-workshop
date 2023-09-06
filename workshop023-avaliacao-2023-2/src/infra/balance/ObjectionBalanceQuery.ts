import { Model } from 'objection';
import { NotFoundError } from '../../_lib/errors';
import { Balance, BalanceQuery } from '../../queries/BalanceQuery';
import { EntryModel } from '../database/models/EntryModel';
import { LedgerModel } from '../database/models/LedgerModel';
import { EntryTypeMap } from '../entries/ObjectionEntryDataMapper';
import { Money } from '../../domain/Money';
import { GetLedgerBalanceSnapshot } from './ObjectionGetLedgerBalanceSnapshot';

type ObjectionCurrencyBalance = { currency_symbol: Money.AllowedCurrencies; sum: string };
type ObjectionCurrenciesBalance = ObjectionCurrencyBalance[];

type Dependencies = {
  getLedgerBalanceSnapshot: GetLedgerBalanceSnapshot;
};

const makeObjectionBalanceQuery =
  ({ getLedgerBalanceSnapshot }: Dependencies): BalanceQuery =>
  async (ledgerName) => {
    const ledger = await getLedger(ledgerName);

    const snapshot = await getLedgerBalanceSnapshot(ledger?.id);

    const objectionCurrenciesBalance = (await ledgerEntries(ledger)
      .select('currency_symbol')
      .sum(Model.knex().raw(`CASE WHEN kind = ${EntryTypeMap.in} THEN amount ELSE -amount END`))
      .groupBy('currency_symbol')
      .modify((query) => {
        if (snapshot) query.where('created_at', '>', snapshot.createdAt);
      })
      .execute()) as unknown as ObjectionCurrenciesBalance;

    const balanceSinceLastSnapshot = objectionCurrenciesBalance.reduce(
      (queryResult, currencyBalance) => ({
        ...queryResult,
        [currencyBalance.currency_symbol]: Number(currencyBalance.sum),
      }),
      {} as Awaited<ReturnType<BalanceQuery>>
    );

    return snapshot ? sumBalances(balanceSinceLastSnapshot, snapshot.balance) : balanceSinceLastSnapshot;
  };

const sumBalances = (lhs: Balance, rhs: Balance) => {
  const currencies = new Set(Object.keys(lhs).concat(Object.keys(rhs))) as Set<Money.AllowedCurrencies>;

  return Array.from(currencies).reduce((result, currency) => {
    const lhsValue = lhs[currency] ?? 0;
    const rhsValue = rhs[currency] ?? 0;

    result[currency] = lhsValue + rhsValue;

    return result;
  }, {} as Balance);
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
