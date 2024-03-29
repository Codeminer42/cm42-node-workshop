import { makeObjectionBalanceQuery } from './infra/balance/ObjectionBalanceQuery';
import { makeObjectionGetLedgerBalanceSnapshot } from './infra/balance/ObjectionGetLedgerBalanceSnapshot';
import { makeObjectionEntryRepository } from './infra/entries/ObjectionEntryRepository';
import { makeObjectionLedgerRepository } from './infra/ledgers/ObjectionLedgerRepository';
import { makeObjectionListLedgerNamesQuery } from './infra/ledgers/ObjectionListLedgerNamesQuery';

const entryRepository = makeObjectionEntryRepository();
const ledgerRepository = makeObjectionLedgerRepository();
const getLedgerBalanceSnapshot = makeObjectionGetLedgerBalanceSnapshot();
const balanceQuery = makeObjectionBalanceQuery({ getLedgerBalanceSnapshot });
const listLedgerNamesQuery = makeObjectionListLedgerNamesQuery();

const container = { entryRepository, ledgerRepository, balanceQuery, listLedgerNamesQuery };

type Container = typeof container;

export { container };
export type { Container };
