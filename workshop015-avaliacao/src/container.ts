import { config } from './config';
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

const container = { entryRepository, ledgerRepository, exchangeRateService };

type Container = typeof container;

export { container };
export type { Container };
