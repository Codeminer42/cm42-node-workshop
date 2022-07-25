const { Router } = require('express');

const { recipesController } = require('./recipesController');

const router = () => {
  const mainRouter = Router();

  const apiRouter = Router();

  apiRouter.use('/recipes', recipesController());

  mainRouter.use('/api', apiRouter);

  return mainRouter;
};

module.exports = { router };
