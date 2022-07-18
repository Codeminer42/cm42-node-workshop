const { RecipeRepository } = require('../domain/recipe/RecipeRepository');
const Recipe = require('../domain/recipe/Recipe');

/**
 * @typedef {import("../domain/recipe/Recipe").Recipe} Recipe
 */

/**
 * @typedef {object} CreateRecipeDTO
 * @property {string} name Recipe name
 * @property {number} preparationTime Total duration of the recipe in minutes
 * @property {string[]} steps Each step of the recipe in order
 * @property {IngredientDTO[]} ingredients Each ingredient of the recipe
 */

/**
 * @typedef IngredientDTO
 * @property {string} name
 * @property {number} amount
 * @property {string} unit
 */

/**
 * @param {CreateRecipeDTO} recipeData
 * @returns {Promise<Recipe>}
 */
const createRecipe = async (recipeData) => {
  const recipeRepository = RecipeRepository.getInstance();

  const recipeId = recipeRepository.getNextId();

  const recipe = Recipe.create({ id: recipeId, ...recipeData });

  return await recipeRepository.store(recipe);
};

module.exports = { createRecipe };
