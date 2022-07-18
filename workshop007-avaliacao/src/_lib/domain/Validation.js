const assert = require('assert');
const { BusinessError } = require('../errors');

const validateWith = (schema, validationFn) => {
  const schemaValidation = validateSchema(schema);

  return (rawValue) => {
    const value = schemaValidation(rawValue);

    if (!validationFn) {
      return value;
    }

    try {
      validationFn(value, assert);
      return value;
    } catch (error) {
      throw BusinessError.create({ error });
    }
  };
};

const validateSchema = (schema) => (rawValue) => {
  const { error, value } = schema.validate(rawValue, { abortEarly: false });

  if (error) {
    throw BusinessError.create({
      error,
      details: error.details.map((detail) => ({
        message: detail.message,
        context: detail.context,
      })),
    });
  }

  return value;
};

module.exports = { validateWith };
