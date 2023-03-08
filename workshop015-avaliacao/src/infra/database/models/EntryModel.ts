import { Model, ModelObject } from 'objection';

export class EntryModel extends Model {
  id!: string;
  ledger_id!: string;
  kind!: number;
  amount!: number;
  currency_symbol!: string;
  created_at!: Date;

  static tableName = 'entries';
}

export type EntrySchema = ModelObject<EntryModel>;
