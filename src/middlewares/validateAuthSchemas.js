import { signinSchema, signUpSchema } from "../models/authSchemas.js";

export const validateSignUp = async (req, res, next) => {
  const body = req.body;

  const { error } = signUpSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  delete body.password_confirmation;

  next();
};

export const validateSignIn = async (req, res, next) => {
  const body = req.body;

  const { error } = signinSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  next();
};
