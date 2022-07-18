const { Router } = require('express');
const { createRecipeHandler } = require('./CreateRecipeHandler');
const { getRecipeByIdHandler } = require('./GetRecipeByIdHandler');
const { listRecipesHandler } = require('./ListRecipesHandler');

const recipesController = () => {
  const recipesRouter = Router();

  /**
   * @swagger
   * /recipes:
   *  post:
   *    tags:
   *      - Recipes
   *    summary: Creates a recipe
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: Recipe properties
   *        required: true
   *        in: body
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *            preparationTime:
   *              type: number
   *            steps:
   *              type: array
   *              items:
   *                type: object
   *                properties:
   *                  description:
   *                    type: string
   *                  position:
   *                    type: number
   *            ingredients:
   *              type: array
   *              items:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  amount:
   *                    type: number
   *                  unit:
   *                    type: string
   *    responses:
   *      201:
   *        description: New created recipe
   *        schema:
   *          type: object
   *          properties:
   *            data:
   *              $ref: '#/definitions/Recipe'
   */
  recipesRouter.post('/', createRecipeHandler);

  /**
   * @swagger
   *
   * /recipes:
   *  get:
   *    tags:
   *      - Recipes
   *    summary: Return all recipes
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        schema:
   *          type: object
   *          properties:
   *            data:
   *              type: array
   *              items:
   *                $ref: '#/definitions/RecipeListItem'
   *            count:
   *              type: number
   */
  recipesRouter.get('/', listRecipesHandler);

  /**
   * @swagger
   * /recipes/{recipeId}:
   *  get:
   *    tags:
   *      - Recipes
   *    summary: Gets a recipe by id
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: recipeId
   *        type: string
   *        required: true
   *    responses:
   *      200:
   *        description: A recipe
   *        schema:
   *          type: object
   *          properties:
   *            data:
   *              $ref: '#/definitions/Recipe'
   */
  recipesRouter.get('/:recipeId', getRecipeByIdHandler);

  return recipesRouter;
};

module.exports = { recipesController };
