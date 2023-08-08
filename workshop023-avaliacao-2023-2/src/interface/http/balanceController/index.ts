import { Router } from 'express';
import { showBalanceHandler } from './showBalanceHandler';
import { handler } from '../../../_lib/http';
import { BalanceSnapshotModel } from '../../../infra/database/models/BalanceSnapshotModel';
import { Id } from '../../../domain/Id';
import { BalanceSnapshotEntryModel } from '../../../infra/database/models/BalanceSnapshotEntryModel';

const balanceController = () => {
  const balanceRouter = Router();

  balanceRouter.get('/', showBalanceHandler);
  balanceRouter.post(
    '/',
    handler(({ ledgerRepository }) => async (req, res) => {
      const workLedger = await ledgerRepository.getByName('work');

      const snapshot = await BalanceSnapshotModel.query()
        .insert({
          id: Id.create(),
          created_at: new Date(),
          ledger_id: workLedger?.id,
        })
        .returning('*');

      await BalanceSnapshotEntryModel.query()
        .insert({
          balance_snapshot_id: snapshot.id,
          amount: 123,
          currency: 'USD',
        })
        .returning('*');

      await BalanceSnapshotEntryModel.query()
        .insert({
          balance_snapshot_id: snapshot.id,
          amount: 456,
          currency: 'BRL',
        })
        .returning('*');

      await BalanceSnapshotEntryModel.query()
        .insert({
          balance_snapshot_id: snapshot.id,
          amount: -789,
          currency: 'EUR',
        })
        .returning('*');

      return res.end();
    })
  );

  return balanceRouter;
};

export { balanceController };
