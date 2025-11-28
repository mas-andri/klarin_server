const Joi = require("joi");

// SIGNUP validation
const signupSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{6,50}$"))
    .required(),
});

// LOGIN validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
});

// UPDATE validation
const updateUserSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).optional(),
  password: Joi.string().min(6).max(50).optional(),
}).min(1); // At least 1 field must be provided

module.exports = {
  signupSchema,
  loginSchema,
  updateUserSchema,
};
