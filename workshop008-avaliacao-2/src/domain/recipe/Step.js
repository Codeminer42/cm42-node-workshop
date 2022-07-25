const Joi = require('joi');
const Id = require('../Id');
const { validateWith } = require('../../_lib/domain');

/**
 * @typedef Step
 * @property {string} id
 * @property {string} description
 * @property {number} position
 */

/**
 * @typedef StepProps
 * @property {string=} id
 * @property {string} description
 * @property {number} position
 */

/**
 * @param {StepProps} stepProps
 * @returns {Step}
 */
const create = (stepProps) =>
  validate({
    id: stepProps.id || Id.create(),
    description: stepProps.description,
    position: stepProps.position,
  });

/**
 * @param {Step} stepA
 * @param {Step} stepB
 * @returns {number}
 */
const comparePositions = (stepA, stepB) => stepA.position - stepB.position;

const schema = Joi.object({
  id: Id.schema.required(),
  description: Joi.string().required(),
  position: Joi.number().positive().required(),
}).required();

const validate = validateWith(schema);

module.exports = { create, comparePositions, schema };
