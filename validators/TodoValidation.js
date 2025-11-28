const Joi = require("joi");

const createTodoSchema = Joi.object({
  todo: Joi.string().min(1).max(100).required(),
  checked: Joi.boolean(),
});

const updateTodoSchema = Joi.object({
  todo: Joi.string().min(1).max(100).optional(),
  checked: Joi.boolean(),
}).min(1); // prevent empty body update

module.exports = { createTodoSchema, updateTodoSchema };
