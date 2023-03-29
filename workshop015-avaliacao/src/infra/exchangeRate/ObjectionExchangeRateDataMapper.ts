import { ExchangeRate } from '../../domain/exchangeRate/ExchangeRate';
import { Money } from '../../domain/Money';
import { ExchangeRateSchema } from '../database/models/ExchangeRateModel';

const ObjectionExchangeRateDataMapper = {
  toEntity(data: ExchangeRateSchema): ExchangeRate.Type {
    return ExchangeRate.create({
      originCurrency: data.origin_currency as Money.AllowedCurrencies,
      destinationCurrency: data.destination_currency as Money.AllowedCurrencies,
      rate: data.rate,
    });
  },

  toData(entity: ExchangeRate.Type): ExchangeRateSchema {
    return {
      origin_currency: entity.originCurrency,
      destination_currency: entity.destinationCurrency,
      rate: entity.rate,
    };
  },
};

export { ObjectionExchangeRateDataMapper };
