import { Model, ModelObject } from 'objection';

export class BalanceSnapshotEntryModel extends Model {
  balance_snapshot_id!: string;
  amount!: number;
  currency!: string;

  static tableName = 'balance_snapshot_entries';
}

export type BalanceSnapshotEntrySchema = ModelObject<BalanceSnapshotEntryModel>;
