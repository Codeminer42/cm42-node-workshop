import { Model, ModelObject } from 'objection';
import { BalanceSnapshotEntryModel } from './BalanceSnapshotEntryModel';

export class BalanceSnapshotModel extends Model {
  id!: string;
  ledger_id!: string | null;
  created_at!: Date;

  static tableName = 'balance_snapshots';

  static get relationMappings() {
    return {
      balance_snapshot_entries: {
        relation: Model.HasManyRelation,
        modelClass: BalanceSnapshotEntryModel,
        join: {
          from: 'balance_snapshots.id',
          to: 'balance_snapshot_entries.balance_snapshot_id',
        },
      },
    };
  }
}

export type BalanceSnapshotSchema = ModelObject<BalanceSnapshotModel>;
