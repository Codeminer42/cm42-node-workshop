import { Model, ModelObject } from 'objection';
import { EntryModel } from './EntryModel';

export class LedgerModel extends Model {
  id!: string;
  name!: string;

  static tableName = 'ledgers';

  static get relationMappings() {
    return {
      entries: {
        relation: Model.HasManyRelation,
        modelClass: EntryModel,
        join: {
          from: 'ledgers.id',
          to: 'entries.ledgerId',
        },
      },
    };
  }
}

export type LedgerSchema = ModelObject<LedgerModel>;
