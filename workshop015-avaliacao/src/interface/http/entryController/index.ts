import { Router } from 'express';

import { createEntryHandler } from './createEntryHandler';
import { listEntryHandler } from './listEntryHandler';

export const entryController = () => {
  const entryRouter = Router();

  entryRouter.get('/', listEntryHandler);
  entryRouter.post('/', createEntryHandler);

  return entryRouter;
};
