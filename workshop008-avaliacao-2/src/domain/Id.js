const { randomUUID } = require('crypto');
const Joi = require('joi');

const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const schema = Joi.string().guid({ version: 'uuidv4' });

const create = () => randomUUID();

module.exports = { create, regex, schema };
