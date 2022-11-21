import bcrypt from "bcrypt";

import { usersCollection } from "../database/db.js";
import { signInSchema, signUpSchema } from "../models/authSchemas.js";

export const validateSignUp = async (req, res, next) => {
  const body = req.body;

  const { error } = signUpSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send({ message: errors });
  }

  try {
    const findEmail = await usersCollection.findOne({
      email: body.email,
    });

    if (findEmail) {
      return res.status(422).send({ message: "E-mail already exist!" });
    }

    delete body.password_confirmation;
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  next();
};

export const validateSignIn = async (req, res, next) => {
  const body = req.body;

  const { error } = signInSchema.validate(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  try {
    const user = await usersCollection.findOne({ email: body.email });

    if (!user) {
      return res.sendStatus(401);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.sendStatus(401);
    }

    req.user = user;
  } catch (error) {
    console.log(error);
    return;
  }

  next();
};
