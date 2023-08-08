import { Model, ModelObject } from 'objection';
import { BalanceSnapshotModel } from './BalanceSnapshotModel';

export class BalanceSnapshotEntryModel extends Model {
  balance_snapshot_id!: string;
  amount!: number;
  currency!: string;

  static tableName = 'balance_snapshot_entries';

  static get relationMappings() {
    return {
      balance_snapshot: {
        relation: Model.BelongsToOneRelation,
        modelClass: BalanceSnapshotModel,
        join: {
          from: 'balance_snapshot_entries.balance_snapshot_id',
          to: 'balance_snapshots.id',
        },
      },
    };
  }
}

export type BalanceSnapshotEntrySchema = ModelObject<BalanceSnapshotEntryModel>;
