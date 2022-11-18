import { signupSchema, signinSchema } from "../schemas/authSchemas.js";

export const validateSignUp = async (req, res, next) => {
  const body = req.body;

  const { error } = signupSchema(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

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
