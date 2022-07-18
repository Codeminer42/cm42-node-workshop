const Joi = require('joi');
const { validateWith } = require('../../_lib/domain');
const Id = require('../Id');
const Ingredient = require('./Ingredient');
const Step = require('./Step');

/**
 * @typedef {import("./Ingredient").Ingredient} Ingredient
 * @typedef {import("./Ingredient").IngredientProps} IngredientProps
 * @typedef {import("./Step").Step} Step
 * @typedef {import("./Step").StepProps} StepStepProps
 */

/**
 * @typedef {object} Recipe
 * @property {string} id
 * @property {string} name Recipe name
 * @property {number} preparationTime Total duration of the recipe in minutes
 * @property {Step[]} steps Each step of the recipe
 * @property {Ingredient[]} ingredients Each ingredient of the recipe
 */

/**
 * @typedef {object} RecipeProps
 * @property {string} id
 * @property {string} name
 * @property {number} preparationTime
 * @property {StepStepProps[]} steps
 * @property {IngredientProps[]} ingredients
 */

/**
 *
 * @param {RecipeProps} recipeProps
 * @returns {Recipe}
 */
const create = (recipeProps) =>
  validate({
    id: recipeProps.id,
    name: recipeProps.name,
    preparationTime: recipeProps.preparationTime,
    steps: recipeProps.steps.map(Step.create),
    ingredients: recipeProps.ingredients.map(Ingredient.create),
  });

const schema = Joi.object({
  id: Id.schema.required(),
  name: Joi.string().required(),
  preparationTime: Joi.number().integer().positive().required(),
  steps: Joi.array().items(Step.schema).required(),
  ingredients: Joi.array().items(Ingredient.schema).required(),
}).required();

/**
 *
 * @param {Recipe} recipe
 * @param {object} assert
 */
const validateInvariants = (recipe, assert) => {
  const stepPositions = [...recipe.steps].sort(Step.comparePositions).map((step) => step.position);

  stepPositions.forEach((stepPosition, index) => {
    assert.equal(stepPosition, index + 1, 'Steps should be consecutive, starting from 1');
  });
};

const validate = validateWith(schema, validateInvariants);

module.exports = { create };
