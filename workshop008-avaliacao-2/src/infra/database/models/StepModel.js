const { Model } = require('objection');

/**
 * @augments Model
 */
class StepModel extends Model {
  static get tableName() {
    return 'steps';
  }
}

module.exports = { StepModel };
