import { Model, ModelObject } from 'objection';

export class BalanceSnapshotModel extends Model {
  id!: string;
  ledger_id!: string;
  created_at!: Date;

  static tableName = 'balance_snapshots';
}

export type BalanceSnapshotSchema = ModelObject<BalanceSnapshotModel>;
