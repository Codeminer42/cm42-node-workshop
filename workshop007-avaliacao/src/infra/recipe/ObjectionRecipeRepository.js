const Id = require('../../domain/Id');
const { RecipeRepository } = require('../../domain/recipe/RecipeRepository');
const { NotFoundError } = require('../../_lib/errors');
const { RecipeModel } = require('../database/models/RecipeModel');
const { ObjectionRecipeDataMapper } = require('./ObjectionRecipeDataMapper');

/**
 * @typedef {import("../../domain/recipe/RecipeRepository").IRecipeRepository} IRecipeRepository
 */
/** @type {IRecipeRepository} */
const ObjectionRecipeRepository = {
  getNextId() {
    return Id.create();
  },

  async store(recipe) {
    const recipeData = ObjectionRecipeDataMapper.toDatabase(recipe);

    const recipeModel = await RecipeModel.query().insertGraph(recipeData);

    return ObjectionRecipeDataMapper.toEntity(recipeModel);
  },

  async getById(recipeId) {
    const recipeModel = await RecipeModel.query().findById(recipeId).withGraphJoined({
      steps: true,
      ingredients: true,
    });

    if (!recipeModel) {
      throw NotFoundError.create({ resource: `Recipe(id=${recipeId})` });
    }

    return ObjectionRecipeDataMapper.toEntity(recipeModel);
  },

  async getAll() {
    const recipeModels = await RecipeModel.query().withGraphJoined({
      steps: true,
      ingredients: true,
    });

    return recipeModels.map(ObjectionRecipeDataMapper.toEntity);
  },

  async searchByIngredients(ingredientsList, operator) {
    let recipeQuery = RecipeModel.query()
      .select('recipes.id')
      .groupBy('recipes.id')
      .joinRelated('ingredients')
      .whereIn('ingredients.name', ingredientsList);

    if (operator === 'ALL') {
      recipeQuery = recipeQuery.havingRaw('ARRAY_AGG(ingredients.name) @> :ingredients', {
        ingredients: ingredientsList,
      });
    }

    const recipeModels = await RecipeModel.query()
      .withGraphJoined({
        steps: true,
        ingredients: true,
      })
      .whereIn('recipes.id', recipeQuery);

    return recipeModels.map(ObjectionRecipeDataMapper.toEntity);
  },
};

const initializeRecipeRepositiory = () => {
  RecipeRepository.setInstance(ObjectionRecipeRepository);
};

module.exports = { initializeRecipeRepositiory };
