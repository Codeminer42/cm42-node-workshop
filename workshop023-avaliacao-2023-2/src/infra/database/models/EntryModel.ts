import { Model, ModelObject } from 'objection';
import { LedgerModel } from './LedgerModel';

export class EntryModel extends Model {
  id!: string;
  ledger_id!: string;
  kind!: number;
  amount!: number;
  currency_symbol!: string;
  created_at!: Date;

  static tableName = 'entries';

  static get relationMappings() {
    return {
      ledger: {
        relation: Model.BelongsToOneRelation,
        modelClass: LedgerModel,
        join: {
          from: 'entries.ledgerId',
          to: 'ledgers.id',
        },
      },
    };
  }
}

export type EntrySchema = ModelObject<EntryModel>;
