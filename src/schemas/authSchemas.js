import joi from "joi";

export const validateSignupSchema = (obj) => {
  const signupSchema = joi.object({
    name: joi.string().alphanum().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return signupSchema.validate(obj, { abortEarly: false });
};

export const validateSigninSchema = (obj) => {
  const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return signinSchema.validate(obj, { abortEarly: false });
};
