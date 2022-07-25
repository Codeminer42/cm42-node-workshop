/**
 * @typedef {import("../../../domain/recipe/Recipe").Recipe} Recipe
 */

/**
 * @swagger
 *
 * definitions:
 *  Recipe:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      preparationTime:
 *        type: number
 *      steps:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            description:
 *              type: string
 *            position:
 *              type: number
 *      ingredients:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            amount:
 *              type: number
 *            unit:
 *              type: string
 *
 *  RecipeListItem:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 */

const RecipeSerializer = {
  /**
   * @param {Recipe} recipe
   * @returns {object}
   */
  serialize(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      steps: recipe.steps.map((recipe) => ({
        description: recipe.description,
        position: recipe.position,
      })),
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
    };
  },

  /**
   *
   * @param {Recipe[]} recipes
   * @returns {object[]}
   */
  serializeList(recipes) {
    return recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
    }));
  },
};

module.exports = { RecipeSerializer };
