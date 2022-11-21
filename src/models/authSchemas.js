import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  password_confirmation: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
