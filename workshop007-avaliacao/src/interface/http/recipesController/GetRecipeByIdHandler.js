const Joi = require('joi');
const { handler, makeValidator } = require('../../../_lib/http');
const { RecipeRepository } = require('../../../domain/recipe/RecipeRepository');
const { RecipeSerializer } = require('./RecipeSerializer');

const { getParams } = makeValidator({
  params: Joi.object({
    recipeId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }).required(),
});

const getRecipeByIdHandler = handler(async (req, res) => {
  const recipeRepository = RecipeRepository.getInstance();

  const { recipeId } = getParams(req);

  const recipe = await recipeRepository.getById(recipeId);

  res.status(200).json({
    data: RecipeSerializer.serialize(recipe),
  });
});

module.exports = { getRecipeByIdHandler };
