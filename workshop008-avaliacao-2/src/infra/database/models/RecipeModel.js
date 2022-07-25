const { Model } = require('objection');

/**
 * @augments Model
 */
class RecipeModel extends Model {
  static get tableName() {
    return 'recipes';
  }

  static get relationMappings() {
    const { StepModel } = require('./StepModel');
    const { IngredientModel } = require('./IngredientModel');

    return {
      steps: {
        relation: Model.HasManyRelation,
        modelClass: StepModel,
        join: {
          from: 'recipes.id',
          to: 'steps.recipe_id',
        },
      },
      ingredients: {
        relation: Model.HasManyRelation,
        modelClass: IngredientModel,
        join: {
          from: 'recipes.id',
          to: 'ingredients.recipe_id',
        },
      },
    };
  }
}

module.exports = { RecipeModel };
