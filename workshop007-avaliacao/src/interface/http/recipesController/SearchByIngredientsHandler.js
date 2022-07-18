const { searchByIngredients } = require('../../../application/SearchByIngredients');
const { handler } = require('../../../_lib/http');
const { RecipeSerializer } = require('./RecipeSerializer');

const searchByIngredientsHandler = handler(async (req, res) => {
  const { ingredients, operator } = req.query;
  const recipes = await searchByIngredients()

  res.status(200).json({
    data: RecipeSerializer.serializeList(recipes),
    count: recipes.length,
  });
});

module.exports = { searchByIngredientsHandler };
