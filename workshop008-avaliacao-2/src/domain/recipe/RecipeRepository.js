/**
 * @typedef {import("./Recipe").Recipe} Recipe
 */

/**
 * @typedef {object} IRecipeRepository
 * @property {() => string} getNextId
 * @property {(recipe: Recipe) => Promise<Recipe>} store
 * @property {(recipeId: string) => Promise<Recipe>} getById
 * @property {() => Promise<Recipe[]>} getAll
 */

const RecipeRepository = {
  /**
   * @param {IRecipeRepository} instance
   */
  setInstance(instance) {
    this.instance = instance;
  },

  /**
   * @returns {IRecipeRepository}
   */
  getInstance() {
    return this.instance;
  },
};

module.exports = { RecipeRepository };
