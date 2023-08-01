import { Router } from 'express';
import { showBalanceHandler } from './showBalanceHandler';

const balanceController = () => {
  const balanceRouter = Router();

  balanceRouter.get('/', showBalanceHandler);

  return balanceRouter;
};

export { balanceController };
