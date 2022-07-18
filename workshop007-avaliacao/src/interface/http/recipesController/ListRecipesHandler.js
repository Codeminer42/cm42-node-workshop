const { handler } = require('../../../_lib/http');
const { RecipeRepository } = require('../../../domain/recipe/RecipeRepository');
const { RecipeSerializer } = require('./RecipeSerializer');

const listRecipesHandler = handler(async (req, res) => {
  const recipeRepository = RecipeRepository.getInstance();

  const recipes = await recipeRepository.getAll();

  res.status(200).json({
    data: RecipeSerializer.serializeList(recipes),
    count: recipes.length,
  });
});

module.exports = { listRecipesHandler };
