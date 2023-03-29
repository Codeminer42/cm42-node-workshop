import { ExchangeRate } from '../../domain/exchangeRate/ExchangeRate';
import { ExchangeRateRepository } from '../../domain/exchangeRate/ExchangeRateRepository';
import { ExchangeRateModel } from '../database/models/ExchangeRateModel';
import { ObjectionExchangeRateDataMapper } from './ObjectionExchangeRateDataMapper';

const makeObjectionExchangeRateRepository = (): ExchangeRateRepository => ({
  async all() {
    const exchangeRates = await ExchangeRateModel.query().orderBy('origin_currency', 'asc');

    return exchangeRates.map(ObjectionExchangeRateDataMapper.toEntity);
  },
  async store(exchangeRate: ExchangeRate.Type) {
    const exchangeRateData = ObjectionExchangeRateDataMapper.toData(exchangeRate);

    const newExchangeRate = await ExchangeRateModel.query()
      .insert(exchangeRateData)
      .onConflict(['origin_currency', 'destination_currency'])
      .merge(['rate'])
      .returning('*')
      .execute();

    return ObjectionExchangeRateDataMapper.toEntity(newExchangeRate);
  },
});

export { makeObjectionExchangeRateRepository };
