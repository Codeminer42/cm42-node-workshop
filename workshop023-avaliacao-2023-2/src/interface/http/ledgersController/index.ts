import { Router } from 'express';
import { listLedgersHandler } from './listLedgersHandler';

const ledgersController = () => {
  const router = Router();

  router.use('/', listLedgersHandler);

  return router;
};

export { ledgersController };
