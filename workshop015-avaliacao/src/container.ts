import { config } from './config';
import { makeBalanceService } from './infra/balance/BalanceService';
import { makeObjectionEntryRepository } from './infra/entries/ObjectionEntryRepository';
import { makeAPIExchangeRateService } from './infra/exchangeRate/APIExchangeRateService';
import { makeObjectionLedgerRepository } from './infra/ledgers/ObjectionLedgerRepository';
import { makeExchangeRateApiClient } from './_lib/exchangeRateAPI/ExchangeRateAPIClient';

const entryRepository = makeObjectionEntryRepository();
const ledgerRepository = makeObjectionLedgerRepository();

const exchangeRateAPIClient = makeExchangeRateApiClient({
  apiURL: config.exchangeRateAPI.apiURL,
});

const exchangeRateService = makeAPIExchangeRateService({
  exchangeRateAPIClient,
});

const balanceService = makeBalanceService({
  entryRepository,
  ledgerRepository,
});

const container = { entryRepository, ledgerRepository, exchangeRateService, balanceService };

type Container = typeof container;

export { container };
export type { Container };
