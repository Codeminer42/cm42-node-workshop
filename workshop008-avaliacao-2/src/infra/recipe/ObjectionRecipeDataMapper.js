const Recipe = require('../../domain/recipe/Recipe');

/**
 * @typedef {import("../../domain/recipe/Recipe").Recipe} Recipe
 */

/**
 * @typedef RecipeData
 * @property {string} id
 * @property {string} name
 * @property {number} preparation_time
 * @property {StepData[]} steps
 * @property {IngredientData[]} ingredients
 */

/**
 * @typedef StepData
 * @property {string} id
 * @property {string} recipe_id
 * @property {string} description
 * @property {string} position
 */

/**
 * @typedef IngredientData
 * @property {string} id
 * @property {string} recipe_id
 * @property {string} name
 * @property {number} amount
 * @property {string} unit
 */

const ObjectionRecipeDataMapper = {
  /**
   * @param {RecipeData} recipeModel
   * @returns {Recipe}
   */
  toEntity(recipeModel) {
    return Recipe.create({
      id: recipeModel.id,
      name: recipeModel.name,
      preparationTime: recipeModel.preparation_time,

      steps: recipeModel.steps.map((stepModel) => ({
        id: stepModel.id,
        description: stepModel.description,
        position: stepModel.position,
      })),

      ingredients: recipeModel.ingredients.map((ingredientModel) => ({
        id: ingredientModel.id,
        name: ingredientModel.name,
        amount: ingredientModel.amount,
        unit: ingredientModel.unit,
      })),
    });
  },

  /**
   * @param {Recipe} recipe
   * @returns {RecipeData}
   */
  toDatabase(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      preparation_time: recipe.preparationTime,

      steps: recipe.steps.map((step) => ({
        id: step.id,
        recipe_id: recipe.id,
        description: step.description,
        position: step.position,
      })),

      ingredients: recipe.ingredients.map((ingredient) => ({
        id: ingredient.id,
        recipe_id: recipe.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
    };
  },
};

module.exports = { ObjectionRecipeDataMapper };
