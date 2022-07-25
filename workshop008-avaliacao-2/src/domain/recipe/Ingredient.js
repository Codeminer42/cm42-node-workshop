const Joi = require('joi');
const { validateWith } = require('../../_lib/domain');
const Id = require('../Id');

/**
 * @typedef Ingredient
 * @property {string} id
 * @property {string} name
 * @property {number} amount
 * @property {string} unit
 */

/**
 * @typedef IngredientProps
 * @property {string=} id
 * @property {string} name
 * @property {number} amount
 * @property {string} unit
 */

/**
 * @param {IngredientProps} ingredientProps
 * @returns {Ingredient}
 */
const create = (ingredientProps) =>
  validate({
    id: ingredientProps.id || Id.create(),
    name: ingredientProps.name,
    amount: ingredientProps.amount,
    unit: ingredientProps.unit,
  });

const schema = Joi.object({
  id: Id.schema.required(),
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
  unit: Joi.string().max(3).required(),
}).required();

const validate = validateWith(schema);

module.exports = { create, schema };
