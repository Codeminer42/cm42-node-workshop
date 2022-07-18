const { Model } = require('objection');

/**
 * @augments Model
 */
class IngredientModel extends Model {
  static get tableName() {
    return 'ingredients';
  }
}

module.exports = { IngredientModel };
