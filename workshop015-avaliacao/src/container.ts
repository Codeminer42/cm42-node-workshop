import { makeUpdateExchangeRates } from './application/exchangeRate/updateExchangeRates';
import { config } from './config';
import { makeBalanceService } from './infra/balance/BalanceService';
import { makeObjectionEntryRepository } from './infra/entries/ObjectionEntryRepository';
import { makeAPIExchangeRateService } from './infra/exchangeRate/APIExchangeRateService';
import { makeObjectionExchangeRateRepository } from './infra/exchangeRate/ObjectionExchangeRateRepository';
import { makeObjectionLedgerRepository } from './infra/ledgers/ObjectionLedgerRepository';
import { makeExchangeRateApiClient } from './_lib/exchangeRateAPI/ExchangeRateAPIClient';
import { logger } from './_lib/logger';
import { makeScheduler } from './_lib/scheduler';

const entryRepository = makeObjectionEntryRepository();
const ledgerRepository = makeObjectionLedgerRepository();
const exchangeRateRepository = makeObjectionExchangeRateRepository();

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

const scheduler = makeScheduler({ logger });

const updateExchangeRates = makeUpdateExchangeRates({ exchangeRateService, exchangeRateRepository });

const container = {
  scheduler,
  entryRepository,
  ledgerRepository,
  exchangeRateService,
  updateExchangeRates,
  balanceService,
  exchangeRateRepository,
};

type Container = typeof container;

export { container };
export type { Container };
