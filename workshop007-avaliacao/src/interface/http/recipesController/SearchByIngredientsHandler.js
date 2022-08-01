const Joi = require('joi');
const { searchByIngredients } = require('../../../application/SearchByIngredients');
const { handler, makeValidator } = require('../../../_lib/http');
const { RecipeSerializer } = require('./RecipeSerializer');

const { getQuery } = makeValidator({
  query: Joi.object({
    ingredients: Joi.array().items(Joi.string().trim().required()).min(1).required(),
    operator: Joi.string().optional().valid('ALL', 'ANY').default('ANY'),
  }),
});

const searchByIngredientsHandler = handler(async (req, res) => {
  const { ingredients, operator } = getQuery(req);

  const recipes = await searchByIngredients(ingredients, operator);

  res.status(200).json({
    data: RecipeSerializer.serializeList(recipes),
    count: recipes.length,
  });
});

module.exports = { searchByIngredientsHandler };
