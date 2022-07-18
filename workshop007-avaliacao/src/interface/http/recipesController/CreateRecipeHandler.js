const Joi = require('joi');
const { handler, makeValidator } = require('../../../_lib/http');
const { createRecipe } = require('../../../application/CreateRecipe');
const { RecipeSerializer } = require('./RecipeSerializer');

const { getBody } = makeValidator({
  body: Joi.object({
    name: Joi.string().required(),
    preparationTime: Joi.number().required(),
    steps: Joi.array()
      .items(
        Joi.object({
          description: Joi.string().required(),
          position: Joi.number().required(),
        })
      )
      .required(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          amount: Joi.number().required(),
          unit: Joi.string().required(),
        })
      )
      .required(),
  }).required(),
});

const createRecipeHandler = handler(async (req, res) => {
  const recipeData = getBody(req);

  const recipe = await createRecipe(recipeData);

  res.status(201).json({
    data: RecipeSerializer.serialize(recipe),
  });
});

module.exports = { createRecipeHandler };
