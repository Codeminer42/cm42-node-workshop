const { initializeRecipeRepositiory } = require('../recipe/ObjectionRecipeRepository');

const initializers = [initializeRecipeRepositiory];

const initializeRepositories = () => initializers.forEach((initializer) => initializer());

module.exports = { initializeRepositories };
