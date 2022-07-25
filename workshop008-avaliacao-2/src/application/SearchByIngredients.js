const { RecipeRepository } = require("../domain/recipe/RecipeRepository");

const searchByIngredients = async (ingredientsList, operator) => {
  const recipeRepository = RecipeRepository.getInstance()

  return await recipeRepository.searchByIngredients(ingredientsList, operator);
};

module.exports = { searchByIngredients };