import joi from "joi";

export const signupSchema = (obj) => {
  const signupSchema = joi.object({
    name: joi.string().alphanum().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    password_confirmation: joi
      .any()
      .equal(joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  });

  return signupSchema.validate(obj, { abortEarly: false });
};

export const signinSchema = (obj) => {
  const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().label("Password"),
  });

  return signinSchema.validate(obj, { abortEarly: false });
};
