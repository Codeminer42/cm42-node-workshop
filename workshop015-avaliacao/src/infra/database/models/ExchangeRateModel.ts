import { Model, ModelObject } from 'objection';

export class ExchangeRateModel extends Model {
  origin_currency!: string;
  destination_currency!: string;
  rate!: number;

  static tableName = 'exchange_rates';
}

export type ExchangeRateSchema = ModelObject<ExchangeRateModel>;
